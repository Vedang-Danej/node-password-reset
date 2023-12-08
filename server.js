import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import passwordResetRoute from './routes/passwordReset.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/password-reset', passwordResetRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
