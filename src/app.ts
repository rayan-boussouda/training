import express from 'express';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/posts.routes';
import tagsRoutes from './routes/tags.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './midellewares/errorHandler';
const app = express();

app.use((req, _res, next) => {
  Object.defineProperty(req, 'query', {
    writable: true,
    configurable: true,
    value: req.query,
  });
  next();
});
app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/tags', tagsRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

export default app;
