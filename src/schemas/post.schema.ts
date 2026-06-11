import z from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(3).max(300),
    tags: z.array(z.object({ tagId: z.number().int().positive() })).optional(),
  }),
});
export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
