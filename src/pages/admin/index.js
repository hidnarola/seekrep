import React from "react"
import { navigate } from "gatsby"

import Layout from "../../components/admin/layout/layout"
import { Container } from "reactstrap"

export default class IndexPage extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }
  }
  render() {
    return (
      <Layout>
        <Container>
          <h1>Dashboard</h1>
        </Container>
      </Layout>
    )
  }
}

// export default IndexPage
