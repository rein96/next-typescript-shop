import { getProducts, Product } from 'lib/products';
import { NextApiHandler } from 'next'

const handler: NextApiHandler<Product[]> = async (req, res) => {
  console.log('[/api/products] handler');
  const products = await getProducts();
  res.status(200).json(products);
};

export default handler;