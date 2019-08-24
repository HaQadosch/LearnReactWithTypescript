import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { IProductsState } from './ProductsTypes';
import { productsReducer } from './ProductReducers';

export interface IApplicationState {
  products: IProductsState
}

const roodReducer = combineReducers<IApplicationState>({
  products: productsReducer
})


export const configureStore = (): Store<IApplicationState> => {
  const initState = undefined // The reducer takes care of the initial state
  return createStore(roodReducer, initState, applyMiddleware(thunk))
}

