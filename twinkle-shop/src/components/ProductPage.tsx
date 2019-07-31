import React from 'react'
import { IProduct, products as data } from '../ProductData';
import { Link, RouteComponentProps } from 'react-router-dom'

import './ProductPage.css'

export const ProductPage: React.FC<RouteComponentProps> = ({ location: { search } }) => {
  let products: IProduct[] = data
  const urlSearchParams = new window.URLSearchParams(search)
  const searchKey = urlSearchParams.get('search') || ''
  const searchKeyRegExp = new RegExp(searchKey, 'i')

  return (
    <span className='page-container'>
      <p>Welcome to Twinkle Shop where you can get all the tools for React!</p>
      <ul className="product-list">
        {products.reduce<JSX.Element[]>((list, { id, name }) => {
          if (searchKeyRegExp.test(name)) {
            list.push(
              <li className="product-list-item" key={id}>
                <Link to={`/product/${id}`}>{name}</Link>
              </li>
            )
          }
          return list
        }, [])
        }
      </ul>
    </span>
  )
}
