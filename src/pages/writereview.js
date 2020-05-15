import React from "react"
import Layout from "../components/layout/layout"
import { Nav, Container, Row, Col } from "react-bootstrap"
import WriteReview from "../components/writereview/writereview"

const writereviewPage = () => (
  <div>
    <Layout>
      <section>
        <Container>
          <WriteReview />
        </Container>
      </section>
    </Layout>
  </div>
)

export default writereviewPage
