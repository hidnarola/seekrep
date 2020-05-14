import React from "react"
import { Button, Alert, Form } from "react-bootstrap"
import { profileImg } from "../../images/verify-img.png"
import { geteditprofile, editprofiledata } from "../../functions"
import "./editprofile.scss"

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: "",
      imagePreviewUrl: "",
      firstname: "",
      lastname: "",
      depop: "",
      eBay: "",
      facebook: "",
      instagram: "",
      grailed: "",
      stockX: "",
      email: "",
      password: "",
    }
  }
  componentDidMount() {
    geteditprofile()
      .then(result => {
        console.log("result get prfile", result)
        console.log("first name", result.data.user.data.firstName)
        this.setState({
          firstname: result.data.user.data.firstName,
          lastname: result.data.user.data.lastName,
          email: result.data.user.data.email,
          password: result.data.user.data.password,
          depop: result.data.user.data.depop,
          eBay: result.data.user.data.eBay,
          facebook: result.data.user.data.facebook,
          instagram: result.data.user.data.instagram,
          grailed: result.data.user.data.grailed,
          stockX: result.data.user.data.stockX,
          imagePreviewUrl: result.data.user.data.profileimage,
        })
      })
      .catch(err => {
        console.log("err get profile front", err)
      })
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  changehandler = e => {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = async event => {
    event.preventDefault()
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      depop: this.state.depop,
      eBay: this.state.eBay,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      grailed: this.state.grailed,
      stockX: this.state.stockX,
      email: this.state.email,
      password: this.state.password,
      profileimage: this.state.imagePreviewUrl,
    }
    console.log("submit data", data)
    await editprofiledata(data)
      .then(result => {
        console.log("edited data result", result)
      })
      .catch(err => {
        console.log("err result edited", err)
      })
  }

  render() {
    let { imagePreviewUrl } = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />
    }
    return (
      <>
        <div className="ProfilePage">
          <h4>Profile picture</h4>
          <Form onSubmit={this.handleSubmit}>
            <div className="ProfilePicture">
              {/* <div className="form-group d-flex">
                {$imagePreview}
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={e => this.changehandler(e)}
                  id="image"
                />
              </div> */}
              <Form.File id="formcheck-api-custom" className="d-flex" custom>
                <div className="ProfilePictureDIV">{$imagePreview}</div>
                <Form.File.Input onChange={e => this.changehandler(e)} />
                <Form.File.Label data-browse="Button text">
                  <i className="fa fa-upload"></i>
                </Form.File.Label>
              </Form.File>
              {/* <Button type="submit" variant="dark">
                Upload
              </Button> */}
            </div>
          </Form>
          <h4>Personal details</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={this.state.firstname}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={this.state.lastname}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="ButtonWrap">
              <Button type="submit" variant="dark">
                Save
              </Button>
            </div>
          </form>
          <h4>Profiles</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Depop</label>
              <input
                type="text"
                name="depop"
                className="form-control"
                value={this.state.depop}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>eBay</label>
              <input
                type="text"
                name="eBay"
                className="form-control"
                value={this.state.eBay}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={this.state.facebook}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input
                type="text"
                name="instagram"
                className="form-control"
                value={this.state.instagram}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Grailed</label>
              <input
                type="text"
                name="grailed"
                className="form-control"
                value={this.state.grailed}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>StockX</label>
              <input
                type="text"
                name="stockX"
                className="form-control"
                value={this.state.stockX}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="ButtonWrap">
              <Button type="submit" variant="dark">
                Save
              </Button>
            </div>
          </form>
          <h4>Account</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="ButtonWrap">
              <Button type="submit" variant="dark">
                Save
              </Button>
            </div>
          </form>
        </div>
      </>
    )
  }
}
