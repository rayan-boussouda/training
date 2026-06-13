import prisma from '../config/prisma';
import { Movie } from '@prisma/client';
import { CreateMovieSchema } from '../schemas/movie.schemas';

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
