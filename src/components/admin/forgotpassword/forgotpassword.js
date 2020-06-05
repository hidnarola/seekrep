import React from "react"
import { adminForgotPassword } from "../../../functions"
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
  InputGroupText,
  Row,
  Alert,
  FormFeedback,
} from "reactstrap"
import { navigate } from "gatsby"

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    emailError: "",
    emailSucc: "",
  }

  validate = () => {
    let emailError = ""

    if (!this.state.email) {
      emailError = "Email Cannot Be Blank"
      this.setState({ emailError })
      return false
    }

    if (this.state.email && !this.state.email.includes("@")) {
      emailError = "invalid email"
      this.setState({ emailError })
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
    const isValid = this.validate()
    if (isValid) {
      const data = {
        email: this.state.email,
      }
      console.log("data", data)
      adminForgotPassword(data)
        .then(result => {
          console.log("result submit", result)
          // if (result.data.register_resp.status === 1) {
          //   swal(result.data.register_resp.message).then(() => {
          //     navigate("/admin/allusers")
          //   })
          // } else if (result.data.register_resp.status === 0) {
          //   swal(result.data.message)
          // }
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
                    {this.state.emailError ? (
                      <Alert color="danger">{this.state.emailError}</Alert>
                    ) : null}
                    {this.state.emailSucc ? (
                      <Alert color="success">{this.state.emailError}</Alert>
                    ) : null}
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
