export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  picture: any;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.API_URL}/products`)
  const products = await response.json();
  return products

}