import React from 'react'
import { IProduct } from '../ProductData';
import './Product.css'
import { Tabs, Tab } from './Tabs';
import { withLoader } from './withLoader';

const TabHeadingDescripton = (): JSX.Element => <b>Description <span role='img' aria-label='description'>🧾</span></b>
const TabHeadingReviews = (): JSX.Element => <b>Reviews <span role='img' aria-label='reviews'>🤦‍♀️</span></b>

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
      <Tabs >
        <Tab name='description' initialActive={true} heading={TabHeadingDescripton} >
          <p>{description}</p>
        </Tab>
        <Tab name='reviews' heading={TabHeadingReviews} >
          <ul className="product-reviews">
            {reviews.map(({ comment, reviewer }, index) => (
              <li className="product-reviews-item" key={index}>
                <i>{comment}</i> - {reviewer}
              </li>
            ))}
          </ul>
        </Tab>
      </Tabs>
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

export const ProductWithLoader = withLoader(Product)
