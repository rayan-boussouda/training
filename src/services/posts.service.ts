import prisma from '../config/prisma';
import type { User, Prisma, Post } from '@prisma/client';

export const getPostsByUserId = async (id: number): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: { userId: id },
  });
  return posts;
};

export const createPost = async (
  userId: number,
  data: Prisma.PostUncheckedCreateInput,
): Promise<Post> => {
  const post = await prisma.post.create({ data: { ...data, userId } });
  return post;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany();
  return posts;
};
