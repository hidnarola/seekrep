import { Navbar, Nav, Container, Dropdown } from "react-bootstrap"
import { Link } from "gatsby"
import React from "react"
import "./header.scss"
import profileImg from "../../images/default.png"
import { getDataById } from "../../functions"

export default class Header extends React.Component {
  state = {
    token: "",
    profilepic: "",
    userData: {},
  }
  componentDidMount() {
    console.log("page refresh")
    const loginToken = localStorage.getItem("login-token")
    // const profilepic = localStorage.getItem("profilepic")
    const userId = localStorage.getItem("id")
    this.setState({ token: loginToken })
    // this.setState({ profilepic: profilepic })
    if (userId) {
      getDataById(userId)
        .then(res => {
          console.log("header res", res)
          this.setState({
            userData: res.data.user.data[0],
          })
        })
        .catch(err => {
          console.log("error", err)
        })
    }
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
                      Log in
                    </Link>
                  )}
                </li>
                <li className="login-link">
                  {token ? (
                    <Dropdown>
                      <Dropdown.Toggle className="dropdown-box">
                        <img
                          src={
                            this.state.userData &&
                            this.state.userData.profileimage
                              ? this.state.userData.profileimage
                              : profileImg
                          }
                          alt="profile-pic"
                          className="logout-profile"
                        />
                        +
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to="/logout">Log out</Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link to="/signup" className="btn btn-dark">
                      Sign up
                    </Link>
                  )}
                </li>
                <li className="mobile-proile">
                  <Dropdown>
                    <Dropdown.Toggle className="dropdown-box">
                      <img
                        src={
                          this.state.profilepic
                            ? this.state.profilepic
                            : profileImg
                        }
                        alt="profile-pic"
                        className="logout-profile"
                      />
                      +
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/logout">Logout</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
