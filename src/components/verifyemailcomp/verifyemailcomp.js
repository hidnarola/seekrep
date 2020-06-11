import React from "react"
import { verifymailid } from "../../functions"
import { Link } from "gatsby"
import "./verifyemail.scss"
import { Alert } from "react-bootstrap"

export default class VerifyEmailComp extends React.Component {
  state = {
    message: "",
    status: "",
  }

  componentDidMount() {}
  verifyHandler = () => {
    const id = this.props.props.userId

    verifymailid(id)
      .then(result => {
        localStorage.setItem("login-token", result.data.token)
        localStorage.setItem("id", result.data.id)
        this.setState({
          message: result.data.message,
          status: result.data.status,
        })
      })
      .catch(err => {
        console.log("error", err)
      })
  }

  render() {
    return (
      <div className="verifyemail-box">
        <h4>Verifty Email</h4>
        <p> Click here for verify your account </p>
        <button onClick={this.verifyHandler}>Verify Your Email</button>
        {this.state.message ? (
          <Alert variant={this.state.status === 1 ? "success" : "danger"}>
            {" "}
            {this.state.message}
          </Alert>
        ) : null}
        {this.state.status === 1 ? (
          <Link to="/editprofile">Login to your account</Link>
        ) : null}
      </div>
    )
  }
}
