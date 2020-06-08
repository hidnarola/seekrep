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
              <Link to="/privacypolicy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms&connditions">Terms & Connditions</Link>
            </li>
            <li>
              <Link to="/userguidelines">User Guidelines</Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-auto mr-auto">
          <p>
            © {new Date().getFullYear()},{` `}
            <Link href="https://seekrep-frontend.herokuapp.com">
              Seekrep Ltd.
            </Link>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
