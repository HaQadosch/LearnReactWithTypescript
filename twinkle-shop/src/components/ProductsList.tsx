import React from 'react'
import { IProduct } from '../ProductData';
import { Link } from 'react-router-dom';
import { withLoader } from './withLoader';

interface IProductsList {
  products?: IProduct[]
  search: string
}

const ProductsList_: React.FC<IProductsList> = ({ products, search }) => {
  const urlSearchParams = new window.URLSearchParams(search)
  const searchKey = urlSearchParams.get('search') || ''
  const searchKeyRegExp = new RegExp(searchKey, 'i')

  return (
    <ul className="product-list">
      {products && products.reduce<JSX.Element[]>((list, { id, name }) => {
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
  )
}

export const ProductsList = withLoader(ProductsList_)