import React from "react"
import { Button, Alert } from "react-bootstrap"
import { getDataById } from "../../functions"
import { Link } from "gatsby"
import displayImg from "../../images/verify-img.png"
import StartIcon from "../../images/start.png"
import CheckmarkIcon from "../../images/checkmark.png"
import RectangleImg from "../../images/rectangle.jpg"
import "./sellerprofile.scss"

export default class SellerProfileComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
    }
  }
  componentDidMount() {
    const path = this.props.location.location.pathname

    const finalId = path.replace("/sellerprofile/", "")
    getDataById(finalId)
      .then(res => {
        console.log("res js", res.data.user.data)
        this.setState({ userData: res.data.user.data[0] })
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
        <div className="col-12 col-sm-8">
          <div className="seller-profile">
            <div className="row">
              <div className="col-12 col-sm-3">
                <div className="seller-img">
                  <img src={displayImg} />
                </div>
              </div>
              <div className="col-12 col-sm-9">
                <h4>
                  {userData && userData.firstName}
                  {userData && userData.lastName}
                </h4>
                <div className="verified-boxs">
                  <Button variant="success">
                    <img src={CheckmarkIcon} alt="" />
                    {userData && userData.emailVerified
                      ? "Verified"
                      : "Not Verified"}
                  </Button>
                  <span>Joined in {userData && userData.createdAt} </span>
                </div>
                <p>verifyed reviews</p>
                <div className="reting-box">
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" />
                  <img src={StartIcon} alt="" className="opacity15" />
                </div>
              </div>
            </div>
          </div>
          <div className="write-review">
            <p>Bought from Blake before?</p>
            <Link
              className="btn btn-light ml-auto"
              to={token ? "/writereview" : "/login"}
            >
              Write a review
            </Link>
          </div>

          <div className="readreview-box">
            <div className="top">
              <div className="left">
                <img src={RectangleImg} alt="" />
                <div className="content">
                  <h6>Jacob Howell</h6>
                  <p>8 reviews</p>
                </div>
              </div>
              <div className="review-icon">
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" />
                <img src={StartIcon} alt="" className="opacity" />
              </div>
            </div>
            <div className="sub-title">
              Purchased a Louis Vuitton bag from Blake Green
            </div>
            <div className="content">
              Very straight forward transaction and easy to deal with. I would
              definitely buy from Jacob again.
            </div>
            <div className="week">Posted 1 week ago</div>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="seekrep-detalis">
            <h4>What is Seekrep?</h4>
            <p>
              Buying and selling online? Use Seekrep to ensure that whoever
              you’re dealing with can be trusted.
            </p>
          </div>
          <div className="profiles-boxs">
            <h4>Profiles</h4>
            <ul className="profile-list">
              <li>
                <h6>Depop</h6>
                <p>@blakegreen{userData && userData.depop}</p>
              </li>
              <li>
                <h6>eBay</h6>
                <p>{userData && userData.eBay}</p>
              </li>
              <li>
                <h6>Facebook</h6>
                <p>{userData && userData.facebook}</p>
              </li>
              <li>
                <h6>Instagram</h6>
                <p>{userData && userData.instagram}</p>
              </li>
              <li>
                <h6>Grailed</h6>
                <p>{userData && userData.grailed}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
