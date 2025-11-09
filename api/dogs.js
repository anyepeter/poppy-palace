import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const dogs = await sql`SELECT * FROM dogs ORDER BY id`;
      return res.status(200).json(dogs);
    }

    if (req.method === 'POST') {
      const { name, breed, age, size, personality, description, images, location, isSponsored } = req.body;
      
      const [dog] = await sql`
        INSERT INTO dogs (name, breed, age, size, personality, description, images, location, is_sponsored)
        VALUES (${name}, ${breed}, ${age}, ${size}, ${personality}, ${description}, ${images}, ${location}, ${isSponsored})
        RETURNING *
      `;
      
      return res.status(201).json(dog);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}