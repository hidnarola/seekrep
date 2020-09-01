import React from "react"
import Layout from "../components/layout/layout"
import { Container } from "react-bootstrap"
import { Link } from "gatsby"

const RegisterSuccess = () => (
  <Layout>
    <section className="section-hg">
      <Container>
        <div className="verifyemail-box">
          <h4>Register Successfully</h4>
          <p>
            Great! You’ve successfully signed up to SEEKREP. Keep an eye out for
            a confirmation email.
          </p>
          <Link to="/">Return to home</Link>
        </div>
      </Container>
    </section>
  </Layout>
)
export default RegisterSuccess
