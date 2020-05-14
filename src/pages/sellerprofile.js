import React from "react"
import SellerProfile from "../components/sellerprofile/sellerprofile"
import Layout from "../components/layout/layout"
import { Container } from "react-bootstrap"

const sellerProfilePage = () => (
  <Layout>
    <section>
      <Container>
        <SellerProfile />
      </Container>
    </section>
  </Layout>
)
export default sellerProfilePage
