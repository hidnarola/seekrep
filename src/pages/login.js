import React from "react"
import Header from "../components/header/header"
import GoogleImg from "../images/google.png"
import Login from "../components/login/login"
import { Nav, Container, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

const Loginpage = () => (
  <div>
    <Header />
    <section className="login-bg">
      <Container>
        <Row>
          <Col xs="12" lg="4" className="mx-auto">
            <div className="login-boxs">
              <Nav defaultActiveKey="/login">
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
              <Login />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </div>
)

export default Loginpage
