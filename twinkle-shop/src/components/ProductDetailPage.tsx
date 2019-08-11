import React, { useState, useEffect } from 'react'
import { RouteComponentProps, Prompt } from 'react-router-dom'
import { IProduct, getProduct } from '../ProductData';
import { /*Product, */ProductWithLoader } from './Product';

type Props = RouteComponentProps<{ id: string }>

export const ProductDetailPage: React.FC<Props> = ({ match: { params: { id = '0' } } }) => {
  const [inBasket, setInBasket] = useState<boolean>(false)
  const [product, setProduct] = useState<IProduct | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      const productId = parseInt(id, 10)
      const lookedUp = await getProduct(productId)
      setProduct(lookedUp)
      setLoading(false)

    }
    fetchData();
    return () => {
      setProduct(null)
    }
  }, [id])

  const handleAddToBasket = () => {
    setInBasket(true)
  }

  const navAwayMessage = () => 'Are you sure you want to leave without adding anything to the basket?'

  return (
    <span className="page-container">
      <Prompt when={!inBasket} message={navAwayMessage} />
      {product || loading
        ? <ProductWithLoader product={product as IProduct} inBasket={inBasket} onAddToBasket={handleAddToBasket} isLoading={loading} />
        : <p>Product not found</p>
      }
    </span>
  )
}
