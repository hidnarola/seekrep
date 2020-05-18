import React from "react"
import { verifymailid } from "../../functions"
import { Link } from "gatsby"

export default class VerifyEmailComp extends React.Component {
  state = {
    message: "",
  }

  componentDidMount() {
    const id = localStorage.getItem("registerId")
    verifymailid({ id: id })
      .then(result => {
        console.log("result", result)
        this.setState({ message: result.data.message })
        localStorage.removeItem("registerId")
      })
      .catch(err => {
        console.log("error", err)
      })
  }

  render() {
    return (
      <div>
        <h4>verifty email</h4>
        <h6>{this.state.message}</h6>
        <Link to="/login">Login to your account</Link>
      </div>
    )
  }
}
