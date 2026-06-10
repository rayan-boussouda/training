// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new AppError('Unauthorized', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};

export const requireRole = (role: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      throw new AppError('Forbidden', 403);
    }
    next();
  };
};
