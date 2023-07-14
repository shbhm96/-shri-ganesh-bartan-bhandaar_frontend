import React, {  } from 'react'
import { Alert, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { logoutUser } from '../action/userAction'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {

  const dispatch = useDispatch()
  const history = useNavigate()

  const {userInfo}=useSelector(state=>state.userLogin)
  
  const logoutHandler =()=>{
    dispatch(logoutUser())
  }

  const adminShowAllUser = () =>{
    history("/admin/users")
  }

  const adminShowAllProducts = ()=>{
    history("/admin/products")
  }

  const adminShowAllOrders = ()=>{
    history("/admin/orders")
  }

  return (
    <header>
     <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>     
     <Container>
      <LinkContainer to="/">
        <Navbar.Brand href="/">Shri Ganesh Bartan Bhandaar</Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
          <Nav.Link to="/cart">
            <i className='fa fa-shopping-cart'></i>Cart
          </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to="/profile">
              <NavDropdown.Item>
                <i className="fa fa-user p-1" aria-hidden="true"></i>
                      Profile
              </NavDropdown.Item>
              </LinkContainer>
              
              <NavDropdown.Item onClick={logoutHandler}>
              <i className="fa fa-sign-out p-1" aria-hidden="true"></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ):(
            <LinkContainer to="/login">
            <Nav.Link>
            <i className="fa fa-sign-in" aria-hidden="true"></i>Sign In
            </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="admin" id="adminMenu">
            <NavDropdown.Item onClick={adminShowAllUser}>
              <i className="fa fa-user p-1" aria-hidden="true"></i>
                    Users
            </NavDropdown.Item>
            
            <NavDropdown.Item onClick={adminShowAllProducts}>
              <i className="fa fa-user p-1" aria-hidden="true"></i>
                    Products
            </NavDropdown.Item>
            <NavDropdown.Item onClick={adminShowAllOrders}>
              <i className="fa fa-user p-1" aria-hidden="true"></i>
                    Orders
            </NavDropdown.Item>
          </NavDropdown>
          )}          
          </Nav>
        </Navbar.Collapse>
      </Container> 
      </Navbar>
      {userInfo && userInfo.isAdmin && <Alert variant='success'>        
          <p>(Add card displaying Company Name<br/>
          On MouseOver Card Rotate and show links for company product category links<br/>
          Clicking on link show the list of that company category product)</p>
      </Alert>}
    </header>
  )
}

export default Header
