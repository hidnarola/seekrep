import React from "react"
import { adminResetPassword } from "../../../functions"
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Alert,
} from "reactstrap"
import { navigate } from "gatsby"

export default class ForgotPassword extends React.Component {
  state = {
    password: "",
    confirmpassword: "",
    passError: "",
    passSucc: "",
  }

  componentDidMount() {}
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  validate = () => {
    let passError = ""

    if (!this.state.password) {
      passError = "Password Cannot Be Blank"
      this.setState({ passError })
      return false
    }
    if (!this.state.confirmPassword) {
      passError = "Confirm Password Cannot Be Blank"
      this.setState({ passError })
      return false
    }
    return true
  }

  submitHandler = e => {
    e.preventDefault()
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ passError: "Password should be same" })
    } else {
      const data = {
        password: this.state.password,
        token: this.props.props.token,
      }
      adminResetPassword(data)
        .then(result => {
          if (result.data.status === 1) {
            this.setState({ passSucc: result.data.message })
            navigate("/admin/login")
          } else if (result.data.status === 0) {
            this.setState({ passError: result.data.message })
          }
        })
        .catch(err => {
          this.setState({ passError: err })
          console.log("err", err)
        })
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={e => this.submitHandler(e)}>
                    <h1>Reset Password</h1>
                    <p className="text-muted">Reset your password</p>
                    {this.state.passError ? (
                      <Alert color="danger">{this.state.passError}</Alert>
                    ) : null}
                    {this.state.passSucc ? (
                      <Alert color="success">{this.state.passSucc}</Alert>
                    ) : null}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend"></InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="New Password"
                        autoComplete="new-password"
                        name="password"
                        onChange={event => this.changeHandler(event)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend"></InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        name="confirmpassword"
                        onChange={event => this.changeHandler(event)}
                      />
                    </InputGroup>
                    <Button color="success" block>
                      Reset Password
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
