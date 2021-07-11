import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LoginButton from './component/loginButton';
import LogoutButton from './component/logoutButton';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link  to="/"> Home </Link>
        <Link  to="/profile"> Profile </Link>
        <LoginButton />
        <LogoutButton />
      </Navbar>
    );
  }
}

export default Header;
