import React from "react"
import { Button, Alert } from "react-bootstrap"
import { forgotpassworduser } from "../../functions"

export default class Forgotpassword extends React.Component {
  state = {
    email: "",
    showMessage: false,
    message: "",
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
    }
    console.log("data....", data)
    await forgotpassworduser(data)
      .then(res => {
        this.setState({ showMessage: true, message: res.data.message })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        {this.state.showMessage ? (
          <Alert variant="danger">{this.state.message}</Alert>
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
            Reset Password
          </Button>
        </form>
      </>
    )
  }
}
