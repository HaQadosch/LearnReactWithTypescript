import { produce } from 'immer';
import { Reducer } from 'redux';
import { IBasketState, BasketActions, BasketActionType } from "./BasketTypes";

const initialBasketState: IBasketState = {
  products: []
}

export const basketReducer: Reducer<IBasketState, BasketActions> = (state = initialBasketState, action) => produce(state, draft => {
  switch (action.type) {
    case BasketActionType.ADD:
      draft.products = state.products.concat(action.product)
      break
  }
})