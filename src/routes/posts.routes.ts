import { Router } from 'express';
import * as controller from '../controllers/post.controller';
import { auth } from '../midellewares/auth';

const router = Router();
router.use(auth);
router.get('/:id', controller.getPosts);
router.post('/:id', controller.createPost);
export default router;
