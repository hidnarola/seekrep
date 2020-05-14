import React from "react"
import { Button, Alert } from "react-bootstrap"
import { profileDetail } from "../../functions"

export default class SellerProfile extends React.Component {
  state = {
    userData: "",
  }
  componentDidMount() {
    profileDetail()
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
                <a href="/writereview">Write a review</a>
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
