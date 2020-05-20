import React from "react"
import VerifyEmailComp from "../components/verifyemailcomp/verifyemailcomp"
import Layout from "../components/layout/layout"
import { Container } from "react-bootstrap"

const EmailVerify = props => (
  <Layout>
    <section>
      <Container>
        <VerifyEmailComp props={props} />
      </Container>
    </section>
  </Layout>
)
export default EmailVerify
