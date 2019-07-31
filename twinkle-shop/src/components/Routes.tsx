import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Header } from './Header'
import { AdminPage } from './AdminPage'
import { ProductPage } from './ProductPage'
import { ProductDetailPage } from './ProductDetailPage'
import { NotFoundPage } from './NotFoundPage'
import { LoginPage } from './LoginPage'

export const Routes: React.FC = () => {
  const [loggedIn/*, setLoggedIn*/] = useState<boolean>(true)

  return (
    <Router>
      <Header />
      <Switch>
        <Redirect exact={true} from='/' to='/products' />
        <Route path='/products' component={ProductPage} />
        <Route path='/product/:id' component={ProductDetailPage} />
        <Route path='/admin'>{loggedIn ? <AdminPage /> : <Redirect to='/login' />}</Route>
        <Route path='/login' component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router >
  )
}
