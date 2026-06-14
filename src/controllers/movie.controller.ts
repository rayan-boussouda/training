import { NextFunction, Request, Response } from 'express';
import * as movieService from '../services/movie.service';
export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieService.updateMovie(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movieDeleted = await movieService.deleteMovie(Number(req.params.id));
    res.status(200).json(movieDeleted);
  } catch (error) {
    next(error);
  }
};
