import { Navbar, Nav, Container } from "react-bootstrap"
import PropTypes from "prop-types"
import React from "react"
import { navigate } from "@reach/router"

export default class Logout extends React.Component {
  componentDidMount() {
    navigate("/")
    localStorage.clear()
  }
  render() {
    return <div></div>
  }
}
