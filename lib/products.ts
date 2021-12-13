export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  picture: any;
}

export const getSingleProduct = async (id: string) : Promise<Product> => {
  console.log('getSingleProduct id', id)
  const response = await fetch(`${process.env.API_URL}/products/${id}`)
  if(!response.ok){
    throw new Error(`request failed: ${response.status}`)
  }
  const product = await response.json()
  return product;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.API_URL}/products`)
  const products = await response.json();
  return products

}