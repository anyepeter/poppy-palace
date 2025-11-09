-- Dogs table
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
);

-- Site content table
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  content_key VARCHAR(255) UNIQUE NOT NULL,
  content_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default site content
INSERT INTO site_content (content_key, content_data) VALUES ('main', '{}') ON CONFLICT (content_key) DO NOTHING;