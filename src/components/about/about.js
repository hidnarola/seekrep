import { Container, Row, Col, Button } from "react-bootstrap"
import React from "react"
import RectangleImg from "../../images/rectangle.jpg"
import StartIcon from "../../images/start.png"
import VerifyImg from "../../images/verify-img.png"
import Checkmark from "../../images/checkmark.png"
import "./about.scss"

const About = () => (
  <section className="about-bg">
    <Container>
      <Row>
        <Col xs="12" lg="7" className="mx-auto text-center">
          <h1>About</h1>
          <p>
            Buying and selling luxury items online?
            <br />
            Use Seekrep to ensure that whoever you’re dealing with can be
            trusted.{" "}
          </p>
        </Col>
      </Row>
    </Container>
    <div className="review-bg">
      <Row>
        <Col xs="12" lg="4" className="border-right">
          <div className="reviews-boxs">
            <h2>Read reviews</h2>
            <div className="readreview-box">
              <div className="top">
                <div className="left">
                  <img src={RectangleImg} alt="" />
                  <div className="content">
                    <h6>Jacob Howell</h6>
                    <p>8 reviews</p>
                  </div>
                </div>
                <div className="review-icon">
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" className="opacity" />
                </div>
              </div>
              <div className="sub-title">
                Purchased a Louis Vuitton bag from Blake Green
              </div>
              <div className="content">
                Very straight forward transaction and easy to deal
                <br />
                with. I would definitely buy from Jacob again.
              </div>
              <div className="week">Posted 1 week ago</div>
            </div>
          </div>
        </Col>
        <Col xs="12" lg="4" className="border-right">
          <div className="reviews-boxs">
            <h2>Add reviews</h2>
            <div className="blake-boxs">
              <h4>Review Blake Green</h4>
              <div className="reviewblake-box">
                <h6>Your rating</h6>
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" className="opacity" />
              </div>
            </div>
          </div>
        </Col>
        <Col xs="12" lg="4">
          <div className="reviews-boxs">
            <h2>Verify yourself</h2>
            <div className="verify-boxs">
              <img src={VerifyImg} alt="" />
              <div className="content">
                <h5>Blake Green</h5>
                <div className="verify-button">
                  <Button variant="success">
                    <img src={Checkmark} alt="" />
                    Verified
                  </Button>
                  <span>Joined in 2019</span>
                </div>
                <div className="veri-text">18 verified reviews</div>
                <div className="reviews-boxs">
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" className="opacity" />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </section>
)

export default About
