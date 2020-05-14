import React from "react"
import Header from "../components/header/header"
import { Nav, Container, Row, Col } from "react-bootstrap"
import Signup from "../components/signup/signup"

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
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
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
