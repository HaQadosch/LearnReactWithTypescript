import React from 'react'
import { IProduct } from '../ProductData';
import './Product.css'
import { Tabs, Tab } from './Tabs';

interface IProductProps {
  product: IProduct
  inBasket: boolean
  onAddToBasket: () => void
}

export const Product: React.FC<IProductProps> = ({ product: { id, name, description, price, reviews }, inBasket, onAddToBasket }) => {
  const handleAddToBasket = onAddToBasket

  return (
    <>
      <h2>{name}</h2>
      <Tabs headings={['description', 'reviews']} >
        <Tab name='description' initialActive={true} >
          <b>Description</b>
        </Tab>
        <Tab name='reviews'>Reviews</Tab>
      </Tabs>
      <p>{description}</p>
      <ul className="product-reviews">
        {reviews.map(({ comment, reviewer }, index) => (
          <li className="product-reviews-item" key={index}>
            <i>{comment}</i> - {reviewer}
          </li>
        ))}
      </ul>
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
