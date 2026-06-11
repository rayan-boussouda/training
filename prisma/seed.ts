import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../src/config/prisma';

async function main() {
  await prisma.postTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('password123', 10);

  const [alice, bob, admin] = await Promise.all([
    prisma.user.create({
      data: { name: 'Alice', email: 'alice@example.com', password: hash, role: Role.USER },
    }),
    prisma.user.create({
      data: { name: 'Bob', email: 'bob@example.com', password: hash, role: Role.USER },
    }),
    prisma.user.create({
      data: { name: 'Admin', email: 'admin@example.com', password: hash, role: Role.ADMIN },
    }),
  ]);

  const [post3, post4, post5] = await Promise.all([
    prisma.post.create({ data: { title: 'Bob first post', content: 'Hello from Bob!', userId: bob.id } }),
    prisma.post.create({ data: { title: 'Bob second post', content: 'Another post from Bob.', userId: bob.id } }),
    prisma.post.create({ data: { title: 'Admin announcement', content: 'Welcome to the platform!', userId: admin.id } }),
  ]);

  await prisma.post.createMany({
    data: Array.from({ length: 50 }, (_, i) => ({
      title: `Alice post ${i + 1}`,
      content: `This is Alice's post number ${i + 1}.`,
      userId: alice.id,
    })),
  });

  const alicePosts = await prisma.post.findMany({ where: { userId: alice.id } });

  const [tagJs, tagNode, tagUnused] = await Promise.all([
    prisma.tag.create({ data: { name: 'javascript' } }),
    prisma.tag.create({ data: { name: 'nodejs' } }),
    prisma.tag.create({ data: { name: 'unused-tag' } }),
  ]);

  await Promise.all([
    prisma.postTag.create({ data: { postId: alicePosts[0].id, tagId: tagJs.id } }),
    prisma.postTag.create({ data: { postId: alicePosts[1].id, tagId: tagJs.id } }),
    prisma.postTag.create({ data: { postId: alicePosts[1].id, tagId: tagNode.id } }),
    prisma.postTag.create({ data: { postId: post3.id, tagId: tagNode.id } }),
    prisma.postTag.create({ data: { postId: post5.id, tagId: tagJs.id } }),
  ]);

  console.log(`Seeded: 3 users, ${50 + 3} posts (50 for Alice), 3 tags (1 unattached)`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
