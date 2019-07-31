import React, { useState } from 'react'
import { IProduct, products as data } from '../ProductData';
import './ProductPage.css'

interface IProductPage {
  products: IProduct[]
}

export const ProductPage: React.FC<IProductPage> = () => {
  const [products, setProducts] = useState<IProduct[]>(data)

  return (
    <div className='page-container'>
      <p>Welcome to Twinkle Shop where you can get all the tools for React!</p>
      <ul className="product-list">
        {products.map(({id, name}) => {
          <li className="product-list-item" key={id}>{name}</li>
        })}
      </ul>
    </div>
  )
}
