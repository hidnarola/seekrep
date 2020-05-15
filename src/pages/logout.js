import React from "react"
import Layout from "../components/layout/layout"
import { Container } from "react-bootstrap"
import Logout from "../components/logout/logout"

const LogoutPage = () => (
  <Layout>
    <section>
      <Container>
        <Logout />
      </Container>
    </section>
  </Layout>
)
export default LogoutPage
