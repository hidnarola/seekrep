import React from "react"
import Layout from "../../components/admin/layout/layout"
import Reviewdetail from "../../components/admin/reviewdetails/reviewdetails"
import { Container } from "reactstrap"

const ReviewDetailPage = props => (
  <Layout>
    <Container>
      <Reviewdetail props={props} />
    </Container>
  </Layout>
)

export default ReviewDetailPage
