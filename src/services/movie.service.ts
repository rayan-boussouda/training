import prisma from '../config/prisma';
import { Movie } from '@prisma/client';
import { CreateMovieSchema, UpdateMovieSchema } from '../schemas/movie.schemas';

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
