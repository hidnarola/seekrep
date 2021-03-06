import { Navbar, Nav, Container, Dropdown } from "react-bootstrap"
import { Link, navigate } from "gatsby"
import React from "react"
import "./header.scss"
import profileImg from "../../images/default.png"
import { getDataById } from "../../functions"
import { GoogleLogout } from "react-google-login"
import logo from "../../images/SEEKREP_logo.png"

export default class Header extends React.Component {
  state = {
    token: "",
    profilepic: "",
    userData: {},
  }
  componentDidMount() {
    const loginToken = localStorage.getItem("login-token")

    const userId = localStorage.getItem("id")
    this.setState({ token: loginToken })

    if (userId) {
      getDataById(userId)
        .then(res => {
          this.setState({
            userData: res.data.user.data[0],
          })
        })
        .catch(err => {
          console.log("error", err)
        })
    }
  }

  logout = () => {
    navigate("/logout")
  }
  handleLogoutFailure = () => {
    alert("Failed to log out")
  }
  render() {
    let { token } = this.state
    return (
      <Navbar>
        <Container>
          <Link to="/" className="navbar-brand">
            <img src={logo} width="100" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <ul>
                <li>
                  <Link to="/about" className="nav-link">
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
                            (this.state.userData &&
                              this.state.userData.profileimage) ||
                            this.props.profilepic
                              ? this.props.profilepic
                                ? this.props.profilepic
                                : this.state.userData.profileimage
                              : profileImg
                          }
                          alt="profile-pic"
                          className="logout-profile"
                        />
                        +
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {console.log(
                          "google login",
                          localStorage.getItem("googlelogin")
                        )}
                        {localStorage.getItem("googlelogin") === "yes" ? (
                          <Dropdown.Item>
                            {/* <Link to="/logout">Log out</Link> */}
                            <GoogleLogout
                              clientId="577694009182-enfv1fenk9j81u7cjc4e6897u1l4gmhl.apps.googleusercontent.com"
                              onLogoutSuccess={() => this.logout()}
                              onFailure={() => this.handleLogoutFailure()}
                            >
                              Log out
                            </GoogleLogout>
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item>
                            <Link to="/logout">Log out</Link>
                          </Dropdown.Item>
                        )}
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
