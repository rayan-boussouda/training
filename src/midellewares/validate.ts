import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';
import { AppError } from './errorHandler';

export const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = {
        body: req.body,
        params: req.params,
        query: req.params,
      };
      schema.parse(result);
      console.log('before coercion:', {
        body: req.body,
        params: req.params,
        query: req.query,
      });
      req.body = result.body ?? {};
      req.params = result.params ?? {};
      req.query = result.query ?? {};
      console.log('after coercion:', {
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues);
        const messages = error.issues.map((i) => i.message);
        next(new AppError(messages.join(', '), 400));
      } else {
        next(error);
      }
    }
  };
};
