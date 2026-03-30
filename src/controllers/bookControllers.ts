import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db';
import { Book, CreateBookDTO, UpdateBookDTO } from '../models/book';

export const getAllBooks = (req: Request, res: Response): void => {
  const stmt = db.prepare<[], Book>('SELECT * FROM books');
  const books = stmt.all();

  res.status(200).json(books);
};


export const getBookById = (req: Request, res: Response): void => {
  let { id } = req.params;
  if (Array.isArray(id)) {
    id = id[0];
  }

  const stmt = db.prepare<[string], Book>('SELECT * FROM books WHERE id = ?');
  const book = stmt.get(id);

  if (!book) {
    res.status(404).json({ message: `Livro com id "${id}" não encontrado.` });
    return;
  }

  res.status(200).json(book);
};


export const createBook = (req: Request, res: Response): void => {
  const body = req.body as CreateBookDTO;
  const { name, author, description, imageUrl, price } = body;

  if (!name || !author || !description || !imageUrl || price === undefined) {
    res.status(400).json({
      message: 'Campos obrigatórios: name, author, description, imageUrl, price.',
    });
    return;
  }

  const id = uuidv4();

  const stmt = db.prepare(`
    INSERT INTO books (id, name, author, description, image_url, price)
    VALUES (@id, @name, @author, @description, @imageUrl, @price)
  `);

  stmt.run({ id, name, author, description, imageUrl, price });

  const created = db.prepare<[string], Book>('SELECT * FROM books WHERE id = ?').get(id);

  res.status(201).json(created);
};

export const updateBook = (req: Request, res: Response): void => {
  let { id } = req.params;
  if (Array.isArray(id)) {
    id = id[0];
  }
  const body = req.body as UpdateBookDTO;

  const existing = db.prepare('SELECT * FROM books WHERE id = ?').get(id) as {
    id: string;
    name: string;
    author: string;
    description: string;
    image_url: string;
    price: number;
  };
  
  if (!existing) {
    res.status(404).json({ message: `Livro com id "${id}" não encontrado.` });
    return;
  }

  const updated = {
    ...existing,
    ...body,
    imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.image_url,
  };

  db.prepare(`
    UPDATE books
    SET name        = @name,
        author      = @author,
        description = @description,
        image_url   = @imageUrl,
        price       = @price
    WHERE id = @id
  `).run({
    name: updated.name,
    author: updated.author,
    description: updated.description,
    imageUrl: updated.imageUrl,
    price: updated.price,
    id
  });

  const result = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
  res.status(200).json(result);
};


export const deleteBook = (req: Request, res: Response): void => {
  let { id } = req.params;
  if (Array.isArray(id)) {
    id = id[0];
  }

  const existing = db.prepare<[string], Book>('SELECT * FROM books WHERE id = ?').get(id);
  if (!existing) {
    res.status(404).json({ message: `Livro com id "${id}" não encontrado.` });
    return;
  }

  db.prepare('DELETE FROM books WHERE id = ?').run(id);

  res.status(204).send();
};