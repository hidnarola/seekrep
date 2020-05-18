import React from "react"
import VerifyEmailComp from "../components/verifyemailcomp/verifyemailcomp"
import Layout from "../components/layout/layout"
import { Container } from "react-bootstrap"

const EmailVerify = () => (
  <Layout>
    <section>
      <Container>
        <VerifyEmailComp />
      </Container>
    </section>
  </Layout>
)
export default EmailVerify
