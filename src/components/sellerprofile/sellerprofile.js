import React from "react"
import {
  Button,
  Alert,
  Modal,
  Nav,
  Tabs,
  Tab,
  ProgressBar,
} from "react-bootstrap"
import { getDataById, getReviewsById } from "../../functions"
import { Link, navigate } from "gatsby"
import displayImg from "../../images/default.png"
import Rating from "react-rating"
import CheckmarkIcon from "../../images/checkmark.png"
import RectangleImg from "../../images/rectangle.jpg"
import "./sellerprofile.scss"
import * as moment from "moment"
import Login from "../login/login"
import Signup from "../signup/signup"
import TimeAgo from "react-timeago"
import Pagination from "react-paginate"

export default class SellerProfileComp extends React.Component {
                 constructor(props) {
                   super(props)
                   this.state = {
                     userData: "",
                     reviewDetails: [],
                     showModel: false,
                     loading: false,
                     finalId: "",
                     limit: "",
                     totalPages: "",
                     pageCount: "",
                   }
                 }
                 componentDidMount() {
                   // console.log("show Model befor", this.state.showModel)
                   const path = this.props.location.location.pathname

                   const finalId = path.replace("/sellerprofile/", "")
                   this.setState({ finalId: finalId })
                   getDataById(finalId)
                     .then(res => {
                       console.log("res js", res.data.user.data)
                       this.setState({
                         userData: res.data.user.data[0],
                       })
                       console.log("this.state.userData", this.state.userData)
                     })
                     .catch(err => {
                       console.log("error", err)
                     })

                   getReviewsById(finalId)
                     .then(response => {
                       console.log("response", response)
                       this.setState({
                         reviewDetails: response.data.review.data,
                       })
                     })
                     .catch(error => {
                       console.log("error", error)
                     })
                 }

                 handlePageClick = (page) => {
                    const pageno = page.selected + 1
                    console.log("pageno", pageno)
                    const pageNo = {
                      pageno: pageno,
                    }
                 }
                 handleClick = () => {
                   this.setState({ loading: true, showModel: true })
                   console.log("show model", this.state.showModel)
                 }
                 handleNavigate = () => {
                   navigate(`/writereview/${this.state.finalId}`)
                 }
                 handleClose = () => {
                   this.setState({ showModel: false })
                 }

                 render() {
                   let { userData, limit, totalPages } = this.state
                   let token = localStorage.getItem("login-token")
                   const year = moment(userData.createdAt).format("YYYY")

                   return (
                     <div>
                       <div className="row">
                         <div className="col-12 col-lg-8">
                           <div className="seller-profile">
                             <div className="row">
                               <div className="col-3">
                                 <div className="seller-img">
                                   <img
                                     src={
                                       userData.profileimage
                                         ? userData.profileimage
                                         : displayImg
                                     }
                                   />
                                 </div>
                               </div>
                               <div className="col-9">
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
                                 <p> verifyed reviews</p>
                                 <div className="reting-box">
                                   {/* <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" className="opacity15" /> */}
                                 </div>
                               </div>
                             </div>
                           </div>
                           <div className="write-review">
                             <p>Bought from Blake before?</p>
                             <button
                               className="btn btn-light ml-md-auto"
                               onClick={
                                 token ? this.handleNavigate : this.handleClick
                               }
                             >
                               Write a review
                             </button>
                           </div>
                           <div className="review-chart">
                             <h4>Reviews</h4>
                             <ul>
                               <li>
                                 <div className="stare-text">5 stars</div>
                                 <ProgressBar now={60} />
                                 <div className="progress-text">60%</div>
                               </li>
                               <li>
                                 <div className="stare-text">4 stars</div>
                                 <ProgressBar now={40} />
                                 <div className="progress-text">40%</div>
                               </li>
                               <li>
                                 <div className="stare-text">3 stars</div>
                                 <ProgressBar now={30} />
                                 <div className="progress-text">30%</div>
                               </li>
                               <li>
                                 <div className="stare-text">2 stars</div>
                                 <ProgressBar now={20} />
                                 <div className="progress-text">20%</div>
                               </li>
                               <li>
                                 <div className="stare-text">1 stars</div>
                                 <ProgressBar now={10} />
                                 <div className="progress-text">10%</div>
                               </li>
                             </ul>
                           </div>
                           {this.state.reviewDetails ? (
                             this.state.reviewDetails &&
                             this.state.reviewDetails.map(reviews => (
                               <div className="readreview-box">
                                 
                                 <div className="top">
                                   <div className="left">
                                     <img src={RectangleImg} alt="" />
                                     <div className="content">
                                       <h6>
                                         {reviews.creator_details.firstName}{" "}
                                         {reviews.creator_details.lastName}
                                       </h6>
                                       {/* <p>8 reviews</p> */}
                                     </div>
                                   </div>
                                   <div className="review-icon">
                                     <Rating
                                       initialRating={reviews.rating}
                                       readonly="true"
                                       emptySymbol="fa fa-star-o fa-2x"
                                       fullSymbol="fa fa-star fa-2x"
                                     />
                                   </div>
                                 </div>
                                 <div className="sub-title">
                                   Purchased a Louis Vuitton bag from{" "}
                                   {userData.firstName} {userData.lastName}
                                 </div>
                                 <div className="content">{reviews.review}</div>
                                 <div className="week">
                                   Posted <TimeAgo date={reviews.createdAt} />
                                 </div>
                               </div>
                             ))
                           ) : (
                             <h4>No Reviews</h4>
                           )}
                           {this.state.reviewDetails ? (
                             <div className="pagination-box">
                               <Pagination
                                 initialPage={0}
                                 previousLabel={"previous"}
                                 nextLabel={"next"}
                                 breakLabel={"..."}
                                 breakClassName={"page-item"}
                                 breakLinkClassName={"page-link"}
                                 pageClassName={"page-item"}
                                 previousClassName={"page-item"}
                                 pageLinkClassName={"page-link"}
                                 nextClassName={"page-item"}
                                 previousLinkClassName={"page-link"}
                                 nextLinkClassName={"page-link"}
                                 pageCount={this.state.pageCount}
                                 marginPagesDisplayed={totalPages}
                                 pageRangeDisplayed={limit}
                                 onPageChange={this.handlePageClick}
                                 containerClassName={"pagination"}
                                 subContainerClassName={""}
                                 activeClassName={"active"}
                               />
                             </div>
                           ) : null}
                         </div>
                         <div className="col-12 col-lg-4">
                           <div className="seekrep-detalis">
                             <h4>What is Seekrep?</h4>
                             <p>
                               Buying and selling online? Use Seekrep to ensure
                               that whoever you’re dealing with can be trusted.
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

                       <Modal
                         show={this.state.showModel}
                         onHide={this.handleClose}
                       >
                         <Modal.Header closeButton></Modal.Header>
                         <div className="login-bg modal-login">
                           <div className="login-boxs">
                             <Tabs
                               defaultActiveKey="login"
                               id="uncontrolled-tab-example"
                             >
                               <Tab eventKey="login" title="Login">
                                 <Login
                                   navigate={`/writereview/${this.state.finalId}`}
                                 />
                               </Tab>
                               <Tab eventKey="signup" title="Signup">
                                 <Signup />
                               </Tab>
                             </Tabs>
                           </div>
                         </div>
                       </Modal>
                     </div>
                   )
                 }
               }
