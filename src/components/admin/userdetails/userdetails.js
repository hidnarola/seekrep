import React from "react"
import { getUserById } from "../../../functions"
import "./userdetails.scss"
import { navigate } from "gatsby"
import Spinner from "../../spinner/spinner"
import { Helmet } from "react-helmet"
export default class UserDetails extends React.Component {
  state = {
    user: "",
    loader: false,
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }
    this.setState({ loader: true })

    const id = this.props.props.id
    getUserById(id)
      .then(result => {
        if (result.data.user.status === 1) {
          this.setState({ user: result.data.user.data, loader: false })
        } else if (result.data.status === 0) {
          this.setState({ user: null, loader: false })
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>User Details</title>
        </Helmet>
        {this.state.loader ? (
          <Spinner />
        ) : (
          <>
            <h4 className="admin-title">User Details</h4>
            <div className="details-box">
              <div className="row">
                <div className="col-sm-4">
                  <div className="displayimg">
                    <img src={user.profileimage} />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="name-details">
                    <p>
                      <b>First Name: </b>
                      <span>{user.firstName ? user.firstName : "-"}</span>
                    </p>
                    <p>
                      <b>Last Name: </b>
                      <span>{user.lastName ? user.lastName : "-"}</span>
                    </p>
                    <p>
                      <b>Email: </b>
                      <span>{user.email ? user.email : "-"}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="details">
                <p>
                  <b>Country Name: </b>
                  <span>{user.countryname ? user.countryname : "-"}</span>
                </p>
                <p>
                  <b>Depop: </b>
                  <span>{user.depop ? user.depop : "-"}</span>
                </p>
                <p>
                  <b>eBay: </b> <span>{user.eBay ? user.eBay : "-"}</span>
                </p>
                <p>
                  <b>Facebook: </b>{" "}
                  <span>{user.facebook ? user.facebook : "-"}</span>
                </p>
                <p>
                  <b>Instagram: </b>
                  <span>{user.instagram ? user.instagram : "-"}</span>
                </p>
                <p>
                  <b>Grailed: </b>
                  <span>{user.grailed ? user.grailed : "-"}</span>
                </p>
                <p>
                  <b>StockX: </b> <span>{user.stockX ? user.stockX : "-"}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}
