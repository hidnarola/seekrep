import React from "react"
import Layout from "../../components/admin/layout/layout"
import AllUserSeller from "../../components/admin/alluser/alluser"
import { Container } from "reactstrap"

const AllUserPage = () => (
  <Layout>
    <Container>
      <AllUserSeller />
    </Container>
  </Layout>
)

export default AllUserPage
