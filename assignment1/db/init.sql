CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, description, quantity, price) VALUES
('Laptop Pro 15', 'High performance laptop with 16GB RAM and 512GB SSD', 25, 1299.99),
('Wireless Mouse', 'Ergonomic optical wireless mouse', 150, 29.99),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 75, 89.50),
('USB-C Hub', '7-in-1 Type C adapter with 4K HDMI', 120, 35.00),
('27" Monitor', '4K UHD IPS Display', 40, 349.99);
