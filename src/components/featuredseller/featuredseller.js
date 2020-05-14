import { Row, Col, Button } from "react-bootstrap"
import React from "react"
import InstagramImg from '../../images/instagram-img.png'
import InstagramImg2 from '../../images/instagram-img2.png'
import InstagramImg3 from '../../images/instagram-img3.png'
import InstagramImg4 from '../../images/instagram-img4.png'
import InstagramImg5 from '../../images/instagram-img5.png'
import InstagramImg6 from '../../images/instagram-img6.png'
import InstagramImg7 from '../../images/instagram-img7.png'
import InstagramImg8 from '../../images/instagram-img8.png'
import InstagramIcon from '../../images/instagram-icon.png'
import "./featuredseller.scss";

const Feateredseller = () => (
    <section className="feateredseller-bg">
        <Row className="no-gutters">
            <Col xs="12">
                <h1>Featured sellers</h1>
                <ul>
                    <li><img src={InstagramImg} /></li>
                    <li><img src={InstagramImg2} /></li>
                    <li><img src={InstagramImg3} /></li>
                    <li><img src={InstagramImg4} /></li>
                    <li><img src={InstagramImg5} /></li>
                    <li><img src={InstagramImg6} /></li>
                    <li><img src={InstagramImg7} /></li>
                    <li><img src={InstagramImg8} /></li>
                </ul>
                <div className="content">
                    <h2>Follow us on Instagram</h2>
                    <div className="tag">
                        <img src={InstagramIcon} alt="" />
                        <span>@seekrep</span>
                    </div>
                </div>
            </Col>
        </Row>
    </section>
)

export default Feateredseller
