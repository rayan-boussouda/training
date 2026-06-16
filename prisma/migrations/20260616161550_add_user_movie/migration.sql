-- CreateEnum
CREATE TYPE "UserMovieStatus" AS ENUM ('WATCHLIST', 'WATCHED', 'FAVORITE');

-- AlterTable
ALTER TABLE "Movie" RENAME CONSTRAINT "Movies_pkey" TO "Movie_pkey";

-- AlterTable
ALTER TABLE "_MovieGenres" RENAME CONSTRAINT "_GenreToMovies_AB_pkey" TO "_MovieGenres_AB_pkey";

-- CreateTable
CREATE TABLE "UserMovie" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "status" "UserMovieStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMovie_userId_movieId_status_key" ON "UserMovie"("userId", "movieId", "status");

-- AddForeignKey
ALTER TABLE "UserMovie" ADD CONSTRAINT "UserMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovie" ADD CONSTRAINT "UserMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "_GenreToMovies_B_index" RENAME TO "_MovieGenres_B_index";
