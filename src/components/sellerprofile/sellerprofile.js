import React from "react"
import { Button, Alert } from "react-bootstrap"
import { getDataById } from "../../functions"
import { Link } from "gatsby"

export default class SellerProfileComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: "",
    }
  }
  componentDidMount() {
    console.log("this.props", this.props)
    console.log("this.props.location", this.props.location.location)
    console.log("id", this.props.location.location.pathname)
    const path = this.props.location.location.pathname
    console.log("path", path)
    const finalId = path.replace("/sellerprofile/", "")
    console.log("finalid", finalId)
    // console.log("this.props", this.props.match.params.id)
    getDataById(finalId)
      .then(res => {
        console.log("res js", res.data.user.data)
        this.setState({ userData: res.data.user.data })
        console.log("this.state.userData", this.state.userData)
      })
      .catch(err => {
        console.log("error", err)
      })
  }
  render() {
    let { userData } = this.state
    let token = localStorage.getItem("login-token")
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="seller-profile">
            <div className="row">
              <div className="col-sm-4">
                <img src={userData.profileimage} />
              </div>
              <div className="col-sm-8">
                <h4>
                  {userData.firstName}
                  {userData.lastName}
                </h4>
              </div>
            </div>
          </div>
          <div className="write-review">
            <div className="row">
              <div className="col-sm-6">
                <p>Bought from Blake before?</p>
              </div>
              <div className="col-sm-6">
                <Link to={token ? "/writereview" : "/login"}>
                  Write a review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="seekrep-detail">
            <h4>What is Seekrep?</h4>
            <p>
              Buying and selling online? Use Seekrep to ensure that whoever
              you’re dealing with can be trusted.
            </p>
          </div>
          <div className="profiles">
            <h4>Profiles</h4>
            <div className="profile-wrapper">
              <ul>
                <li>
                  <h6>Depop</h6>
                  <p>{userData.depop}</p>
                </li>
                <li>
                  <h6>eBay</h6>
                  <p>{userData.eBay}</p>
                </li>
                <li>
                  <h6>Facebook</h6>
                  <p>{userData.facebook}</p>
                </li>
                <li>
                  <h6>Instagram</h6>
                  <p>{userData.instagram}</p>
                </li>
                <li>
                  <h6>Grailed</h6>
                  <p>{userData.grailed}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
