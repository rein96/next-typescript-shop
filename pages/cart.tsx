import React from 'react';
import Page from 'components/Page';
import { useQuery } from 'react-query';
import { fetchJson } from 'lib/api';
import { CardItem } from 'lib/cart';

interface CalculatedCart {
  grandTotal: number;
  items: (CardItem & { total: number })[]
}

interface CardTableProps {
  cartItems: CardItem[];
}

const formatCurrency = (price: number): string => {
  return '$' + price.toFixed(2)
}

const cardCalculation = (cartItems: CardItem[]): CalculatedCart => {

  const items = cartItems.map((cart: CardItem) => {
    let totalPerItem = cart.quantity * cart.product.price
    return {
      ...cart,
      total: totalPerItem
    }
  })

  let grandTotal = 0.0;
  for (let i = 0; i < items.length; i++) {
    grandTotal = grandTotal + items[i].total
  }

  return { items, grandTotal }
}

const CartTable: React.FC<CardTableProps> = ({ cartItems }) => {
  const calculatedCarts = cardCalculation(cartItems)
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">
            Product
          </th>
          <th className="px-4 py-2">
            Price
          </th>
          <th className="px-4 py-2">
            Quantity
          </th>
          <th className="px-4 py-2">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {calculatedCarts.items.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">
              {cartItem.product.title}
            </td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(cartItem.product.price)}
            </td>
            <td className="px-4 py-2 text-right">
              {cartItem.quantity}
            </td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(cartItem.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">
            Total
          </th>
          <th></th>
          <th></th>
          <th className="px-4 py-2 text-right">
            {formatCurrency(calculatedCarts.grandTotal)}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

const CartPage: React.FC = () => {

  const { data: cartItems } = useQuery<CardItem[]>('CART_ITEM_KEY', () => fetchJson('/api/cart'))

  return (
    <Page title="Cart">
      {cartItems && <CartTable cartItems={cartItems} />}
    </Page>
  );
};

export default CartPage;