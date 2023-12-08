import query from '../config/db.js';
import { hashPassword } from '../utils/bcrypt.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await query('SELECT * FROM users WHERE email=?', [email]);
    if (!result.length)
      return res.status(400).json({ message: 'User with this email does not exist' });

    let token = generateToken(email, '15m');

    const link = `${process.env.BASE_URL}/api/password-reset/${token}`;
    const message = `The link to reset your password in Test App is ${link} . The Link expires in 15 minutes`;
    await sendEmail(email, 'Password reset', message);

    res.json({ message: 'password reset link sent to your email account' });
  } catch (error) {
    res.send({ message: 'An error occured' });
    console.log(error);
  }
};

export const passwordReset = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const result = await query('SELECT * FROM users WHERE email=?', [email]);
    if (!result.length) throw new Error('Invalid email or expired token');
    const hashedPassword = await hashPassword(password);
    const updateResult = await query('UPDATE users SET password=? WHERE email=?', [
      hashedPassword,
      email,
    ]);
    res.json({ result: updateResult });
  } catch (error) {
    res.status(400).json({ message: 'Server Error' });
    console.log(error);
  }
};
