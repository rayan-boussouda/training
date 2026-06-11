import { Router } from 'express';
import * as controller from '../controllers/post.controller';
import { auth, requireRole } from '../midellewares/auth';
import { validate } from '../midellewares/validate';
import { createPostSchema } from '../schemas/post.schema';

const router = Router();
router.use(auth);
router.get('/:id', controller.getPosts);
router.post('/', validate(createPostSchema), controller.createPost);
router.get('/', requireRole('ADMIN'), controller.getAllPosts);
export default router;
