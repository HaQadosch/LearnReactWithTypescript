import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AdminPage } from './AdminPage'
import { ProductPage } from './ProductPage'

export const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Route path='/products' component={ProductPage} />
        <Route path='admin' component={AdminPage} />
      </div>
    </Router>
  )
}
