import React from 'react'
import './Header.css'
import logo from '../logo.svg'
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Twinkle Shop</h1>
      <nav>
        <NavLink to='/products' className='header-link' activeClassName='header-link-active' >Products</NavLink>
        <NavLink to='/admin' className='header-link' activeClassName='header-link-active' >Admin</NavLink>
      </nav>
    </header>
  )
}
