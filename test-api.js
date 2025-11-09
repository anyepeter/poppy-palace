import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected:', result[0].now);
    
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
    console.log('✅ Dogs table created');

    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        content_key VARCHAR(255) UNIQUE NOT NULL,
        content_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Site content table created');

    // Insert test data
    const existingDogs = await sql`SELECT COUNT(*) FROM dogs`;
    if (existingDogs[0].count === '0') {
      await sql`
        INSERT INTO dogs (name, breed, age, size, personality, description, images, location, is_sponsored)
        VALUES 
        ('Luna', 'Golden Retriever', '2 years', 'Large', 
         ARRAY['Friendly', 'Energetic', 'Loyal'], 
         'Luna is a beautiful golden retriever who loves playing fetch and swimming.',
         ARRAY['/src/assets/dogs-grid.jpg'], 
         'San Francisco, CA', true),
        ('Max', 'Corgi', '3 years', 'Medium', 
         ARRAY['Playful', 'Smart', 'Gentle'], 
         'Max is an adorable corgi with the sweetest personality.',
         ARRAY['/src/assets/dogs-grid.jpg'], 
         'Los Angeles, CA', false)
      `;
      console.log('✅ Test dogs inserted');
    }

    // Test queries
    const dogs = await sql`SELECT * FROM dogs`;
    console.log('✅ Dogs retrieved:', dogs.length);

    console.log('\n🎉 Database setup complete! Ready for local testing.');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDatabase();