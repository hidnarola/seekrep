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
    console.log("props", this.props)
    const id = this.props.props.userId
    console.log("user id", id)
    verifymailid(id)
      .then(result => {
        console.log("result", result)
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
          <Link to="/login">Login to your account</Link>
        ) : null}
      </div>
    )
  }
}
