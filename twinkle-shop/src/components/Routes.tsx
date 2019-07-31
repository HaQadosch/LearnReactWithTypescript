import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './Header'
import { AdminPage } from './AdminPage'
import { ProductPage } from './ProductPage'
import { ProductDetailPage } from './ProductDetailPage'
import { NotFoundPage } from './NotFoundPage'

export const Routes: React.FC = () => {
  return (
    <Router>
      <span>
        <Header />
        <Switch>
          <Route path='/products' component={ProductPage} />
          <Route path='/product/:id' component={ProductDetailPage} />
          <Route path='/admin' component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </span>
    </Router>
  )
}
