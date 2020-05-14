import React from "react"
import Layout from "../components/layout/layout"
import { Nav, Container, Row, Col } from "react-bootstrap"
import EditProfile from "../components/editprofile/editprofile"

const EditProfilepage = () => (
  <div>
    <Layout>
      <section className="login-bg">
        <Container>
          <EditProfile />
        </Container>
      </section>
    </Layout>
  </div>
)

export default EditProfilepage
