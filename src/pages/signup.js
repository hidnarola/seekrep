import React from "react"
import Header from "../components/header/header"
import { Nav, Container, Row, Col } from "react-bootstrap"
import Signup from "../components/signup/signup"
import { Link } from "gatsby"

const Signuppage = () => (
  <div>
    <Header />
    <section className="login-bg">
      <Container>
        <Row>
          <Col xs="12" lg="4" className="mx-auto">
            <div className="login-boxs">
              <Nav defaultActiveKey="/signup">
                <Nav.Item>
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </Nav.Item>
              </Nav>
              <Signup />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </div>
)

export default Signuppage
