import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { sql } from '@vercel/postgres';

interface ProjectData {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: Date | string;
  user_id: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const { id } = req.query;
  const projectId = id ? Number(id) : null;

  let viewMode = 'project_detail';

  let projectData: ProjectData | null = null;
  let projectsList: any[] = [];
  let commentsData: any[] = [];

  try {
    const isAdmin = session?.user?.role === 'admin';
    const isClient = !!session?.user;

    if (isAdmin && !projectId) {
      viewMode = 'admin_list';
      const { rows } = await sql`
        SELECT p.id, p.title, p.status, p.created_at, u.first_name || ' ' || u.last_name as client_name
        FROM projects p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC
      `;
      projectsList = rows.map((r: any) => ({
        ...r, created_at: r.created_at.toISOString()
      }));
    }
    else {
      let query;

      if (projectId) {
        query = sql`SELECT * FROM projects WHERE id = ${projectId}`;
      } else if (isClient) {
        query = sql`SELECT * FROM projects WHERE user_id = ${Number(session?.user?.id)} LIMIT 1`;
      }

      if (query) {
        const { rows } = await query;
        if (rows.length > 0) {
          projectData = rows[0] as ProjectData;
        }
      }
    }

    if (projectData) {
      const { rows: comments } = await sql`
        SELECT 
          c.id, c.message, c.created_at, c.user_id,
          u.role as author_role,
          CASE WHEN u.last_name IS NOT NULL THEN u.first_name || ' ' || u.last_name ELSE u.username END as author_name
        FROM project_comments c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.project_id = ${projectData.id} 
        ORDER BY c.created_at DESC
      `;

      const currentUserId = session ? Number(session.user.id) : -1;

      commentsData = comments.map((c: any) => ({
        id: c.id,
        message: c.message,
        created_at: c.created_at.toISOString(),
        author_name: c.author_name,
        author_role: c.author_role,
        is_me: c.user_id === currentUserId
      }));

      if (projectData.created_at instanceof Date) {
        projectData.created_at = projectData.created_at.toISOString();
      }
    }

    return res.status(200).json({
      viewMode,
      project: projectData,
      projectsList,
      comments: commentsData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
}