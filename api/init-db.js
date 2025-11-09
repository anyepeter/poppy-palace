import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS dogs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        breed VARCHAR(255) NOT NULL,
        age VARCHAR(50) NOT NULL,
        size VARCHAR(50) NOT NULL,
        personality TEXT[] NOT NULL,
        description TEXT NOT NULL,
        images TEXT[] NOT NULL,
        location VARCHAR(255) NOT NULL,
        is_sponsored BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        content_key VARCHAR(255) UNIQUE NOT NULL,
        content_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert default content
    await sql`
      INSERT INTO site_content (content_key, content_data) 
      VALUES ('main', '{}') 
      ON CONFLICT (content_key) DO NOTHING
    `;

    // Insert default dogs if none exist
    const existingDogs = await sql`SELECT COUNT(*) FROM dogs`;
    if (existingDogs[0].count === '0') {
      await sql`
        INSERT INTO dogs (name, breed, age, size, personality, description, images, location, is_sponsored)
        VALUES 
        ('Luna', 'Golden Retriever', '2 years', 'Large', 
         ARRAY['Friendly', 'Energetic', 'Loyal'], 
         'Luna is a beautiful golden retriever who loves playing fetch and swimming. She''s great with kids and other dogs!',
         ARRAY['/src/assets/dogs-grid.jpg'], 
         'San Francisco, CA', true),
        ('Max', 'Corgi', '3 years', 'Medium', 
         ARRAY['Playful', 'Smart', 'Gentle'], 
         'Max is an adorable corgi with the sweetest personality. He loves cuddles and is perfect for apartment living.',
         ARRAY['/src/assets/dogs-grid.jpg'], 
         'Los Angeles, CA', false)
      `;
    }

    return res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ error: 'Failed to initialize database' });
  }
}