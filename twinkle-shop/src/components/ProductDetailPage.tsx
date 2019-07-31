import React, { useState } from 'react'
import { RouteComponentProps, Prompt } from 'react-router-dom'
import { IProduct, products } from '../ProductData';

type Props = RouteComponentProps<{ id: string }>

export const ProductDetailPage: React.FC<Props> = ({ match: { params: { id } } }) => {
  const [inBasket, setInBasket] = useState<boolean>(false)

  const productFound: IProduct | undefined = products.filter(({ id: productId }) => productId === parseInt(id, 10)).pop()
  const { name, description, price } = productFound || { name: '', description: '', price: 0 }

  const handleAddToBasket = () => {
    setInBasket(true)
  }

  const navAwayMessage = () => 'Are you sure you want to leave without adding anything to the basket?'

  return (
    <span className="page-container">
      <Prompt when={!inBasket} message={navAwayMessage} />
      {productFound ? (
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
      ) : (
          <p>Product not found</p>
        )}
    </span>
  )
}
