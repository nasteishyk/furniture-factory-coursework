export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category_id?: number;
  stock?: number;  
}
