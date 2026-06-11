import prisma from '../config/prisma';
import type { User, Prisma, Post } from '@prisma/client';
import { CreatePostInput } from '../schemas/post.schema';

export const getPostsByUserId = async (id: number): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: { userId: id },
  });
  return posts;
};

export const createPost = async (
  userId: number,
  data: CreatePostInput,
): Promise<Post> => {
  const { tags, ...rest } = data;

  const post = await prisma.post.create({
    data: {
      ...rest,
      userId,
      ...(tags && {
        tags: { createMany: { data: tags } },
      }),
    },
  });

  return post;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany();
  return posts;
};
