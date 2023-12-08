import jwt from 'jsonwebtoken';

const generateToken = (email, time) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};

export default generateToken;
