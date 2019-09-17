import React, { useReducer } from 'react'
import { IProduct } from '../ProductData';
import './Product.css'
import { Tabs, Tab } from './Tabs';
import { withLoader } from './withLoader';
import produce from 'immer';

const TabHeadingDescripton = (): JSX.Element => <b>Description <span role='img' aria-label='description'>🧾</span></b>
const TabHeadingReviews = (): JSX.Element => <b>Reviews <span role='img' aria-label='reviews'>🤦‍♀️</span></b>

interface IProductProps {
  product: IProduct
  inBasket: boolean
  onAddToBasket: () => void
}

interface ILikeState {
  likes: number
  lastLike: Date | null
}

const initialLikeState: ILikeState = {
  likes: 0,
  lastLike: null
}

enum LikeActionTypes {
  LIKE = 'LIKE'
}

interface ILikeAction {
  type: LikeActionTypes.LIKE
  now: Date
}

type LikeActions = ILikeAction

const reducer = (state: ILikeState = initialLikeState, action: LikeActions) => produce(state, draft => {
  switch (action.type) {
    case LikeActionTypes.LIKE:
      draft.likes = state.likes + 1
      draft.lastLike = action.now
  }
})

export const Product: React.FC<IProductProps> = ({ product: { id, name, description, price, reviews }, inBasket, onAddToBasket }) => {
  const [{ likes, lastLike }, dispatch] = useReducer(reducer, initialLikeState)

  const handleAddToBasket = onAddToBasket
  const handleLikeClick = () => {
    dispatch({
      type: LikeActionTypes.LIKE,
      now: new Date()
    })
  }

  return (
    <>
      <h2>{name}</h2>
      <Tabs >
        <Tab name='description' initialActive={true} heading={TabHeadingDescripton} >
          <p>{description}</p>
        </Tab>
        <Tab name='reviews' heading={TabHeadingReviews} >
          <ul className="product-reviews">
            {reviews.map(({ comment, reviewer }, index) => (
              <li className="product-reviews-item" key={index}>
                <i>{comment}</i> - {reviewer}
              </li>
            ))}
          </ul>
        </Tab>
      </Tabs>
      <p className="product-price">
        {new Intl.NumberFormat('en-GB', {
          currency: 'GBP',
          style: 'currency'
        }).format(price)}
      </p>
      {!inBasket && <button onClick={handleAddToBasket}>Add to basket</button>}
      <section className='like-container'>
        {likes > 0 && (<p>{`I liked this ${likes} time${likes > 1 ? 's' : ''}, last one at ${lastLike}`}</p>)}
        <button onClick={handleLikeClick} >{likes > 0 ? 'Like again' : 'like'}</button>
      </section>
    </>
  )
}

export const ProductWithLoader = withLoader(Product)
