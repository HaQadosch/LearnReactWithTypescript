import { IProduct } from './../ProductData';

export enum BasketActionType {
  ADD = 'BASKET/ADD'
}

export interface IBasketState {
  readonly products: IProduct[]
}

export interface IBasketAdd {
  type: BasketActionType.ADD
  product: IProduct
}

export type BasketActions = IBasketAdd
