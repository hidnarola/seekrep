import React from "react"
import { Button, Alert, Form } from "react-bootstrap"
import { reviewpost, getDataById } from "../../functions"
import Rating from "react-rating"
import "./writereview.scss"
import swal from "sweetalert"
import { navigate } from "gatsby"
import jQuery from "jquery"
import validator from "validator"
export default class WriteReview extends React.Component {
  state = {
    rating: 0,
    file: "",
    place: "",
    review: "",
    transactionproof: "",
    message: "",
    showMessage: false,
    status: "",
    firstname: "",
    lastname: "",
  }

  componentDidMount() {
    console.log("props....", this.props)
    getDataById(this.props.location.profileID)
      .then(res => {
        console.log("res....", res)
        this.setState({
          firstname: res.data.user.data[0].firstName,
          lastname: res.data.user.data[0].lastName,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }
  changehandler = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        transactionproof: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }
  ratingChange = value => {
    this.setState({ rating: value })
  }
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    const { rating, place, review } = this.state
    let isError = 0
    if (rating === 0) {
      jQuery(".rating_errorMsg").html("This field is required")
      isError = 1
    }
    if (place === "") {
      jQuery(".place_errorMsg").html("This field is required")
      isError = 1
    }
    if (review === "") {
      jQuery(".review_errorMsg").html("This field is required")
      isError = 1
    }

    if (isError === 0) {
      const data = {
        rating: this.state.rating,
        transactionproof: this.state.transactionproof,
        place: this.state.place,
        review: this.state.review,
        creator: localStorage.getItem("id"),
        profileReview: this.props.location.profileID,
      }
      console.log("data....", data)
      await reviewpost(data)
        .then(res => {
          console.log("result....", res)
          if (res.data.status === 1) {
            this.setState({ status: res.data.status })
            swal(res.data.message).then(resp => {
              navigate(`/sellerprofile/${res.data.creator._id}`)
            })
          }
          this.setState({
            showMessage: true,
            message: res.data.message,
          })
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    let { transactionproof } = this.state
    let $transactionproof = null
    if (transactionproof) {
      $transactionproof = <img src={transactionproof} />
    }
    return (
      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="review-main">
            <h4>
              {" "}
              Review {this.state.firstname} {this.state.lastname}{" "}
            </h4>
            <p>* Required</p>
            {this.state.status !== 1 && this.state.showMessage ? (
              <Alert variant="danger"> {this.state.message}</Alert>
            ) : null}
            <form onSubmit={this.handleSubmit}>
              <div className="ratingbox">
                <h4>Your rating*</h4>
                <Rating
                  name="rating"
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  initialRating={this.state.rating}
                  value={this.state.rating}
                  onChange={this.ratingChange}
                />
                <span
                  className="rating_errorMsg"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div className="ProfilePicture">
                <h4>Upload proof of transaction</h4>
                <p>
                  Please upload invoices/screenshots of chats/recieved items
                </p>
                <Form.File id="formcheck-api-custom" className="d-flex" custom>
                  <div className="ProfilePictureDIV">{$transactionproof}</div>
                  <Form.File.Input onChange={e => this.changehandler(e)} />
                  <Form.File.Label data-browse="UPLOAD">
                    <i className="fa fa-upload"></i>
                  </Form.File.Label>
                </Form.File>
              </div>
              <div className="form-group">
                <label>Where did you buy from?*</label>
                <select
                  id="places"
                  name="place"
                  required
                  onChange={event => this.handleInputChange(event)}
                >
                  <option value="Depop">Depop</option>
                  <option value="StockX">StockX</option>
                  <option value="eBay">eBay</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Grailed">Grailed</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Other">Other</option>
                  {/* {this.optionsValue.map(options => (
                    <option>{options}</option>
                  ))} */}
                </select>
                <span
                  className="place_errorMsg"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div className="form-group mb-3">
                <label>Your review*</label>
                <textarea
                  type="textarea"
                  name="review"
                  required
                  className="form-control"
                  value={this.state.review}
                  onChange={this.handleInputChange}
                ></textarea>
                <span
                  className="review_errorMsg"
                  style={{ color: "red" }}
                ></span>
              </div>
              <Button type="submit" variant="dark" className="w-100">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
