import React from "react"
import { Button, Alert, Form } from "react-bootstrap"
import { reviewpost } from "../../functions"
import Rating from "react-rating"
import "./writereview.scss"

export default class WriteReview extends React.Component {
  state = {
    rating: 0,
    file: "",
    place: "",
    review: "",
    transactionproof: "",
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
    const data = {
      rating: this.state.rating,
      transactionproof: this.state.transactionproof,
      place: this.state.place,
      review: this.state.review,
    }
    console.log("data....", data)
    await reviewpost(data)
      .then(res => {
        console.log("result....", res)
        // this.setState({ showMessage: true, message: res })
      })
      .catch(err => console.log(err))
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
            <h4> Review Blake Green </h4>
            <p>* Required</p>
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
                  onChange={event => this.handleInputChange(event)}
                >
                  <option value="place 1">place 1</option>
                  <option value="place 2">place 2</option>
                  <option value="place 3">place 3</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Your review*</label>
                <textarea
                  type="textarea"
                  name="review"
                  className="form-control"
                  value={this.state.review}
                  onChange={this.handleInputChange}
                ></textarea>
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