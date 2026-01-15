import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { sql } from '@vercel/postgres';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      console.log('API Error: No session found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { projectId, message } = req.body;

    if (!projectId || !message || message.trim() === '') {
      console.log('API Error: Missing data', { projectId, message });
      return res.status(400).json({ message: 'Missing data' });
    }

    const userId = session.user.id;

    await sql`
      INSERT INTO project_comments (project_id, user_id, message)
      VALUES (${projectId}, ${userId}, ${message});
    `;

    console.log(`Success: Comment added by user ${userId} to project ${projectId}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('CRITICAL API ERROR:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: String(error) });
  }
}