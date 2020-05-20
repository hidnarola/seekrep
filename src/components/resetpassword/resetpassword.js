import React from "react"
import { Button, Alert } from "react-bootstrap"
import { resetpasswordfunc } from "../../functions"

export default class Resetpassword extends React.Component {
  state = {
    password: "",
    confirmpassword: "",
    showMessage: false,
    message: "",
  }
  componentDidMount() {
    console.log("props", this.props)
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
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ showMessage: true, message: "password must be same" })
    } else {
      const token = this.props.props.token
      const data = {
        password: this.state.password,
        token: token,
      }
      console.log("data....", data)
      await resetpasswordfunc(data)
        .then(res => {
          console.log("result....", res)
          this.setState({ showMessage: true, message: res.data.message })
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <>
        {this.state.showMessage ? (
          <Alert variant="danger">{this.state.message}</Alert>
        ) : null}
        <form onSubmit={this.handleSubmit}>
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
          <Button type="submit" variant="dark" className="w-100">
            Reset Password
          </Button>
        </form>
      </>
    )
  }
}
