import React from "react"
import Layout from "../components/layout/layout"
import { Nav, Container, Row, Col } from "react-bootstrap"
import WriteReview from "../components/review/review"
import { Router } from "@reach/router"

const writereviewPage = props => (
  <div>
    <Layout>
      <section>
        <Container>
          <WriteReview location={props} />
        </Container>
      </section>
    </Layout>
  </div>
)

export default writereviewPage
