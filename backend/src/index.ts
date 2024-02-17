import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes';
import { notFound, errrorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

connectDB();

const app: Express = express();
const port = process.env.PORT || 4000;

// cookie parser middleware
app.use(cookieParser());

// body parser middleware
app.use(express.json());

// body parser middleware for formData
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errrorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
