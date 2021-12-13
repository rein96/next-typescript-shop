import { fetchJson } from "./api"
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  picture: any;
}

export const getSingleProduct = async (id: string): Promise<Product> => {
  console.log('getSingleProduct id', id)
  const product = await fetchJson(`${process.env.API_URL}/products/${id}`)
  return product;
}

export const getProducts = async (): Promise<Product[]> => {
  console.log('getProducts');
  const products = await fetchJson(`${process.env.API_URL}/products`)
  return products

}