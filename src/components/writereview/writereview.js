import React from "react"
import { Button, Alert, Form } from "react-bootstrap"
// import { loginuser } from "../../functions";
import Rating from "react-rating"
import StarRating from "react-star-ratings"

export default class WriteReview extends React.Component {
  state = {
    value: 0,
    file: "",
    place: "",
    review: "",
  }

  changehandler = e => {
    // let file = e.target.files[0]
    // this.setState({
    //   file: file,
    // })
    let file = e.target.files[0].name

    this.setState({
      file: file,
    })
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    console.log("submit data", this.state)
    // const data = {
    //   email: this.state.email,
    //   password: this.state.password,
    // }
    // console.log("data....", data)
    // await loginuser(data)
    //   .then(res => {
    //     console.log("result....", res)
    //     this.setState({ showMessage: true, message: res })
    //   })
    //   .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Rating
            name="value"
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            initialRating={this.state.value}
            onChange={event => this.handleInputChange(event)}
          />

          <div className="ProfilePicture">
            <Form.File id="formcheck-api-custom" className="d-flex" custom>
              {/* <div className="ProfilePictureDIV">{$imagePreview}</div> */}
              <Form.File.Input onChange={e => this.changehandler(e)} />
              <Form.File.Label data-browse="UPLOAD">
                <i className="fa fa-upload"></i>
              </Form.File.Label>
            </Form.File>
          </div>
          <div className="form-group">
            <label>password</label>
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
          <div className="form-group">
            <label>Your review*</label>
            <input
              type="textarea"
              name="review"
              className="form-control"
              value={this.state.review}
              onChange={this.handleInputChange}
            />
          </div>
          <Button type="submit" variant="dark" className="w-100">
            Submit
          </Button>
        </form>
      </>
    )
  }
}
