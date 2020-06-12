import React from "react"
import { getUserById } from "../../../functions"
import "./userdetails.scss"
import { navigate } from "gatsby"

export default class UserDetails extends React.Component {
  state = {
    user: "",
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }

    console.log("id", this.props.props.id)
    const id = this.props.props.id
    getUserById(id)
      .then(result => {
        console.log("result", result)
        if (result.data.user.status === 1) {
          this.setState({ user: result.data.user.data })
          console.log("this.state.user", this.state.user)
        } else if (result.data.status === 0) {
          this.setState({ user: null })
        }
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  render() {
    let { user } = this.state
    return (
      <div>
        <h4 className="admin-title">User Details</h4>
        {console.log("user state", user)}
        <div className="details-box">
          <div className="displayimg">
            <img src={user.profileimage} />
          </div>
          <div className="details">
            <p>
              First Name: <span>{user.firstName ? user.firstName : "-"}</span>
            </p>
            <p>
              Last Name: <span>{user.lastName ? user.lastName : "-"}</span>
            </p>
            <p>
              Email: <span>{user.email ? user.email : "-"}</span>
            </p>
            <p>
              Country Name:{" "}
              <span>{user.countryname ? user.countryname : "-"}</span>
            </p>
            <p>
              Depop: <span>{user.depop ? user.depop : "-"}</span>
            </p>
            <p>
              eBay: <span>{user.eBay ? user.eBay : "-"}</span>
            </p>
            <p>
              Facebook: <span>{user.facebook ? user.facebook : "-"}</span>
            </p>
            <p>
              Instagram: <span>{user.instagram ? user.instagram : "-"}</span>
            </p>
            <p>
              Grailed: <span>{user.grailed ? user.grailed : "-"}</span>
            </p>
            <p>
              StockX: <span>{user.stockX ? user.stockX : "-"}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
