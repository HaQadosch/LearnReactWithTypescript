import React from 'react'
import './BasketSummary.css'

interface IBasketSummary {
  count: number
}

export const BasketSummary: React.FC<IBasketSummary> = ({ count }) => {
  return (
    <div className="basket-summary">
      {count}
    </div>
  )
}
