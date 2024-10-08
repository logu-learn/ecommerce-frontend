import React from 'react'
import  Search  from './Search'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown,Image } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { logoutUser } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const {isAuthenticated,user} = useSelector(state=> state.authState)
  const {items: cartItems} = useSelector(state=> state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    dispatch(logoutUser)
    navigate("/login")
  }

  return (
  <>
  <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <Link to="/">
           <img width="150px" src="/images/logo.png" alt="logo-image"/>
        </Link>
      </div>
    </div>
    <Search/>
    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      {isAuthenticated ? 
      <Dropdown className='d-inline'>
        <Dropdown.Toggle variant= "default text-white pr-5" id="dropdown-basic">
          <figure className='avatar avatar-nav'>
            <Image width= "50px" src={user.avatar??'./images/default_avatar.png'}/>
          </figure>
          <span>
            {user.name}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <DropdownItem onClick={()=>{navigate('/myprofile')}} className='text-dark'>
            Profile
          </DropdownItem>
          {user.role === "admin" && <DropdownItem onClick={()=>{navigate('admin/dashboard')}} className='text-dark'>
            Dashboard
          </DropdownItem>}
          <DropdownItem onClick={logoutHandler} className='text-danger'>
            Logout
          </DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
      :<Link to ="/login" className="btn" id="login_btn">Login</Link>}
      <Link to="/cart">
       <span id="cart" className="ml-3">Cart</span>
      </Link>
      <span className="ml-1" id="cart_count">{cartItems.length}</span>
    </div>
  </nav>
</>
  )
}
