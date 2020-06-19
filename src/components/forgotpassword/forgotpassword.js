import React from "react"
import { Button, Alert } from "react-bootstrap"
import { forgotpassworduser } from "../../functions"
import Spinner from "../spinner/spinner"
import { Helmet } from "react-helmet"

export default class Forgotpassword extends React.Component {
  state = {
    email: "",
    showMessage: false,
    message: "",
    status: "",
    loader: false,
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = async event => {
    this.setState({ loader: true })
    event.preventDefault()
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
      const data = {
        email: this.state.email,
      }

      await forgotpassworduser(data)
        .then(res => {
          if (res.data.status === 1) {
            this.setState({
              showMessage: true,
              message: res.data.message,
              status: 1,
              loader: false,
            })
          } else if (res.data.status === 0) {
            this.setState({
              showMessage: true,
              message: res.data.message,
              loader: false,
              status: 0,
            })
          }
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Forgot Password</title>
        </Helmet>
        {this.state.showMessage ? (
          <Alert variant={this.state.status === 1 ? "success" : "danger"}>
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
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <Button
            type="submit"
            variant="dark"
            className={this.state.loader ? "withspinner w-100" : "w-100"}
          >
            {this.state.loader ? <Spinner /> : "Reset Password"}
          </Button>
        </form>
      </>
    )
  }
}
