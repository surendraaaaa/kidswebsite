-- Database Schema for Krishiv Creation
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'kids', 'women', 'festive-matching'
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_requests (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(200) NOT NULL,
    job_type VARCHAR(100) NOT NULL,
    urgency VARCHAR(50) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'UPI', 'RAZORPAY', 'COD'
    payment_status VARCHAR(50) DEFAULT 'CONFIRMED',
    items JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Initial Products
INSERT INTO products (name, category, price, stock, image_url, description) VALUES
('Kids Embroidered Silk Lehenga', 'kids', 1499.00, 15, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80', 'Pure chanderi silk lehenga with hand-embroidered border for ages 2-10.'),
('Mom & Daughter Festive Co-ord Set', 'festive-matching', 3499.00, 8, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80', 'Coordinated peach georgette anarkali set for celebrations and family portraits.'),
('Floral Handblock Pure Cotton Frock', 'kids', 899.00, 25, 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80', 'Skin-friendly organic cotton frock with natural vegetable dyes for all-day play.'),
('Designer Georgette Straight Kurti', 'women', 1899.00, 12, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', 'Elegant mirror-work detailing with premium cotton lining, tailored for festive gatherings.')
ON CONFLICT DO NOTHING;
