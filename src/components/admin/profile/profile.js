import React from "react"
import { getProfileDetail } from "../../../functions"
import "./profile.scss"
import { navigate } from "gatsby"

export default class Profile extends React.Component {
  state = {
    user: "",
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }

    const id = localStorage.getItem("id")
    getProfileDetail({ id: id })
      .then(result => {
        if (result.data.user.status === 1) {
          this.setState({ user: result.data.user.data })
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
        <h4 className="admin-title">Profile Details</h4>

        <div className="details-box">
          <div className="displayimg">
            <img src="" />
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
