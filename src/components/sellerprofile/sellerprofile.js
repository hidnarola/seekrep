import React from "react"
import { Button, Alert, Modal, Nav, Tabs, Tab } from "react-bootstrap"
import { getDataById } from "../../functions"
import { Link, navigate } from "gatsby"
import displayImg from "../../images/verify-img.png"
import StartIcon from "../../images/start.png"
import CheckmarkIcon from "../../images/checkmark.png"
import RectangleImg from "../../images/rectangle.jpg"
import "./sellerprofile.scss"
import * as moment from "moment"
import Login from "../login/login"
import Signup from "../signup/signup"

export default class SellerProfileComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      reviewDetails: [],
      showModel: false,
      loading: false,
    }
  }
  componentDidMount() {
    // console.log("show Model befor", this.state.showModel)
    const path = this.props.location.location.pathname

    const finalId = path.replace("/sellerprofile/", "")
    getDataById(finalId)
      .then(res => {
        console.log("res js", res.data.user.data)
        this.setState({
          userData: res.data.user.data[0],
          reviewDetails: res.data.user.data[0].reviewDetails,
        })
        console.log("this.state.userData", this.state.userData)
      })
      .catch(err => {
        console.log("error", err)
      })
  }

  handleClick = () => {
    this.setState({ loading: true, showModel: true })
    console.log("show model", this.state.showModel)
  }
  handleNavigate = () => {
    navigate("/writereview")
  }
  handleClose = () => {
    this.setState({ showModel: false })
  }

  render() {
    let { userData } = this.state
    let token = localStorage.getItem("login-token")
    const year = moment(userData.createdAt).format("YYYY")

    return (
      <div>
        {/* {this.state.reviewDetails.map(review => ( */}
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

                    <span>Joined in {year} </span>
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
              <button
                className="btn btn-light ml-auto"
                onClick={token ? this.handleNavigate : this.handleClick}
              >
                {/* <Link
                className="btn btn-light ml-auto"
                to={token ? "/writereview" : "/login"}
              > */}
                Write a review
                {/* </Link> */}
              </button>
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
        {/* ))} */}
        <Modal show={this.state.showModel} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <div className="login-boxs">
            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
              <Tab eventKey="login" title="Login">
                <Login />
              </Tab>
              <Tab eventKey="signup" title="Signup">
                <Signup />
              </Tab>
            </Tabs>
          </div>
        </Modal>
      </div>
    )
  }
}
