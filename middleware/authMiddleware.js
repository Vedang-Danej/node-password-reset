import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import query from '../config/db.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const result = await query('SELECT email FROM users WHERE email=?', [decoded.email]);
      if (!result) throw new Error('Bad Token');

      req.email = result[0].email;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Authorization error, no token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Authorization error, no token');
  }
});
