import React from "react"
import { Button, Alert } from "react-bootstrap"
import { navigate, Link } from "gatsby"
import { loginuser, googleLogin, facebookLogin } from "../../functions"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"
import Spinner from "../spinner/spinner"
import { Helmet } from "react-helmet"

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showMessage: false,
    message: "",
    status: 0,
    loader: false,
  }
  navigateUrl = this.props.navigate ? this.props.navigate : "/"
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
      password: this.state.password,
    }

    await loginuser(data)
      .then(res => {
        // if (res.data.data.profileimage) {
        //   profilepic = res.data.data.profileimage
        // }
        if (res.data && res.data.status === 0) {
          this.setState({
            showMessage: true,
            message: res.data.message,
            loader: false,
            status: 0,
          })
        } else if (res.data && res.data.status === 1) {
          this.setState({
            loader: false,
            showMessage: true,
            message: res.data.message,
            status: 1,
          })
          setTimeout(() => {
            navigate(this.navigateUrl)
          }, 2000)
          // navigate(this.navigateUrl)
          localStorage.setItem("login-token", res.data.token)
          localStorage.setItem("id", res.data.data._id)
        } else {
          this.setState({
            showMessage: true,
            message: res.data.message,
            loader: false,
            status: 0,
          })
        }
      })
      .catch(err => console.log(err.response))
  }

  googleResponse = async response => {
    const token = response.accessToken
    try {
      const res = await googleLogin(token)
      if (res.status === 1) {
        localStorage.setItem("googlelogin", "yes")
        navigate(this.navigateUrl)
        localStorage.setItem("login-token", res.token)
        localStorage.setItem("id", res.data._id)
      }
    } catch (error) {
      console.log("err functon", error)
    }
  }

  facebookResponse = async response => {
    const token = response.accessToken
    try {
      const res = await facebookLogin(token)
      if (res.status === 1) {
        navigate(this.navigateUrl)
        localStorage.setItem("login-token", res.token)
        localStorage.setItem("id", res.data._id)
      }
    } catch (error) {
      console.log("err functon", error)
    }
  }

  onFailure = error => {
    console.log("error login", error)
    // alert(error)
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>
        <div className="seekrep-box">
          <h2>
            Login to <span>SEEKREP</span>
          </h2>
          <GoogleLogin
            clientId="577694009182-enfv1fenk9j81u7cjc4e6897u1l4gmhl.apps.googleusercontent.com"
            buttonText="Countinue with Google"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="2831009733683828"
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
            {" "}
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
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="link-text text-right mb-2">
            <Link to="/forgotpassword" className="small">
              Forgot your password?
            </Link>
          </div>
          <Button
            type="submit"
            variant="dark"
            className={this.state.loader ? "withspinner w-100" : "w-100"}
            disabled={!(this.state.email && this.state.password)}
          >
            {this.state.loader ? <Spinner /> : "Log in"}
          </Button>
          <div className="link-text text-center border-top mt-4 pt-3">
            Don’t have an account? <Link to="/signup"> Sign up</Link>
          </div>
        </form>
      </>
    )
  }
}
