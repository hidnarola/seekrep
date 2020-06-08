import { Container, Row, Col, Button } from "react-bootstrap"
import React from "react"
import VerificationImg from "../../images/verification-app-with-hand.png"
import "./verifyapp.scss"

const Verifyapp = () => (
  <section className="verification-bg">
    <Container>
      <Row>
        <Col xs="12" lg="8" className="mx-auto">
          <Row>
            <Col xs="12" lg="6" className="d-flex flex-wrap align-items-center">
              <div className="content">
                <h2>Verification app</h2>
                <p>
                  Verify seller identity when you meet
                  <br />
                  face-to-face to ensure whoever you’re
                  <br />
                  meeting is who they say they are.{" "}
                </p>
                <Button variant="link">Coming soon</Button>
              </div>
            </Col>
            <Col
              xs="12"
              lg="6"
              className="text-right text-md-center text-lg-left"
            >
              <img src={VerificationImg} alt="" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
)

export default Verifyapp
