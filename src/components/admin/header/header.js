import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"
import "./header.scss"

export default class Header extends React.Component {
  onLogout = () => {
    localStorage.clear()
    navigate("/admin/login")
  }
  render() {
    return (
      <header className="app-header navbar">
        <Link to="/admin" className="navbar-brand">
          Seekrep admin
        </Link>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-location-pin"></i>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <p>Admin</p>
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user"></i>{" "}
                <Link to="/admin/profile">Profile</Link>
              </DropdownItem>
              <DropdownItem onClick={e => this.onLogout(e)}>
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
      </header>
    )
  }
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }
