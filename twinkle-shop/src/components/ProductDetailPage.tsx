import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IProduct, products } from '../ProductData';

type Props = RouteComponentProps<{ id: string }>

export const ProductDetailPage: React.FC<Props> = ({ match: { params: { id } } }) => {
  console.log('<ProductDetailPage>', { id })

  const [inBasket, setInBasket] = useState<boolean>(false)

  const productFound: IProduct | undefined = products.filter(({ id: productId }) => productId === parseInt(id, 10)).pop()
  const { name, description, price } = productFound || { name: '', description: '', price: 0 }

  const handleAddToBasket = () => {
    setInBasket(true)
  }

  return (
    <span className="page-container">
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
