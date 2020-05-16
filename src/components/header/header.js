import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.scss"
import profileImg from "../../images/verify-img.png"

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
                    <Link to="/editprofile" className="nav-link">
                      My Profile
                    </Link>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                </li>
                <li>
                  {token ? (
                    <Link to="/logout" className="">
                      <img src={profileImg} />
                    </Link>
                  ) : (
                    <Link to="/signup" className="btn btn-dark">
                      Sign up
                    </Link>
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
