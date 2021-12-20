import { fetchJson } from "lib/api";
import { CardItem } from "lib/cart";
import { NextApiHandler } from "next";

const { API_URL } = process.env

const stripCartItem = (cardItem: any): CardItem => {
  return {
    id: cardItem.id,
    quantity: cardItem.quantity,
    product: {
      id: cardItem.product.id,
      title: cardItem.product.title,
      price: cardItem.product.price,
    }
  }
}


const handleCart: NextApiHandler<CardItem> = async (req, res) => {

  const { jwt } = req.cookies
  if (!jwt) {
    return res.status(401).end()
  }

  try {
    const carts = await fetchJson(`${API_URL}/cart-items`, {
      headers: { 'Authorization': `Bearer ${jwt}` }
    })
    res.status(200).json(carts.map(stripCartItem))
  } catch (error) {
    console.error(error);
    res.status(401).end()
  }
}

export default handleCart;