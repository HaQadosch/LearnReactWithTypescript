import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getProducts as getProductsFromAPI, getProduct as getProductFromAPI } from '../ProductData'
import { IProductsGetAllAction, IProductGetSingleAction, IProductsLoadingAction, IProductsState, ProductsActionTypes } from './ProductsTypes'

export const loading: ActionCreator<IProductsLoadingAction> = () => ({
  type: ProductsActionTypes.LOADING
})

export const getProducts: ActionCreator<ThunkAction<Promise<IProductsGetAllAction>, IProductsState, null, IProductsGetAllAction>> = () => {
  return async (dispatch: Dispatch<IProductsGetAllAction>) => {
    const products = await getProductsFromAPI()
    return dispatch({
      products,
      type: ProductsActionTypes.GETALL
    })
  }
}

export const getProduct: ActionCreator<ThunkAction<Promise<void>, IProductsState, null, IProductGetSingleAction>> = (id: number) => {
  return async (dispatch: Dispatch<IProductGetSingleAction | IProductsLoadingAction>) => {
    dispatch(loading())
    const product = await getProductFromAPI(id)
    dispatch({ product, type: ProductsActionTypes.GETSINGLE })
  }
}
