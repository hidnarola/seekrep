import React from "react"
import Layout from "../../components/admin/layout/layout"
import UserDetails from "../../components/admin/userdetails/userdetails"
import { Container } from "reactstrap"

const UserDetailPage = props => (
  <Layout>
    <Container>
      <UserDetails props={props} />
    </Container>
  </Layout>
)

export default UserDetailPage
