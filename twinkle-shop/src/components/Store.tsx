import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { IProductsState } from './ProductsTypes';
import { IBasketState } from './BasketTypes'
import { productsReducer } from './ProductReducers';
import { basketReducer } from './BasketReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
export interface IApplicationState {
  products: IProductsState
  basket: IBasketState
}

const roodReducer = combineReducers<IApplicationState>({
  products: productsReducer,
  basket: basketReducer
})


export const configureStore = (): Store<IApplicationState> => {
  const initState = undefined // The reducer takes care of the initial state
  return createStore(roodReducer, initState, composeWithDevTools(applyMiddleware(thunk)))
}

