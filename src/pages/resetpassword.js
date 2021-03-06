import React from "react"
import Header from "../components/header/header"
import { Nav, Container, Row, Col } from "react-bootstrap"
import Resetpassword from "../components/resetpassword/resetpassword"
import "../styles/main.scss"

const restePasswordPage = props => (
  <div>
    <Header />
    <section className="login-bg">
      <Container>
        <Row>
          <Col xs="12" lg="4" className="mx-auto">
            <div className="login-boxs">
              <div className="seekrep-box">
                <h2>Reset password</h2>
                <p>
                  Please enter the email address that is associated with your
                  Seekrep account.{" "}
                </p>
              </div>
              <Resetpassword props={props} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </div>
)
export default restePasswordPage
