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

  profileHandler = () => {
    navigate("/admin/profile")
  }
  render() {
    return (
      <header className="app-header navbar">
        <Link to="/admin" className="navbar-brand">
          Seekrep admin
        </Link>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <h6>Admin</h6>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem onClick={e => this.profileHandler(e)}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={e => this.onLogout(e)}>
                Logout
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
