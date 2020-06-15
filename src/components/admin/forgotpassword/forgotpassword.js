import React from "react"
import { adminForgotPassword } from "../../../functions"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
  Alert,
} from "reactstrap"

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    emailError: "",
    emailSucc: "",
    showMessage: "",
    message: "",
    status: 0,
  }

  validate = () => {
    let emailError = ""

    if (!this.state.email) {
      emailError = "Email Cannot Be Blank"
      this.setState({ showMessage: emailError, status: 0 })
      return false
    }

    if (this.state.email && !this.state.email.includes("@")) {
      emailError = "invalid email"
      this.setState({ showMessage: emailError, status: 0 })
      return false
    }

    return true
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.email === "") {
      this.setState({
        showMessage: true,
        message: "Email Cannot Be Blank",
      })
    } else if (this.state.email && !this.state.email.includes("@")) {
      this.setState({ showMessage: true, message: "invalid email", status: 0 })
    } else {
      const data = {
        email: this.state.email,
      }

      adminForgotPassword(data)
        .then(result => {
          if (result.data.status === 1) {
            this.setState({
              showMessage: true,
              message: result.data.message,
              status: 1,
            })
          } else if (result.data.status === 0) {
            this.setState({
              showMessage: true,
              message: result.data.message,
              status: 0,
            })
          }
        })
        .catch(err => {
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
                  <Form onSubmit={e => this.handleSubmit(e)}>
                    <h1>Forgot Password</h1>
                    <p className="text-muted">Reset your password</p>
                    {this.state.showMessage ? (
                      <Alert
                        color={this.state.status === 0 ? "danger" : "success"}
                      >
                        {this.state.message}
                      </Alert>
                    ) : null}
                    {/* {this.state.emailError ? (
                      <Alert color="danger">{this.state.emailError}</Alert>
                    ) : null}
                    {this.state.emailSucc ? (
                      <Alert color="success">{this.state.emailError}</Alert>
                    ) : null} */}
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
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
