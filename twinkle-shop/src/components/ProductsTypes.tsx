import { IProduct, products } from '../ProductData'

export enum ProductsActionTypes {
  GETALL = 'PRODUCTS/GETALL',
  LOADING = 'PRODUCTS/LOADING'
}

export interface IProductsGetAllAction {
  type: ProductsActionTypes.GETALL
  products: IProduct[]
}

export interface IProductsLoadingAction {
  type: ProductsActionTypes.LOADING
}

export interface IProductsState {
  readonly products: IProduct[]
  readonly productsLoading: boolean
}

