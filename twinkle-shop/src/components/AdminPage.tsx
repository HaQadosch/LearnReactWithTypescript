import React from 'react'
import './AdminPage.css'
import { NavLink, Route, RouteComponentProps } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  return (
    <span className='page-container'>
      <h2>Admin Panel</h2>
      <ul className='admin-sections'>
        <li key='users'>
          <NavLink to='/admin/users' activeClassName='admin-link-active' >Users</NavLink>
        </li>
        <li key='products'>
          <NavLink to='/admin/products' activeClassName='admin-link-active' >Products</NavLink>
        </li>
      </ul>
      <Route path='/admin/users' component={AdminUsers} />
      <Route path='/admin/products' component={AdminProducts} />
    </span>
  )
}

interface IUsers {
  id: number
  name: string
  isAdmin: boolean
}

const adminUsersData: IUsers[] = [
  { id: 1, name: 'Fred', isAdmin: true },
  { id: 2, name: 'Bob', isAdmin: false },
  { id: 3, name: 'Jane', isAdmin: false }
]

const AdminUsers: React.FC = () => {
  return (
    <>
      <ul className='admin-sections'>
        {adminUsersData.map(({ id, name, isAdmin }) => (
          <li key={id}>
            <NavLink to={`/admin/users/${id}`} activeClassName='admin-link-active'>{name}</NavLink>
          </li>
        ))}
      </ul>
      <Route path='/admin/users/:id' component={AdminUserDetail} />
    </>
  )
}

const AdminUserDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match: { params: { id }}}) => {
  const idNum = parseInt(id, 10)  
  if (Number.isNaN(idNum)) return null

  const { id: userId, isAdmin } = adminUsersData.find(({id: userId}) => userId === idNum) || { id: 0, isAdmin: false}

  return (
    <ul>
      <li>
        <b>Id:</b>
        <span>{userId.toString()}</span>
      </li>
      <li>
        <b>Is admin:</b>
        <span>{isAdmin.toString()}</span>
      </li>
    </ul>
  )
}

const AdminProducts: React.FC = () => {
  return (
    <div>
      Some options to admister products
    </div>
  )
}
