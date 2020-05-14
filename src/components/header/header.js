import { Navbar, Nav, Container } from "react-bootstrap"
import PropTypes from "prop-types"
import React from "react"
import "./header.scss"

const Header = () => (
  <Navbar expand="lg">
    <Container>
      <Navbar.Brand href="/">SEEKREP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <ul>
            <li>
              <Nav.Link href="#">About</Nav.Link>
            </li>
            <li>
              <Nav.Link href="/login">Log in</Nav.Link>
            </li>
            <li>
              <Nav.Link href="/signup" className="btn btn-dark">
                Sign up
              </Nav.Link>
            </li>
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
