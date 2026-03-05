-- LunarHost Database Schema

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ip VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    cpu VARCHAR(255),
    ram VARCHAR(255),
    disk VARCHAR(255),
    bandwidth VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('minecraft', 'vps', 'web', 'discord') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    ram VARCHAR(255),
    cpu VARCHAR(255),
    disk VARCHAR(255),
    bandwidth VARCHAR(255),
    location VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    node_id INT NOT NULL,
    status ENUM('pending', 'active', 'suspended', 'terminated') DEFAULT 'pending',
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    FOREIGN KEY (node_id) REFERENCES nodes(id)
);

CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('unpaid', 'paid', 'cancelled', 'refunded') DEFAULT 'unpaid',
    description TEXT,
    due_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('open', 'answered', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ticket_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount DECIMAL(10, 2) NOT NULL,
    type ENUM('percentage', 'fixed') DEFAULT 'percentage',
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sample Data
INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@lunarhost.com', '$2a$10$8K1p/a2Q5p2Q5p2Q5p2Q5p2Q5p2Q5p2Q5p2Q5p2Q5p2Q5p2Q5p2Q', 'admin');
INSERT INTO nodes (name, ip, location, cpu, ram, disk, bandwidth) VALUES ('Node 01 - New York', '192.168.1.1', 'USA', 'Ryzen 9 5950X', '128GB', '2TB NVMe', '1Gbps');
INSERT INTO plans (name, type, price, ram, cpu, disk, bandwidth, location) VALUES ('Starter VPS', 'vps', 5.00, '2GB', '1 Core', '20GB', '1TB', 'USA');
INSERT INTO plans (name, type, price, ram, cpu, disk, bandwidth, location) VALUES ('Pro Minecraft', 'minecraft', 15.00, '8GB', '2 Cores', '50GB', 'Unlimited', 'USA');
