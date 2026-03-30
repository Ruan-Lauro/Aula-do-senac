import db from './db';

export function runMigrations(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id          TEXT PRIMARY KEY,         
      name        TEXT    NOT NULL,
      author      TEXT    NOT NULL,
      description TEXT    NOT NULL,
      image_url   TEXT    NOT NULL,         
      price       REAL    NOT NULL          
    );
  `);

  console.log('Migrations executadas com sucesso.');
}