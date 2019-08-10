import React, { useState } from 'react'
import { RouteComponentProps, Prompt } from 'react-router-dom'
import { IProduct, products } from '../ProductData';
import { Product } from './Product';

type Props = RouteComponentProps<{ id: string }>

export const ProductDetailPage: React.FC<Props> = ({ match: { params: { id } } }) => {
  const [inBasket, setInBasket] = useState<boolean>(false)

  const productFound: IProduct | undefined = products.filter(({ id: productId }) => productId === parseInt(id, 10)).pop()

  const handleAddToBasket = () => {
    setInBasket(true)
  }

  const navAwayMessage = () => 'Are you sure you want to leave without adding anything to the basket?'

  return (
    <span className="page-container">
      <Prompt when={!inBasket} message={navAwayMessage} />
      {productFound
        ? <Product product={productFound} inBasket={inBasket} onAddToBasket={handleAddToBasket} />
        : <p>Product not found</p>
      }
    </span>
  )
}
