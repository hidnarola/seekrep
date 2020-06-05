import React from "react"
import Layout from "../../components/admin/layout/layout"
import { Container } from "reactstrap"
import Profile from "../../components/admin/profile/profile"

const ProfilePage = () => (
  <Layout>
    <Container>
      <Profile />
    </Container>
  </Layout>
)

export default ProfilePage
