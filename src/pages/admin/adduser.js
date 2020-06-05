import React from "react"
import Layout from "../../components/admin/layout/layout"
import AddUser from "../../components/admin/adduser/adduser"
import { Container } from "reactstrap"

const AllUserPage = () => (
  <Layout>
    <Container>
      <AddUser />
    </Container>
  </Layout>
)

export default AllUserPage
