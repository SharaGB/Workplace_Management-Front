import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../css/Navbar.module.css";
import logo from "../assets/imgs/logo.png";

const cookies = new Cookies();
const baseURL = `http://localhost:8000/api/user/?q=${localStorage.getItem('user_id')}`;

class NavBar extends Component {

  logout = () => {
    cookies.remove('user_id', { path: '/' });
    cookies.remove('token', { path: '/' });
    cookies.remove('email', { path: '/' });
    localStorage.removeItem('user_id');

    window.location.href = './';
  };

  componentDidMount() {
    if (!cookies.get('email')) {
      window.location.href = './';
    }
  };

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.navbar}>
        <Container>
          <Link to={"/encora_map"}>
            <Navbar.Brand>
              <img src={logo} alt="logotype" />
              Encora reserves
            </Navbar.Brand>
          </Link>
          <Link className={styles.navbar_target} to={"/myreservations"}>Welcome {localStorage.getItem('full_name')}</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {cookies.get(baseURL) === 'is_staff' ? (
                <Link to={"/admin"} className={styles.navbar_target}>
                  Admin
                </Link>
              ) : null}
            </Nav>
            <Nav>
              <Link className={styles.navbar_target} to={"/homepage"}>
                Home
              </Link>
              <Link className={styles.navbar_target} to={"/newreservationpage"}>
                New Reserve
              </Link>
              <Nav.Link className={styles.navbar_target} to={'/'} onClick={() => this.logout(true)}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container >
      </Navbar >
    );
  };
}

export default NavBar;
