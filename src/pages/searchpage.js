import React from "react"
import Layout from "../components/layout/layout"
import Search from "../components/searchpage/searchpage"
import { Container } from "react-bootstrap"
import { Router } from "@reach/router"

const Searchpage = props => (
  <div>
    <Layout>
      {console.log("props ==> ", props)}
      <section>
        <Container>
          {/* <Router> */}
          <Search props={props} />
          {/* </Router> */}
        </Container>
      </section>
    </Layout>
  </div>
)

export default Searchpage
