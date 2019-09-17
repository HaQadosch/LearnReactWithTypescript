import { IProduct } from './../ProductData';
import { IBasketAdd, BasketActionType } from './BasketTypes';


// Action creator, takes the product and returns it in the action with the appropriate type,
export const addToBasket = (product: IProduct): IBasketAdd => ({
  product,
  type: BasketActionType.ADD
})