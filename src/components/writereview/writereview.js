import React from "react"
import { Button, Alert, Form } from "react-bootstrap"
// import { loginuser } from "../../functions"

export default class WriteReview extends React.Component {
  state = {
    ratings: "",
    file: "",
    place: "",
    review: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
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
        <Form onSubmit={this.handleSubmit}>
          <div className="ProfilePicture">
            <Form.File id="formcheck-api-custom" className="d-flex" custom>
              <Form.File.Input onChange={e => this.changehandler(e)} />
              <Form.File.Label data-browse="Button text">
                <i className="fa fa-upload"></i>
              </Form.File.Label>
            </Form.File>
          </div>
          <div className="form-group">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Example select</Form.Label>
              <Form.Control as="select" onChange={e => this.changehandler(e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="form-group">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </div>
          <Button type="submit" variant="dark" className="w-100">
            Log in
          </Button>
        </Form>
      </>
    )
  }
}
