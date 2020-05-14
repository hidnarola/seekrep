import React from "react"
import Layout from "../components/layout/layout"
import Search from "../components/searchpage/searchpage"
import { Container } from "react-bootstrap"

const Searchpage = () => (
  <div>
    <Layout>
      <section>
        <Container>
          <Search />
        </Container>
      </section>
    </Layout>
  </div>
)

export default Searchpage
