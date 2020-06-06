import React from "react"
import { Button, Alert, Form } from "react-bootstrap"
import { profileImg } from "../../images/verify-img.png"
import {
  geteditprofile,
  editprofiledata,
  changepassworduser,
} from "../../functions"
import "./editprofile.scss"
import swal from "sweetalert"

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: "",
      imagePreviewUrl: "",
      firstname: "",
      lastname: "",
      countryname: "",
      depop: "",
      eBay: "",
      facebook: "",
      instagram: "",
      grailed: "",
      stockX: "",
      email: "",
      password: "",
      showUpdatePasswordAlert: false,
      message: "",
    }
  }
  componentDidMount() {
    const userid = localStorage.getItem("id")
    const id = {
      userId: userid,
    }
    geteditprofile(id)
      .then(result => {
        console.log("result get prfile", result)
        console.log("first name", result.data.user.data.firstName)
        this.setState({
          firstname: result.data.user.data.firstName,
          lastname: result.data.user.data.lastName,
          email: result.data.user.data.email,
          countryname: result.data.user.data.countryname,
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

    const allowExtension = ["image/jpg", "image/jpeg", "image/png"]
    const fileType = file.type
    if (!allowExtension.includes(fileType)) {
      document.getElementById("file_type_error").innerHTML =
        "Invalid file type (Only jpg, jpeg and png file are allowed)"
    } else {
      document.getElementById("file_type_error").innerHTML = ""
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        })
      }

      reader.readAsDataURL(file)
    }
    // if (file.type === ("image/jpg" || "image/jpeg" || "image/png")) {
    //   document.getElementById("file_type_error").innerHTML = ""

    //   // document.getElementById("file_type_error").innerHTML = ""
    // } else {
    //   document.getElementById("file_type_error").innerHTML =
    //     "Invalid file type (Only jpg, jpeg and png file are allowed)"
    // }
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log("State data =>", this.state)
    // const allowExtension = ["image/jpg", "image/jpeg", "image/png"]
    // const fileType = this.state.file.type
    // if (this.state.imagePreviewUrl === "") {
    //   document.getElementById("file_type_error").innerHTML =
    //     "Please your profile pic"
    // } else if (
    //   this.state.imagePreviewUrl === "" &&
    //   !allowExtension.includes(fileType)
    // ) {
    //   document.getElementById("file_type_error").innerHTML =
    //     "Invalid file type (Only jpg, jpeg and png file are allowed)"
    // } else {
    //   document.getElementById("file_type_error").innerHTML = ""

    const data = {
      firstName: this.state.firstname ? this.state.firstname : "",
      lastName: this.state.lastname ? this.state.lastname : "",
      countryname: this.state.countryname ? this.state.countryname : "",
      depop: this.state.depop ? this.state.depop : "",
      eBay: this.state.eBay ? this.state.eBay : "",
      facebook: this.state.facebook ? this.state.facebook : "",
      instagram: this.state.instagram ? this.state.instagram : "",
      grailed: this.state.grailed ? this.state.grailed : "",
      stockX: this.state.stockX ? this.state.stockX : "",
      profileimage: this.state.imagePreviewUrl
        ? this.state.imagePreviewUrl
        : "",
      id: localStorage.getItem("id"),
    }

    console.log("submit data", data)
    await editprofiledata(data)
      .then(result => {
        console.log("edited data result", result)
        if (result.data.status === 1) {
          swal(result.data.message).then(() => {
            const userid = localStorage.getItem("id")
            const id = {
              userId: userid,
            }
            geteditprofile(id)
              .then(result => {
                console.log("result get prfile", result)
                console.log("first name", result.data.user.data.firstName)
                this.setState({
                  firstname: result.data.user.data.firstName,
                  lastname: result.data.user.data.lastName,
                  email: result.data.user.data.email,
                  countryname: result.data.user.data.countryname,
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
          })
        }
      })
      .catch(err => {
        console.log("err result edited", err)
      })
  }

  handleSubmitAccount = async event => {
    event.preventDefault()
    console.info("--------------------------")
    console.info("handkeAccount Submit call =>")
    console.info("--------------------------")
    const data = {
      email: this.state.email,
      password: this.state.password,
      token: localStorage.getItem("login-token"),
    }
    let resp = await changepassworduser(data)
    console.log("C P =>", resp)
    if (resp.data.status === 1 || resp.data.status === 0) {
      this.setState({
        status: resp.data.status,
        message: resp.data.message,
        showUpdatePasswordAlert: true,
      })
    }
    console.info("--------------------------")
    console.info("resp =>", resp)
    console.info("--------------------------")
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
          <Form onSubmit={event => this.handleSubmit(event)}>
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
                <Form.File.Label data-browse="UPLOAD">
                  <i className="fa fa-upload"></i>
                </Form.File.Label>
              </Form.File>
              <span style={{ color: "red" }} id="file_type_error"></span>
              {/* <Button type="submit" variant="dark">
                Upload
              </Button> */}
            </div>
          </Form>
          <h4>Personal details</h4>
          <form onSubmit={event => this.handleSubmit(event)}>
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
            <div className="form-group">
              <label>Country Name</label>
              <input
                type="text"
                name="countryname"
                className="form-control"
                value={this.state.countryname}
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
          <form onSubmit={event => this.handleSubmit(event)}>
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
          <form onSubmit={event => this.handleSubmitAccount(event)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleInputChange}
                readOnly
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
            {this.state.showUpdatePasswordAlert && (
              <div className="form-group">
                <Alert variant={this.state.status === 1 ? "success" : "danger"}>
                  {" "}
                  {this.state.message}
                </Alert>
              </div>
            )}
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
