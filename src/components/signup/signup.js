import React from "react"
import { navigate, Link } from "gatsby"
import { Button, Form, Alert } from "react-bootstrap"
import "./signup.scss"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { googleLogin, createuser, facebookLogin } from "../../functions"
import jQuery from "jquery"
import validator from "validator"
import Spinner from "../spinner/spinner"
import { Helmet } from "react-helmet"
import showPass from "../../images/eye.png";

export default class Signup extends React.Component {
                 state = {
                   firstName: "",
                   lastName: "",
                   email: "",
                   password: "",
                   showMessage: false,
                   message: "",
                   status: "",
                   loader: "",
                   type: "password"
                 }

                 handleInputChange = (element, value) => {
                   if (element == "firstName") {
                     this.setState({ firstName: value })
                   }
                   if (element == "lastName") {
                     this.setState({ lastName: value })
                   }
                   if (element == "email") {
                     this.setState({ email: value })
                   }
                   if (element == "password") {
                     this.setState({ password: value })
                   }
                   if (value === "") {
                     jQuery("." + element + "_errorMsg").html(
                       "This field is required"
                     )
                   } else {
                     jQuery("." + element + "_errorMsg").html("")
                   }
                 }

                 handleSubmit = async event => {
                   this.setState({ loader: true })
                   event.preventDefault()
                   const { firstName, lastName, email, password } = this.state
                   let isError = 0
                   if (firstName === "") {
                     jQuery(".firstName_errorMsg").html(
                       "This field is required"
                     )
                     isError = 1
                   }
                   if (lastName === "") {
                     jQuery(".lastName_errorMsg").html("This field is required")
                     isError = 1
                   }
                   if (email === "") {
                     jQuery(".email_errorMsg").html("This field is required")
                     isError = 1
                   } else if (!validator.isEmail(email)) {
                     jQuery(".email_errorMsg").html("Please enter valid email")
                     isError = 1
                   }

                   if (password === "") {
                     jQuery(".password_errorMsg").html("This field is required")
                     isError = 1
                   }

                   if (isError === 0) {
                     const data = {
                       firstName: this.state.firstName,
                       lastName: this.state.lastName,
                       email: this.state.email,
                       password: this.state.password,
                     }

                     await createuser(data)
                       .then(res => {
                         if (res.data.status === 0) {
                           this.setState({
                             showMessage: true,
                             message: res.data.message,
                             loader: false,
                           })
                         } else if (res.data.register_resp.status === 1) {
                           this.setState({
                             firstName: "",
                             lastName: "",
                             email: "",
                             password: "",
                             showMessage: true,
                             message:
                               "Successfully register and conformation email is send on your mail",
                             status: 1,
                             loader: false,
                           })
                           localStorage.setItem(
                             "registerId",
                             res.data.register_resp.data._id
                           )
                           // navigate("/editprofile")
                         } else {
                           this.setState({
                             showMessage: true,
                             message: res.data.message,
                             loader: false,
                           })
                         }
                       })
                       .catch(err => console.log(err))
                   }
                 }

                 navigateUrl = this.props.navigate ? this.props.navigate : "/"

                 googleResponse = async response => {
                   const token = response.accessToken
                   try {
                     const res = await googleLogin(token)
                     if (res.status === 1) {
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
                 showPasswordHandler = (e) => {
                   e.preventDefault()
                   if (this.state.type === "password") {
                     this.setState({ type: "text" })
                   }
                   if (this.state.type === "text") {
                     this.setState({ type: "password" })
                   }
                 }

                 render() {
                   return (
                     <>
                       <Helmet>
                         <meta charSet="utf-8" />
                         <title>Sign Up</title>
                       </Helmet>
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
                         <Alert
                           variant={
                             this.state.status === 1 ? "success" : "danger"
                           }
                         >
                           {this.state.message}
                         </Alert>
                       ) : null}
                       <form
                         onSubmit={event => this.handleSubmit(event)}
                         className="login-form"
                       >
                         <div className="form-group">
                           <label>First name</label>
                           <input
                             type="text"
                             name="firstName"
                             id="firstName"
                             className="form-control"
                             onChange={input =>
                               this.handleInputChange(
                                 input.target.name,
                                 input.target.value
                               )
                             }
                           />
                           <span
                             className="firstName_errorMsg"
                             style={{ color: "red" }}
                           ></span>
                         </div>
                         <div className="form-group">
                           <label>Last name </label>
                           <input
                             type="text"
                             name="lastName"
                             id="lastName"
                             className="form-control"
                             onChange={input =>
                               this.handleInputChange(
                                 input.target.name,
                                 input.target.value
                               )
                             }
                           />
                           <span
                             className="lastName_errorMsg"
                             style={{ color: "red" }}
                           ></span>
                         </div>
                         <div className="form-group">
                           <label>E-mail</label>
                           <input
                             type="text"
                             name="email"
                             id="email"
                             className="form-control"
                             onChange={input =>
                               this.handleInputChange(
                                 input.target.name,
                                 input.target.value
                               )
                             }
                           />
                           <span
                             className="email_errorMsg"
                             style={{ color: "red" }}
                           ></span>
                         </div>
                         <div className="form-group passwordinput">
                           <label>Password</label>
                           <div className="view-icon"></div>
                           <input
                             type={
                               this.state.type === "password"
                                 ? "password"
                                 : "text"
                             }
                             name="password"
                             id="password"
                             className="form-control"
                             onChange={input =>
                               this.handleInputChange(
                                 input.target.name,
                                 input.target.value
                               )
                             }
                           />
                           <button className="showpassword" onClick={e => this.showPasswordHandler(e)}>
                             <img src={showPass} />
                           </button>
                           <span
                             className="password_errorMsg"
                             style={{ color: "red" }}
                           ></span>
                         </div>
                         <Button
                           type="submit"
                           variant="dark"
                           className={
                             this.state.loader ? "withspinner w-100" : "w-100"
                           }
                           disabled={
                             !(
                               this.state.email &&
                               this.state.password &&
                               this.state.firstName &&
                               this.state.lastName
                             )
                           }
                         >
                           {this.state.loader ? <Spinner /> : "Sign up"}
                         </Button>
                         <div className="link-text text-center border-top mt-4 pt-3">
                           Already have an account?{" "}
                           <Link to="/login">Log in</Link>
                         </div>
                       </form>
                     </>
                   )
                 }
               }
