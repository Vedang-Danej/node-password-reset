import asyncHandler from 'express-async-handler';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import generateToken from '../utils/generateToken.js';
import query from '../config/db.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await query('SELECT * FROM users WHERE email=?', [email]);
  if (result.length) throw new Error('User Already Exists');

  const hashedPassword = await hashPassword(password);
  const token = generateToken(email, '30d');

  await query('INSERT INTO users VALUES(?,?)', [email, hashedPassword]);

  res.status(201).json({
    email,
    token,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await query('SELECT * FROM users WHERE email=?', [email]);
  if (!result.length) throw new Error('User not found.');
  const ifMatch = await comparePassword(password, result[0].password);
  if (!ifMatch) throw new Error('Wrong Password');
  const token = generateToken(result[0].email, '30d');

  res.json({
    email,
    token,
  });
});
export const protectedRoute = asyncHandler(async (req, res) => {
  res.json({ message: `Hello, weclome to protected route. Your email is ${req.email}` });
});
