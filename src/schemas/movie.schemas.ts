// model Movie {
//   id          Int      @id @default(autoincrement())
//   title       String
//   synopsis    String
//   posterUrl   String
//   releaseYear DateTime
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @default(now())
//   genres      Genre[]  @relation("_MovieGenres")
// }

import z from 'zod';

export const createMovieSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100),
    synopsis: z.string().min(3).max(1000),
    posterUrl: z.url().optional(),
    releaseYear: z.iso.date(),
    genres: z
      .array(z.object({ genreId: z.number().int().positive() }))
      .optional(),
  }),
});

export const updateMovieSchema = z.object({
  body: createMovieSchema.shape.body.partial(),
});
export type UpdateMovieSchema = z.infer<typeof updateMovieSchema>['body'];
export type CreateMovieSchema = z.infer<typeof createMovieSchema>['body'];
