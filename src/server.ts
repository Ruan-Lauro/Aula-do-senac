import express from 'express';
import bookRoutes from './routes/bookRoutes';
import { runMigrations } from './database/migrate';

const app = express();
const PORT = 3000;

app.use(express.json());

runMigrations();

app.use('/books', bookRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Book CRUD API com SQLite rodando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
