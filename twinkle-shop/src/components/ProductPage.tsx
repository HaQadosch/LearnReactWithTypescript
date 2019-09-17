import React, { useEffect } from 'react'
import { IProduct } from '../ProductData';
import { RouteComponentProps } from 'react-router-dom'

import './ProductPage.css'
import { getProducts } from './ProductsAction';
import { IApplicationState } from './Store';
import { connect } from 'react-redux';
import { ProductsList } from './ProductsList';

interface IProductPage extends RouteComponentProps {
  getProducts: typeof getProducts
  loading: boolean
  products: IProduct[]
}

export const ProductPage_: React.FC<IProductPage> = ({ location: { search }, getProducts, products, loading }) => {
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])

  return (
    <span className='page-container'>
      <p>Welcome to Twinkle Shop where you can get all the tools for React!</p>
      <ProductsList search={search} products={products} isLoading={loading} />
    </span>
  )
}

const mapStateToProps = ({ products: { products, productsLoading: loading } }: IApplicationState) => ({ loading, products })

const mapDispatchToProps = (dispatch: any) => ({ getProducts: () => dispatch(getProducts()) })

export const ProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage_)