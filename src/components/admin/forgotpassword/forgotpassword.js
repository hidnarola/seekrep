import React from "react"
import { adminForgotPassword } from "../../../functions"
// import {
//   Button,
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Form,
//   Input,
//   InputGroup,
//   Row,
//   Alert,
// } from "reactstrap"
import { Button, Alert, Container, Col, Row } from "react-bootstrap"
import Spinner from "../../spinner/spinner"
import { Link } from "gatsby"
import "../../../styles/main.scss"
export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    emailError: "",
    emailSucc: "",
    showMessage: "",
    message: "",
    status: 0,
    loader: false,
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

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loader: true })
    if (this.state.email === "") {
      this.setState({
        showMessage: true,
        message: "Please Enter Your Email",
        status: 0,
        loader: false,
      })
    } else if (this.state.email && !this.state.email.includes("@")) {
      this.setState({
        showMessage: true,
        message: "Please Enter Valid Email",
        status: 0,
        loader: false,
      })
    } else {
      const reg = /^([A-Z0-9_\-\.]+)@[A-Z0-9-]+(\.[A-Z0-9-]+)*(\.[A-Z]{2,3})$/
      // if (this.state.email && this.state.email.includes(reg)) {
      //   console.log("capital latters")
      // }
      if (reg.test(this.state.email)) {
        this.setState({
          showMessage: true,
          message: "Please Enter Valid Email",
          status: 0,
          loader: false,
        })
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
                loader: false,
              })
            } else if (result.data.status === 0) {
              this.setState({
                showMessage: true,
                message: result.data.message,
                status: 0,
                loader: false,
              })
            } else if (result.data.status === 2) {
              this.setState({
                showMessage: true,
                message: result.data.message,
                status: 0,
                loader: false,
              })
            }
          })
          .catch(err => {
            console.log("err", err)
          })
      }
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              {/* <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={e => this.handleSubmit(e)}>
                    <h1>Forgot Password</h1>
                    <p className="text-muted">
                      Please enter your email address below. We will send you
                      instructions in email to reset your password.
                    </p>
                    {this.state.showMessage ? (
                      <Alert
                        color={this.state.status === 0 ? "danger" : "success"}
                      >
                        {this.state.message}
                      </Alert>
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
              
              </Card> */}
              <div className="login-bg">
                <div className="login-boxs admin-loing">
                  <div className="seekrep-box">
                    <h2>Forgot Password</h2>
                  </div>
                  {this.state.showMessage ? (
                    <Alert
                      variant={this.state.status === 1 ? "success" : "danger"}
                    >
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
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="dark"
                      className={
                        this.state.loader ? "withspinner w-100" : "w-100"
                      }
                    >
                      {this.state.loader ? <Spinner /> : "Reset Password"}
                    </Button>
                    <div className="link-text text-right mb-2">
                      <Link to="/admin/login" className="small">
                        Back to Login?
                      </Link>
                    </div>
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
