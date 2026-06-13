import { Router } from 'express';
import { auth, requireRole } from '../midellewares/auth';
import { validate } from '../midellewares/validate';
import { createMovieSchema } from '../schemas/movie.schemas';
import * as controller from '../controllers/movie.controller';

const router = Router();

router.use(auth);
router.post(
  '/',
  requireRole('ADMIN'),
  validate(createMovieSchema),
  controller.createMovie,
);

export default router;
