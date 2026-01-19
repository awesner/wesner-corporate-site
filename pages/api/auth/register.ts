import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Das Passwort muss mindestens 6 Zeichen lang sein.' });
  }

  try {
    const checkUser = await sql`
      SELECT id FROM users WHERE username = ${username} LIMIT 1;
    `;

    if (checkUser.rows.length > 0) {
      return res.status(409).json({ message: 'Dieser Benutzername ist bereits vergeben.' });
    }

    const hashedPassword = await hash(password, 10);

    await sql`
      INSERT INTO users (username, password_hash, role, first_name)
      VALUES (${username}, ${hashedPassword}, 'client', ${username});
    `;

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Interner Serverfehler.' });
  }
}