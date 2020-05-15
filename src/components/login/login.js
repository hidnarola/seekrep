import React from "react"
import { Button, Alert } from "react-bootstrap"
import { loginuser } from "../../functions"

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showMessage: false,
    message: "",
    status: "",
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
    event.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log("data....", data)
    await loginuser(data)
      .then(res => {
        console.log("result....", res)
        this.setState({ showMessage: true, message: res })
        // window.location.
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        {this.state.showMessage ? (
          <Alert variant="danger"> {this.state.message}</Alert>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="link-text text-right mb-2">
            <a href="/forgotpassword" className="small">
              Forgot your password?
            </a>
          </div>
          <Button type="submit" variant="dark" className="w-100">
            Log in
          </Button>
          <div className="link-text text-center border-top mt-4 pt-3">
            Don’t have an account? <a href="/signup"> Sign up</a>
          </div>
        </form>
      </>
    )
  }
}
