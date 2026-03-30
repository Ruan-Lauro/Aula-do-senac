export interface Book {
  id: string;          
  name: string;       
  author: string;      
  description: string; 
  imageUrl: string;   
  price: number;       
}

export type CreateBookDTO = Omit<Book, 'id'>;

export type UpdateBookDTO = Partial<CreateBookDTO>;