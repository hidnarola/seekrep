import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap"
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
      <Navbar>
        <Container>
          <Link to="/" className="navbar-brand">
            SEEKREP
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <ul>
                <li>
                  <Link to="#" className="nav-link">
                    About
                  </Link>
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
                <li className="login-link">
                  {token ? (
                    <Dropdown>
                      <Dropdown.Toggle className="logout-profile">
                        <img src={profileImg} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to="/logout">Logout</Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
