import { Reducer } from 'redux'
import { IProductsState, ProductsActionTypes, ProductsActions } from './ProductsTypes'
import { produce } from 'immer'


const initialProductState: IProductsState = {
  products: [],
  productsLoading: false,
  currentProduct: null
}

export const productsReducer: Reducer<IProductsState, ProductsActions> = (state = initialProductState, action) => produce(state, draft => {
  switch (action.type) {
    case ProductsActionTypes.LOADING:
      draft.productsLoading = true
      break
    case ProductsActionTypes.GETALL:
      draft.products = action.products
      draft.productsLoading = false
      break
    case ProductsActionTypes.GETSINGLE:
      draft.currentProduct = action.product
      draft.productsLoading = false
      break
  }
})
