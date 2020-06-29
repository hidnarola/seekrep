import React from "react"
import { adminAddUser } from "../../../functions"
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap"
import { navigate } from "gatsby"
import swal from "sweetalert"
import { Helmet } from "react-helmet"

export default class AddUser extends React.Component {
  state = {
    users: [],
    file: "",
    email: "",
    password: "",
    firstName: "",
    lastname: "",
    countryname: "",
    profileimage: "",
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
      password: this.state.password,
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

    adminAddUser(data)
      .then(result => {
        if (result.data.register_resp.status === 1) {
          swal(result.data.register_resp.message).then(() => {
            navigate("/admin/allusers")
          })
        } else if (result.data.register_resp.status === 0) {
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add User</title>
        </Helmet>
        <h4 className="admin-title">Add User</h4>
        <Form onSubmit={e => this.handleSubmit(e)} className="edituserform">
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter Your Email"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
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
                  placeholder="Enter Your Frist Name"
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
                  placeholder="Enter Your Last Name"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="">Country Name</Label>
                <Input
                  type="text"
                  name="countryname"
                  placeholder="Enter Your Country Name"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
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
                <Label for="">Depop</Label>
                <Input
                  type="text"
                  name="depop"
                  placeholder="Enter Your Depop"
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
                  placeholder="Enter Your eBay"
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
                  placeholder="Enter Your Facebook"
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
                  placeholder="Enter Your Instagram"
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
                  placeholder="Enter Your Grailed"
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
                  placeholder="Enter Your StockX"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button>Add User</Button>
        </Form>
      </div>
    )
  }
}
