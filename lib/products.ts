import { fetchJson } from "./api"
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number | string;
  pictureUrl: string;
}

function stripProduct(product: any): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2),
    pictureUrl: process.env.API_URL + product.picture.url,
  };
}

export const getSingleProduct = async (id: string): Promise<Product> => {
  console.log('getSingleProduct id', id)
  const product = await fetchJson(`${process.env.API_URL}/products/${id}`)
  return product;
}

export const getProducts = async (): Promise<Product[]> => {
  console.log('getProducts');
  const products = await fetchJson(`${process.env.API_URL}/products`)
  return products.map((product) => stripProduct(product))

}