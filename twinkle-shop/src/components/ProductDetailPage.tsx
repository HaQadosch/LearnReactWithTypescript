import React, { useEffect } from 'react'
import { RouteComponentProps, Prompt } from 'react-router-dom'
import { IProduct } from '../ProductData';
import { ProductWithLoader } from './Product';
import { addToBasket } from './BasketAction'
import { getProduct } from './ProductsAction'
import { IApplicationState } from './Store';
import { connect } from 'react-redux';

interface IProductDetailPage extends RouteComponentProps<{ id: string }> {
  addToBasket: typeof addToBasket
  getProduct: typeof getProduct
  loading: boolean
  product?: IProduct
  added: boolean
}

const ProductDetailPage_: React.FC<IProductDetailPage> = ({ match: { params: { id = '0' } }, getProduct, added, loading, product, addToBasket }) => {
  useEffect(() => {
    getProduct(parseInt(id, 10))
    // eslint-disable-next-line
  }, [id])

  const handleAddToBasket = () => {
    if (product !== undefined) {
      addToBasket(product)
    }
  }

  const navAwayMessage = () => 'Are you sure you want to leave without adding anything to the basket?'

  return (
    <span className="page-container">
      <Prompt when={!added} message={navAwayMessage} />
      {product || loading
        ? <ProductWithLoader product={product as IProduct} inBasket={added} onAddToBasket={handleAddToBasket} isLoading={loading} />
        : <p>Product not found</p>
      }
    </span>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
  getProduct: (id: number) => dispatch(getProduct(id))
})

const mapStateToProps = ({ basket: { products }, products: { productsLoading, currentProduct } }: IApplicationState) => ({
  basketProducts: products,
  loading: productsLoading,
  product: currentProduct || undefined,
  added: products.some(({ id }) => currentProduct && id === currentProduct.id)
})

export const ProductDetailPage = connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage_)
