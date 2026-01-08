import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

const MODEL_NAME = "claude-sonnet-4-20250514";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history, locale = 'de', sessionId = 'session-' + Date.now() } = req.body;

  try {
    try {
      await sql`
        INSERT INTO chat_messages (session_id, role, content)
        VALUES (${sessionId}, 'user', ${message})
      `;
    } catch (dbError) {
      console.error('Schreibfehler in der DB (user):', dbError);
    }

    const context = getSiteContent(locale);

    const systemPrompt = locale === 'en'
      ? `You are a helpful AI assistant for the "Wesner Software" website. 
         Answer politely in English.
         Use ONLY the following information to answer user questions. 
         
         RULES:
         1. If the answer is not in the text, ask the user to use the contact form.
         2. CRITICAL: If the user asks for an appointment, a meeting, a demo, or wants to talk to someone ("termin", "meeting", "contact"), you MUST append the tag "{{BOOKING_BUTTON}}" to the end of your response.
         3. Do not just describe the contact form if they ask for a meeting - give them the button via the tag.
         
         --- WEBSITE CONTENT ---
         ${context}`
      : `Du bist ein hilfreicher KI-Assistent für die Website der "Wesner Softwareentwicklung". 
         Antworte immer höflich auf Deutsch.
         Nutze NUR die folgenden Informationen, um Fragen zu beantworten. 
         
         REGELN:
         1. Wenn du die Antwort nicht in den Informationen findest, bitte den Nutzer, das Kontaktformular zu verwenden.
         2. KRITISCH: Wenn der Benutzer einen Termin ("Termin vereinbaren", "Gespräch", "Demo") wünscht oder danach fragt, MUSST du am Ende deiner Antwort zwingend den Tag "{{BOOKING_BUTTON}}" anfügen.
         3. Erzähle nicht nur vom Kontaktformular, wenn nach einem Termin gefragt wird, sondern gib diesen Tag aus.
         
         --- WEBSITE INHALT ---
         ${context}`;

    let reply = "";

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const response = await anthropic.messages.create({
        model: MODEL_NAME,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          ...history.map((msg: any) => ({ role: msg.role, content: msg.content })),
          { role: "user", content: message }
        ],
      });

      const contentBlock = response.content[0];
      if (contentBlock.type === 'text') {
        reply = contentBlock.text;
      } else {
        reply = "Entschuldigung, ich habe ein technisches Problem.";
      }

    } else {
      reply = locale === 'en'
        ? "[MOCK MODE] I received your message. The AI Key is missing, but the database connection works! {{BOOKING_BUTTON}}"
        : "[TEST MODUS] Ich habe Ihre Nachricht erhalten. Der AI-Key fehlt noch, aber die Datenbankverbindung funktioniert! {{BOOKING_BUTTON}}";
    }

    try {
      await sql`
        INSERT INTO chat_messages (session_id, role, content)
        VALUES (${sessionId}, 'assistant', ${reply})
      `;
    } catch (dbError) {
      console.error('Schreibfehler in der DB (Assistent)::', dbError);
    }

    res.status(200).json({ reply, sessionId });

  } catch (error: any) {
    console.error('General API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

function getSiteContent(locale: string): string {
  try {
    const dataDir = path.join(process.cwd(), 'data');

    const productsPath = path.join(dataDir, 'products', `products.${locale}.json`);
    const products = fs.existsSync(productsPath) ? fs.readFileSync(productsPath, 'utf8') : '';

    const servicesPath = path.join(dataDir, 'services', `services.${locale}.json`);
    const services = fs.existsSync(servicesPath) ? fs.readFileSync(servicesPath, 'utf8') : '';

    const blogPath = path.join(dataDir, 'blog', `articles.${locale}.json`);
    const blog = fs.existsSync(blogPath) ? fs.readFileSync(blogPath, 'utf8') : '';

    return `
      PRODUCTS INFO:
      ${products}

      SERVICES INFO:
      ${services}

      BLOG ARTICLES:
      ${blog}
    `;
  } catch (e) {
    console.error("Error reading context files", e);
    return "";
  }
}