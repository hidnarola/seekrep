import React from "react"
import SellerProfileComp from "../components/sellerprofile/sellerprofile"
import Layout from "../components/layout/layout"
import { Container } from "react-bootstrap"
import { Router } from "@reach/router"

const SellerProfile = props => (
  <Layout>
    <section>
      <Container>
        {/* <Router> */}
        {console.log("props===>", props)}
        <SellerProfileComp location={props} />
        {/* <GetSellerProfile path="/sellerprofile/:id" /> */}
        {/* </Router> */}

        {/* </Router> */}
      </Container>
    </section>
  </Layout>
)
export default SellerProfile
