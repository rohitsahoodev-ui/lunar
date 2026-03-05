#!/bin/bash

# LunarHost One-Click Installation Script
# For Ubuntu/Debian Systems

echo "🚀 Starting LunarHost Installation..."

# 1. Update System
echo "📦 Updating system packages..."
sudo apt update -y

# 2. Install Node.js if not present
if ! command -v node &> /dev/null
then
    echo "🟢 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js is already installed ($(node -v))"
fi

# 3. Install Project Dependencies
echo "🛠️ Installing project dependencies..."
npm install

# 4. Setup Environment Variables
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Please edit the .env file with your database and API credentials."
else
    echo "✅ .env file already exists."
fi

# 5. Database Reminder
echo ""
echo "🗄️  DATABASE SETUP:"
echo "1. Create a MySQL database named 'lunarhost'."
echo "2. Import the 'database.sql' file into your database."
echo "3. Update your DB_USER and DB_PASS in the .env file."
echo ""

# 6. Final Instructions
echo "🎉 Installation Complete!"
echo "To start the server in development mode, run: npm run dev"
echo "To start the server in production mode, run: npm start"
echo ""
echo "Default Admin: admin@lunarhost.com / admin123"
