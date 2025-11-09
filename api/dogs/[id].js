import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const [dog] = await sql`SELECT * FROM dogs WHERE id = ${id}`;
      if (!dog) {
        return res.status(404).json({ error: 'Dog not found' });
      }
      return res.status(200).json(dog);
    }

    if (req.method === 'PUT') {
      const { name, breed, age, size, personality, description, images, location, isSponsored } = req.body;
      
      const [dog] = await sql`
        UPDATE dogs 
        SET name = ${name}, breed = ${breed}, age = ${age}, size = ${size}, 
            personality = ${personality}, description = ${description}, 
            images = ${images}, location = ${location}, is_sponsored = ${isSponsored},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (!dog) {
        return res.status(404).json({ error: 'Dog not found' });
      }
      
      return res.status(200).json(dog);
    }

    if (req.method === 'DELETE') {
      const [dog] = await sql`DELETE FROM dogs WHERE id = ${id} RETURNING *`;
      
      if (!dog) {
        return res.status(404).json({ error: 'Dog not found' });
      }
      
      return res.status(200).json({ message: 'Dog deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}