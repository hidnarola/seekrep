import React from "react"
import { adminLogin } from "../../../functions"
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
import { navigate, Link } from "gatsby"

export default class Login extends React.Component {
  state = {
    users: [],
    email: "",
    password: "",
    emailError: "",
    passError: "",
    errorDisplay: false,
  }
  validate = () => {
    let passError = ""
    let emailError = ""
    // let passwordError = "";

    if (!this.state.email) {
      emailError = "Email Cannot Be Blank"
    }
    if (!this.state.password) {
      passError = "Password Cannot Be Blank"
    }

    if (this.state.email && !this.state.email.includes("@")) {
      emailError = "invalid email"
    }

    if (emailError || passError) {
      this.setState({ emailError, passError })
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
        password: this.state.password,
      }
      console.log("data", data)
      adminLogin(data)
        .then(result => {
          console.log("result submit", result)
          if (result.data.status === 1) {
            localStorage.setItem("admintoken", result.data.token)
            localStorage.setItem("id", result.data.data._id)
            navigate("/admin")
          } else if (result.data.status === 0) {
            this.setState({ errorDisplay: true })
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
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.state.errorDisplay ? (
                        <Alert color="danger">
                          Username and/or Password is incorrect.
                        </Alert>
                      ) : null}

                      <InputGroup className="mb-3">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          onChange={this.changeHandler}
                          name="email"
                          invalid={this.state.emailError}
                        />
                        {this.state.emailError ? (
                          <FormFeedback>{this.state.emailError} </FormFeedback>
                        ) : null}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.changeHandler}
                          name="password"
                          value={this.state.password}
                          invalid={this.state.passError}
                        />
                        {this.state.passError ? (
                          <FormFeedback>{this.state.passError} </FormFeedback>
                        ) : null}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/admin/forgotpassword">
                            <Button color="link" className="px-0">
                              Forgot password?
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
