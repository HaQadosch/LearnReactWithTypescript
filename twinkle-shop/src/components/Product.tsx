import React from 'react'
import { IProduct } from '../ProductData';

interface IProductProps {
  product: IProduct
  inBasket: boolean
  onAddToBasket: () => void
}

export const Product: React.FC<IProductProps> = ({ product: { id, name, description, price }, inBasket, onAddToBasket }) => {
  const handleAddToBasket = onAddToBasket

  return (
    <>
      <h2>{name}</h2>
      <p>{description}</p>
      <p className="product-price">
        {new Intl.NumberFormat('en-GB', {
          currency: 'GBP',
          style: 'currency'
        }).format(price)}
      </p>
      {!inBasket && <button onClick={handleAddToBasket}>Add to basket</button>}
    </>
  )
}
