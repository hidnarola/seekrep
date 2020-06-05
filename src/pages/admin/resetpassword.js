import React from "react"
import ResetPassword from "../../components/admin/resetpassword/resetpassword"
import { Container } from "reactstrap"

const ResetPasswordPage = props => (
  <Container>
    <ResetPassword props={props} />
  </Container>
)

export default ResetPasswordPage
