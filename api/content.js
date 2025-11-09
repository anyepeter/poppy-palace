import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const [content] = await sql`SELECT content_data FROM site_content WHERE content_key = 'main'`;
      return res.status(200).json(content?.content_data || {});
    }

    if (req.method === 'PUT') {
      const contentData = req.body;
      
      await sql`
        INSERT INTO site_content (content_key, content_data)
        VALUES ('main', ${JSON.stringify(contentData)})
        ON CONFLICT (content_key)
        DO UPDATE SET content_data = ${JSON.stringify(contentData)}, updated_at = CURRENT_TIMESTAMP
      `;
      
      return res.status(200).json(contentData);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}