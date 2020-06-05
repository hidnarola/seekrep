import React from "react"
import Layout from "../../components/admin/layout/layout"
import EditUser from "../../components/admin/edituser/edituser"
import { Container } from "reactstrap"

const EditUserPage = props => (
  <Layout>
    <Container>
      <EditUser props={props} />
    </Container>
  </Layout>
)

export default EditUserPage
