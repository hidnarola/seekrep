import React from "react"
import Layout from "../../components/admin/layout/layout"
import DeleteUser from "../../components/admin/deleteuser/deleteuser"
import { Container } from "reactstrap"

const DeleteUserPage = props => (
  <Layout>
    <Container>
      <DeleteUser props={props} />
    </Container>
  </Layout>
)

export default DeleteUserPage
