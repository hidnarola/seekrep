import React from "react"
import { Button, Alert } from "react-bootstrap"
import { resetpasswordfunc } from "../../functions"
import Spinner from "../spinner/spinner"

export default class Resetpassword extends React.Component {
  state = {
    password: "",
    confirmpassword: "",
    showMessage: false,
    message: "",
    status: "",
    loader: false,
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
    this.setState({ loader: true })
    event.preventDefault()
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        showMessage: true,
        message: "password must be same",
        loader: false,
      })
    } else {
      const token = this.props.props.token
      const data = {
        password: this.state.password,
        token: token,
      }
      console.log("data....", data)
      await resetpasswordfunc(data)
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
        {this.state.showMessage ? (
          <Alert variant={this.state.status === 1 ? "success" : "danger"}>
            {this.state.message}
          </Alert>
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
            {this.state.loader ? <Spinner /> : "Reset Password"}
          </Button>
        </form>
      </>
    )
  }
}
