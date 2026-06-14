import prisma from '../config/prisma';
import { Movie, Prisma } from '@prisma/client';
import { CreateMovieSchema, UpdateMovieSchema } from '../schemas/movie.schemas';
import { AppError } from '../midellewares/errorHandler';

export const createMovie = async (data: CreateMovieSchema): Promise<Movie> => {
  const { genres, ...rest } = data;

  const movie = await prisma.movie.create({
    data: {
      ...rest,
      releaseYear: new Date(rest.releaseYear),
      ...(genres && {
        genres: { connect: genres.map(({ genreId }) => ({ id: genreId })) },
      }),
    },
    include: { genres: true },
  });

  return movie;
};

export const updateMovie = async (
  movieId: number,
  data: UpdateMovieSchema,
): Promise<Movie> => {
  const { genres, ...rest } = data;
  const movie = await prisma.movie.update({
    where: { id: movieId },
    data: {
      ...rest,
      ...(rest.releaseYear && { releaseYear: new Date(rest.releaseYear) }),
      ...(genres && {
        genres: { set: genres.map(({ genreId }) => ({ id: genreId })) },
      }),
    },
    include: { genres: true },
  });
  return movie;
};

export const deleteMovie = async (movieId: number): Promise<Movie> => {
  try {
    const movieToDelete = await prisma.movie.delete({
      where: { id: movieId },
    });
    return movieToDelete;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new AppError('Movie not found', 404);
    }
    throw error;
  }
};
