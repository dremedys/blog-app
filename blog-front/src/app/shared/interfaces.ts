export interface User{
  username: string;
  id: number;
}

export interface Category{
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  published_date: string;
  author: User;
  text: string;
  category: Category;
}

export interface Comment {
  id: number;
  author: User;
  post: Post;
  content: string;
}

export interface AuthToken {
  token: string;
}

export interface Like {
  id: number;
  author: User;
  post: Post;
}
