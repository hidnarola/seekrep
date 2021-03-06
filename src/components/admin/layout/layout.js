/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "../header/header"
import Sidebar from "../sidebar/sidebar"
import "../../../styles/main.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-part">
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
