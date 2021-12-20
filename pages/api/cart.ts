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


const handleGetCart: NextApiHandler<CardItem> = async (req, res) => {
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

const handlePostCart = async (req, res) => {
  const { jwt } = req.cookies
  if (!jwt) {
    return res.status(401).end()
  }

  const { productId, quantity } = req.body

  try {
    const product = await fetchJson(`${API_URL}/cart-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        product: productId,
        quantity: quantity
      })
    })

    if (product.id) {
      res.status(200).json({
        message: 'Add to cart successfully',
        productId,
        quantity,
      })
    }
  } catch (error) {
    console.error(error);
    res.status(401).end()
  }
}

const handleCart = (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetCart(req, res)
    case 'POST':
      return handlePostCart(req, res)
    default:
      // 405 = method not allowed
      res.status(405).end()
  }
}


export default handleCart;