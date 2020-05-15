import { Navbar, Nav, Container } from "react-bootstrap"
import PropTypes from "prop-types"
import React from "react"

export default class Logout extends React.Component {
  componentDidMount() {
    localStorage.clear()
  }
  render() {
    return (
      <div>
        <p>Logout successfully</p>
        <p>Click to go Home page</p>
        <Nav.Link href="/">home page</Nav.Link>
      </div>
    )
  }
}
