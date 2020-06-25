import React from "react"
import { getProfileDetail } from "../../../functions"
import "./profile.scss"
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"
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
      <div className="profile-box">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile</title>
        </Helmet>
        <h4 className="admin-title">Profile Details</h4>

        <div className="details-box">
          <div className="row">
            <div className="col-sm-4">
              <div className="displayimg">
                <img src={user.profileimage ? user.profileimage : null} />
              </div>
            </div>
            <div className="col-sm-8">
              <div className="name-details">
                <p>
                  <b>First Name:</b>
                  <span>{user.firstName ? user.firstName : "-"}</span>
                </p>
                <p>
                  <b>Last Name:</b>{" "}
                  <span>{user.lastName ? user.lastName : "-"}</span>
                </p>
                <p>
                  <b>Email:</b> <span>{user.email ? user.email : "-"}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="details">
            <p>
              <b>Depop:</b> <span>{user.depop ? user.depop : "-"}</span>
            </p>
            <p>
              <b>eBay:</b> <span>{user.eBay ? user.eBay : "-"}</span>
            </p>
            <p>
              <b>Facebook:</b>{" "}
              <span>{user.facebook ? user.facebook : "-"}</span>
            </p>
            <p>
              <b>Instagram:</b>{" "}
              <span>{user.instagram ? user.instagram : "-"}</span>
            </p>
            <p>
              <b>Grailed:</b> <span>{user.grailed ? user.grailed : "-"}</span>
            </p>
            <p>
              <b>StockX:</b> <span>{user.stockX ? user.stockX : "-"}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
