import React from "react"
import Layout from "../components/layout/layout"
import { Nav, Container, Row, Col } from "react-bootstrap"
import "../styles/main.scss"
import { Helmet } from "react-helmet"

const userProfilePage = props => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>User Profile</title>
    </Helmet>
    <Layout>
      <section className="section-hg">
        <Container>
          <Row>
            <Col xs="12" lg="4" className="mx-auto">
              <h2>Profile of {props.username} </h2>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  </div>
)
export default userProfilePage
