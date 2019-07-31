import React from 'react'
import { IProduct, products as data } from '../ProductData';
import { Link } from 'react-router-dom'

import './ProductPage.css'

export const ProductPage: React.FC = () => {
  let products: IProduct[] = data

  return (
    <span className='page-container'>
      <p>Welcome to Twinkle Shop where you can get all the tools for React!</p>
      <ul className="product-list">
        {products.map(({id, name}) => <li className="product-list-item" key={id}>
          <Link to={`/product/${id}`}>{name}</Link>
        </li>)}
      </ul>
    </span>
  )
}
