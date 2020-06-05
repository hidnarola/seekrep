import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  NavbarText,
} from "reactstrap"
import "./sidebar.scss"

export default class Sidebar extends React.Component {
  render() {
    return (
      <div class="sidebar">
        <div class="scrollbar-container sidebar-nav ps ps-container ps--active-y">
          <ul class="nav">
            <li class="nav-item">
              <Link to="/admin" class="nav-link ">
                Dashboard
              </Link>
            </li>
            <li class="nav-title">User/Seller </li>
            <li class="nav-item">
              <Link to="/admin/allusers" class="nav-link">
                All Users
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/admin/adduser" class="nav-link">
                Add New User
              </Link>
            </li>
            <li class="nav-title">Reviews </li>
            <li class="nav-item">
              <Link to="/admin/allreviews" class="nav-link">
                All Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
