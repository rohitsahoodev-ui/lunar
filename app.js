import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development/CDN assets
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_SECRET || 'lunarhost-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static Files
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Global Variables
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.path = req.path;
  next();
});

// Routes
import authRoutes from './backend/routes/authRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import adminRoutes from './backend/routes/adminRoutes.js';
import paymentRoutes from './backend/routes/paymentRoutes.js';
import ticketRoutes from './backend/routes/ticketRoutes.js';
import planRoutes from './backend/routes/planRoutes.js';
import serverRoutes from './backend/routes/serverRoutes.js';

app.use('/auth', authRoutes);
app.use('/dashboard', userRoutes);
app.use('/admin', adminRoutes);
app.use('/payment', paymentRoutes);
app.use('/tickets', ticketRoutes);
app.use('/plans', planRoutes);
app.use('/servers', serverRoutes);

app.get('/', (req, res) => {
  res.render('pages/home', { title: 'LunarHost - Premium Hosting' });
});

// Error Handling
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 - Not Found' });
});

export default app;
