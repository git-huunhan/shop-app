export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  stock: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
