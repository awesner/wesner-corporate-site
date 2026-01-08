import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, date, message } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    try {
      await sql`
        INSERT INTO appointments (name, email, requested_date, message)
        VALUES (${name}, ${email}, ${date}, ${message || ''})
      `;
    } catch (dbError) {
      console.error('Database Error:', dbError);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_APP_NODEMAILER_EMAIL,
        pass: process.env.NEXT_APP_NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_APP_NODEMAILER_EMAIL,
      to: process.env.NEXT_APP_NODEMAILER_EMAIL,
      replyTo: email,
      subject: `📅 Neue Terminanfrage: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #0070f3;">Neue Terminanfrage über Chat-Bot</h2>
          <p>Ein Nutzer möchte einen Termin vereinbaren.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Gewünschtes Datum:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Nachricht:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${message || '-'}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            Diese Nachricht wurde automatisch gesendet.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Anfrage erfolgreich gesendet' });

  } catch (error: any) {
    console.error('Email Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}