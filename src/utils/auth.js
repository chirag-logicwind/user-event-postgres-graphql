import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { addMinutes } from './date.js';
import { randomUUID } from 'crypto';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN = '7d' } = process.env;

export const signJwt = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyJwt = (token) => jwt.verify(token, JWT_SECRET);

// Build GraphQL context user from Authorization header
export const getUserFromAuthHeader = (req) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  try {
    const decoded = verifyJwt(token);
    return decoded; // { id, email, ... }
  } catch {
    return null;
  }
};

// Simple auth guard for resolvers
export const requireAuth = (ctx) => {
  // console.log('from rrq auth', ctx);
  if (!ctx.user) {
    throw new Error('Not authenticated');
  }
  return ctx.user;
};

// Token for password reset: use UUID; in production you can use crypto.randomBytes
export const generateResetToken = () => randomUUID();

// expiry utility (e.g., 15 minutes)
export const resetExpiry = () => addMinutes(new Date(), 15);