import React from "react"
import { navigate } from "gatsby"
import { Button, Form, Alert } from "react-bootstrap"
import "./signup.scss"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { googleLogin, createuser, facebookLogin } from "../../functions"

export default class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    }
    console.log("data....", data)
    await createuser(data)
      .then(res => {
        console.log("result....", res)
        if (res.data.status === 0) {
          this.setState({ showMessage: true, message: res.data.message })
        } else if (res.data.register_resp.status === 1) {
          this.setState({
            showMessage: true,
            message:
              "Successfully register and conformation email is send on your mail",
            status: 1,
          })
          localStorage.setItem("registerId", res.data.register_resp.data._id)
        } else {
          this.setState({ showMessage: true, message: res.data.message })
        }
      })
      .catch(err => console.log(err))
  }

  googleResponse = async response => {
    console.log({ googleResponse: response })
    const token = response.accessToken
    console.log({ token })
    try {
      const response = await googleLogin(token)
    } catch (error) {
      console.log("err functon", error)
    }
  }

  facebookResponse = async response => {
    // console.log({ facebookResponse: response })
    const token = response.accessToken
    console.log("token", token)
    try {
      const response = await facebookLogin(token)
    } catch (error) {
      console.log("err functon", error)
    }
  }

  onFailure = error => {
    console.log("error login", error)
    alert(error)
  }

  render() {
    return (
      <>
        <div className="seekrep-box">
          <h2>
            Sign up to <span>SEEKREP</span>
          </h2>
          <GoogleLogin
            clientId="577694009182-enfv1fenk9j81u7cjc4e6897u1l4gmhl.apps.googleusercontent.com"
            buttonText="Countinue with Google"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
          <FacebookLogin
            appId="785477658920451"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse}
            icon="fa-facebook"
          />
          <div className="or-box">
            <span>Or</span>
          </div>
        </div>
        {this.state.showMessage ? (
          <Alert variant={this.state.status === 1 ? "success" : "danger"}>
            {this.state.message}
          </Alert>
        ) : null}
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="form-group">
            <label> First name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label> Last name </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={this.state.lastName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label> email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
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
              required
            />
          </div>
          <Button type="submit" variant="dark" className="w-100">
            Sign up
          </Button>
          <div className="link-text text-center border-top mt-4 pt-3">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </>
    )
  }
}
