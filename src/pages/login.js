import React from "react"
import Header from "../components/header/header"
import GoogleImg from "../images/google.png"
import Login from "../components/login/login"
import { Nav, Container, Row, Col } from "react-bootstrap"

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
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
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
