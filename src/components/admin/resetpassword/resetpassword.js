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
import "../../../styles/main.scss"

export default class ForgotPassword extends React.Component {
  state = {
    password: "",
    confirmpassword: "",
    showMessage: false,
    message: "",
    status: "",
  }

  componentDidMount() {}
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitHandler = e => {
    e.preventDefault()
    if (this.state.password === "") {
      this.setState({
        showMessage: true,
        message: "Please Enter Password",
        loader: false,
        status: 0,
      })
    }
    if (this.state.confirmpassword === "") {
      this.setState({
        showMessage: true,
        message: "Please Enter Confirm Password",
        loader: false,
        status: 0,
      })
    }
    if (this.state.password === "" && this.state.confirmpassword === "") {
      this.setState({
        showMessage: true,
        message: "Please Enter Password",
        loader: false,
        status: 0,
      })
    }
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        showMessage: true,
        message: "password must be same",
        loader: false,
        status: 0,
      })
    } else {
      const data = {
        password: this.state.password,
        token: this.props.props.token,
      }
      adminResetPassword(data)
        .then(result => {
          if (result.data.status === 1) {
            this.setState({
              showMessage: true,
              message: result.data.message,
              status: 1,
              loader: false,
            })
            setTimeout(() => {
              navigate("/admin/login")
            }, 2000)
          } else if (result.data.status === 0) {
            this.setState({
              showMessage: true,
              message: result.data.message,
              status: 0,
              loader: false,
            })
          }
        })
        .catch(err => {
          // this.setState({
          //   showMessage: true,
          //   message: err,
          //   status: 0,
          //   loader: false,
          // })
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
                    {this.state.showMessage ? (
                      <Alert
                        color={this.state.status === 1 ? "success" : "danger"}
                      >
                        {this.state.message}
                      </Alert>
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
