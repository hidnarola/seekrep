import React from "react"
import { ReviewDetailsById } from "../../../functions"
import Rating from "react-rating"
import displayImg from "../../../images/default.png"
import "./reviewdetails.scss"
import { navigate } from "gatsby"
import Spinner from "../../spinner/spinner"
import { Helmet } from "react-helmet"

export default class Reviewdetail extends React.Component {
  state = {
    reviewDetails: [],
    loader: false,
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }
    this.setState({ loader: true })

    const id = this.props.props.id
    ReviewDetailsById(id)
      .then(result => {
        this.setState({
          reviewDetails: result.data.requestData.review.data,
          loader: false,
        })
        // if (result.data.user.status === 1) {
        //   this.setState({ user: result.data.user.data })
        //   console.log("this.state.user", this.state.user)
        // } else if (result.data.status === 0) {
        //   this.setState({ user: null })
        // }
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Review Details</title>
        </Helmet>
        {this.state.loader ? (
          <Spinner />
        ) : (
          <>
            <h4 className="admin-title">Review Details</h4>
            {this.state.reviewDetails ? (
              this.state.reviewDetails &&
              this.state.reviewDetails.map(reviews => (
                <div className="readreview-box">
                  <div className="top">
                    <div className="left">
                      <img
                        src={
                          reviews.creator_details.profileimage
                            ? reviews.creator_details.profileimage
                            : displayImg
                        }
                        alt=""
                      />
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
                    {/* Purchased a Louis Vuitton bag from{" "}
                        {userData.firstName} {userData.lastName} */}
                  </div>
                  <div className="content">{reviews.review}</div>
                </div>
              ))
            ) : (
              <h4>No Reviews</h4>
            )}
          </>
        )}
      </div>
    )
  }
}
