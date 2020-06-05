import React from "react"
import { editUseData, getUserById } from "../../../functions"
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap"
import { navigate } from "gatsby"
import swal from "sweetalert"
import defaultImg from "../../../images/default.png"
import "./edituser.scss"

export default class EditUser extends React.Component {
  state = {
    users: [],
    email: "",
    firstName: "",
    lastname: "",
    profileimage: "",
    file: "",
    countryname: "",
    depop: "",
    eBay: "",
    facebook: "",
    instagram: "",
    grailed: "",
    stockX: "",
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }

    console.log("props", this.props)
    const id = this.props.props.id
    getUserById(id)
      .then(result => {
        console.log("result all users", result)
        this.setState({
          email: result.data.user.data.email,
          countryname: result.data.user.data.countryname,
          profileimage: result.data.user.data.profileimage,
          //   password: result.data.user.data.password,
          firstName: result.data.user.data.firstName,
          lastname: result.data.user.data.lastName,
          depop: result.data.user.data.depop,
          eBay: result.data.user.data.eBay,
          facebook: result.data.user.data.facebook,
          instagram: result.data.user.data.instagram,
          grailed: result.data.user.data.grailed,
          stockX: result.data.user.data.stockX,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  filechangehandler = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        profileimage: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      email: this.state.email,
      id: this.props.props.id,
      firstName: this.state.firstName,
      lastName: this.state.lastname,
      countryname: this.state.countryname,
      profileimage: this.state.profileimage,
      depop: this.state.depop,
      eBay: this.state.eBay,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      grailed: this.state.grailed,
      stockX: this.state.stockX,
    }
    console.log("data", data)
    editUseData(data)
      .then(result => {
        console.log("result submit", result)
        if (result.data.status === 1) {
          swal(result.data.message).then(() => {
            navigate("/admin/allusers")
          })
        } else if (result.data.status === 0) {
          swal(result.data.message)
        }
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  render() {
    return (
      <div>
        <h4>Edit user</h4>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Row>
            <Col md={6} className="profileimgbox">
              <img
                src={
                  this.state.profileimage ? this.state.profileimage : defaultImg
                }
              />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">Profile Image</Label>
                <Input
                  type="file"
                  name="profileimage"
                  placeholder="Enter Profile Image"
                  onChange={e => this.filechangehandler(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  value={this.state.email}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">Country Name</Label>
                <Input
                  type="text"
                  name="countryname"
                  placeholder="countryname "
                  value={this.state.countryname}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="enter frist name"
                  value={this.state.firstName}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Enter Last name"
                  value={this.state.lastname}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="">Depop</Label>
                <Input
                  type="text"
                  name="depop"
                  placeholder="enter Depop"
                  value={this.state.depop}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">eBay</Label>
                <Input
                  type="text"
                  name="eBay"
                  placeholder="Enter Last name"
                  value={this.state.eBay}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Facebook</Label>
                <Input
                  type="text"
                  name="facebook"
                  placeholder="enter Facebook"
                  value={this.state.facebook}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Instagram</Label>
                <Input
                  type="text"
                  name="instagram"
                  placeholder="Enter Instagram"
                  value={this.state.instagram}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Grailed</Label>
                <Input
                  type="text"
                  name="grailed"
                  placeholder="enter Grailed"
                  value={this.state.grailed}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">StockX</Label>
                <Input
                  type="text"
                  name="stockX"
                  placeholder="Enter StockX"
                  value={this.state.stockX}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button>Edit User</Button>
        </Form>
      </div>
    )
  }
}