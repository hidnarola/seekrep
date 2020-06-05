import React from "react"
import { Button, Alert } from "react-bootstrap"
import { forgotpassworduser } from "../../functions"
import Spinner from "../spinner/spinner"

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
    const data = {
      email: this.state.email,
    }
    console.log("data....", data)
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

  render() {
    return (
      <>
        {this.state.showMessage ? (
          <Alert variant={this.state.status === 1 ? "success" : "danger"}>
            {this.state.message}
          </Alert>
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
          <Button type="submit" variant="dark" className="w-100">
            {this.state.loader ? <Spinner /> : "Reset Password"}
          </Button>
        </form>
      </>
    )
  }
}
