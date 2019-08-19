import React, { useState, useEffect } from 'react'
import './Header.css'
import logo from '../logo.svg'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

const Header_: React.FC<RouteComponentProps> = ({location: { search: urlSearch }, history}) => {
  const [search, setSearch] = useState<string>(urlSearch || '')
  useEffect(() => {
    const searchParams = new window.URLSearchParams(urlSearch)
    setSearch(s => searchParams.get('search') || '')
  }, [urlSearch])

  const handleSearchOnChange: React.ChangeEventHandler<HTMLInputElement> = ({currentTarget: { value }}) => {
    setSearch(value)
  }

  const handleSearchOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (key === 'Enter') {
      history.push(`/products/?search=${search}`)
    }
  }

  return (
    <header className="header">
      <form className='search-container' onSubmit={evt => evt.preventDefault()} >
        <input type="search"
          placeholder='search'
          value={search}
          onChange={handleSearchOnChange}
          onKeyDown={handleSearchOnKeyDown} />
      </form>
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Twinkle Shop</h1>
      <nav>
        <NavLink to='/products' className='header-link' activeClassName='header-link-active' >Products</NavLink>
        <NavLink to='/contactus' className='header-link' activeClassName='header-link-active'>Contact Us</NavLink>
        <NavLink to='/admin' className='header-link' activeClassName='header-link-active' >Admin</NavLink>
      </nav>
    </header>
  )
}

export const Header = withRouter(Header_)