import { fetchJson } from 'lib/api';
import router from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Button from './Button';

interface AddToCartWidgetProps {
  productId: number;
}

const AddToCartWidget: React.FC<AddToCartWidgetProps> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);

  const { mutateAsync, isLoading } = useMutation(() => fetchJson('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity })
  }))

  const handleClick = async () => {
    await mutateAsync()
    router.push('/cart')
  };

  return (
    <div className="py-2">
      <input type="number" min="1"
        className="border rounded px-3 py-1 mr-2 w-16 text-right"
        value={quantity.toString()} // use string to avoid Received NaN for the `value` attribute.
        onChange={(event) => setQuantity(parseInt(event.target.value))}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={handleClick}>
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartWidget;