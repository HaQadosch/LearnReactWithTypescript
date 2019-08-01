import React, { useState } from 'react'
import './Routes.css'
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { Header } from './Header'
import { AdminPage } from './AdminPage'
import { ProductPage } from './ProductPage'
import { ProductDetailPage } from './ProductDetailPage'
import { NotFoundPage } from './NotFoundPage'
import { LoginPage } from './LoginPage'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Routes_: React.FC<RouteComponentProps> = ({ location: { key } }) => {
  const [loggedIn/*, setLoggedIn*/] = useState<boolean>(true)

  return (
    <section>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={key}
          timeout={500}
          classNames='animate' >
          <Switch>
            <Redirect exact={true} from='/' to='/products' />
            <Route path='/products' component={ProductPage} />
            <Route path='/product/:id' component={ProductDetailPage} />
            <Route path='/admin'>{loggedIn ? <AdminPage /> : <Redirect to='/login' />}</Route>
            <Route path='/login' component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </section >
  )
}

// A wrapper just to insert the History into Routes_
export const Routes: React.FC = () => <Router><Route component={Routes_} /></Router>