import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Header } from './Header'
import { AdminPage } from './AdminPage'
import { ProductPage } from './ProductPage'

export const Routes: React.FC = () => {
  return (
    <Router>
      <span>
        <Header />
        <Route path='/products' component={ProductPage} />
        <Route path='/admin' component={AdminPage} />
      </span>
    </Router>
  )
}
