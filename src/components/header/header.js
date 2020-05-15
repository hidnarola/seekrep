import { Navbar, Nav, Container } from "react-bootstrap"
import PropTypes from "prop-types"
import React from "react"
import "./header.scss"

export default class Header extends React.Component {
  state = {
    token: "",
  }
  componentDidMount() {
    const loginToken = localStorage.getItem("login-token")
    this.setState({ token: loginToken })
  }
  render() {
    let { token } = this.state

    return (
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
                  {token ? (
                    <Nav.Link href="/editprofile">My Profile</Nav.Link>
                  ) : (
                    <Nav.Link href="/login">Log in</Nav.Link>
                  )}
                </li>
                <li>
                  {token ? (
                    <Nav.Link href="/logout" className="btn btn-dark">
                      logout
                    </Nav.Link>
                  ) : (
                    <Nav.Link href="/signup" className="btn btn-dark">
                      Sign up
                    </Nav.Link>
                  )}
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
