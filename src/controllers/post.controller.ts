import { Request, Response, NextFunction } from 'express';
import * as postService from '../services/posts.service';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPostsByUserId(Number(req.params.id));
  console.log(req);
  console.log('salut');
  if (!posts) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json(posts);
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await postService.createPost(Number(req.params.id), req.body);
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};
