import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./footer.scss"

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-12 col-lg-auto">
          <ul className="footer-link">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Connditions</a>
            </li>
            <li>
              <a href="#">User Guidelines</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-auto mr-auto">
          <p>
            © {new Date().getFullYear()},{` `}
            <a href="https://www.gatsbyjs.org">Seekrep Ltd.</a>All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string
}

Footer.defaultProps = {
  siteTitle: ``
}

export default Footer
