import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.render('auth/register', { error: 'Email already in use', title: 'Register' });
    }
    await User.create({ name, email, password });
    res.redirect('/auth/login?registered=true');
  } catch (error) {
    console.error(error);
    res.render('auth/register', { error: 'Registration failed', title: 'Register' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('auth/login', { error: 'Invalid email or password', title: 'Login' });
    }
    
    // Set session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('auth/login', { error: 'Login failed', title: 'Login' });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
