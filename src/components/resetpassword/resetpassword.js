import React from "react"
import { Button, Alert } from "react-bootstrap"
import { resetpasswordfunc } from "../../functions"
import Spinner from "../spinner/spinner"
import { Helmet } from "react-helmet"

export default class Resetpassword extends React.Component {
  state = {
    password: "",
    confirmpassword: "",
    showMessage: false,
    message: "",
    status: "",
    loader: false,
  }
  componentDidMount() {}
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
        message: "Your password and confirmation password do not match.",
        loader: false,
        status: 0,
      })
    } else {
      const token = this.props.props.token
      const data = {
        password: this.state.password,
        token: token,
      }

      await resetpasswordfunc(data)
        .then(res => {
          if (res.data.status === 1) {
            this.setState({
              showMessage: true,
              message: res.data.message,
              status: 1,
              loader: false,
              password: "",
              confirmpassword: "",
            })
          } else if (res.data.status === 0) {
            this.setState({
              showMessage: true,
              message: res.data.message,
              status: 0,
              loader: false,
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
          <title>Reset Password</title>
        </Helmet>
        {this.state.showMessage ? (
          <Alert variant={this.state.status === 1 ? "success" : "danger"}>
            {this.state.message}
          </Alert>
        ) : null}
        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="form-group">
            <label> Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label> Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              value={this.state.confirmpassword}
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
