import React from "react"
import { Button, Alert } from "react-bootstrap"
import { getalluser, searchuser } from "../../functions"
import StartIcon from "../../images/start.png"
import "./searchpage.scss"

export default class Search extends React.Component {
  state = {
    search: "",
    users: [],
  }

  componentDidMount() {
    getalluser()
      .then(result => {
        console.log("gat al*l user result", result)
        this.setState({ users: result.data.users })
        console.log("users array", this.state.users)
      })
      .catch(error => {
        console.log("error", error)
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
  handleSubmit = async event => {
    event.preventDefault()
    console.log("submit serach value", this.state.search)
    const data = {
      search: this.state.search,
    }
    console.log("data....", data)
    await searchuser(data)
      .then(res => {
        console.log("result....", res.data.users.data)
        this.setState({ users: res.data.users.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="searchbox">
            <h4>Search results for "{this.state.search}"</h4>
            <form className="search-box" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  onChange={this.handleInputChange}
                />
              </div>
              <Button type="submit" variant="dark">
                Search
              </Button>
            </form>
          </div>
          <div class="userlist">
            {this.state.users ? (
              this.state.users &&
              this.state.users.map(user => (
                <div className="user-info">
                  <div className="left">
                    <div className="img">
                      <img src={user.profileimage} />
                    </div>
                    <div className="content">
                      <h5>
                        {user.firstName} {user.lastName}
                      </h5>
                      <div className="review-text">8 reviews</div>
                      <p>London, UK</p>
                    </div>
                  </div>
                  <div className="reting-box ml-auto">
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" />
                    <img src={StartIcon} alt="" className="opacity15" />
                  </div>
                </div>
              ))
            ) : (
              <p>No data Found</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}
