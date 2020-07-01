import React from "react"
import { adminLogin } from "../../../functions"
// import {
//   Button,
//   Card,
//   CardBody,
//   CardGroup,
//   Col,
//   Container,
//   Form,
//   Input,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Row,
//   Alert,
//   FormFeedback,
// } from "reactstrap"
import { Button, Alert, Container, Col, Row } from "react-bootstrap"
import Spinner from "../../spinner/spinner"
import { navigate, Link } from "gatsby"
import "../../../styles/main.scss"

export default class Login extends React.Component {
  state = {
    users: [],
    email: "",
    password: "",
    showMessage: "",
    message: "",
    status: 0,
    loader: false,
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

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loader: true })
    // const isValid = this.validate()
    // if (isValid) {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }

    adminLogin(data)
      .then(result => {
        if (result.data.status === 1) {
          localStorage.setItem("admintoken", result.data.token)
          localStorage.setItem("id", result.data.data._id)
          this.setState({
            showMessage: true,
            message: result.data.message,
            loader: false,
            status: 1,
          })
          setTimeout(() => {
            navigate("/admin")
          }, 1000)
        } else if (result.data.status === 0) {
          this.setState({
            showMessage: true,
            message: result.data.message,
            loader: false,
            status: 0,
          })
        }
      })
      .catch(err => {
        console.log("err", err)
      })
    // }
  }

  render() {
    return (
      <div className="app flex-row align-items-center adminlogin-box">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              {/* <CardGroup>
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
              </CardGroup> */}
              <div className="login-bg">
                <div className="login-boxs admin-loing">
                  <div className="seekrep-box">
                    <h2>Login</h2>
                  </div>
                  {this.state.showMessage ? (
                    <Alert
                      variant={this.state.status === 1 ? "success" : "danger"}
                    >
                      {" "}
                      {this.state.message}
                    </Alert>
                  ) : null}
                  <form onSubmit={this.handleSubmit} className="login-form">
                    <div className="form-group">
                      <label>E-mail</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                    <div className="link-text text-right mb-2">
                      <Link to="/admin/forgotpassword" className="small">
                        Forgot your password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      variant="dark"
                      className={
                        this.state.loader ? "withspinner w-100" : "w-100"
                      }
                      disabled={!(this.state.email && this.state.password)}
                    >
                      {this.state.loader ? <Spinner /> : "Log in"}
                    </Button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
