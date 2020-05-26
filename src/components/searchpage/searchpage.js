import React from "react"
import { Button, Alert } from "react-bootstrap"
import { getalluser, searchuser } from "../../functions"
import StartIcon from "../../images/start.png"
import defualtImg from "../../images/default.png"
import "./searchpage.scss"
import { Link } from "gatsby"
import Pagination from "react-paginate"
import Loader from "../spinner/spinner"
import Rating from "react-rating"

export default class Search extends React.Component {
  state = {
    search: "",
    users: [],
    pageCount: "",
    perPageLimit: "",
    totalPages: "",
    loader: false,
  }

  componentDidMount() {
    console.log("Search", this.props.props.value)
    this.setState({ loader: true })

    getalluser()
      .then(result => {
        console.log("gat all user result", result)
        this.setState({
          users: result.data.requestData.alluser.data,
          perPageLimit: result.data.requestData.limit,
          pageCount: result.data.requestData.totalPages,
          loader: false,
          search: this.props.props.value,
        })
        if (!result.data.users) {
          this.setState({
            users: null,
            loader: false,
            search: this.props.props.value,
          })
        }
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  handlePageClick = page => {
    const pageno = page.selected + 1
    console.log("pageno", pageno)
    const pageNo = {
      pageno: pageno,
    }
    getalluser(pageNo)
      .then(result => {
        console.log("gat all user result", result)
        this.setState({
          users: result.data.requestData.alluser.data,
          perPageLimit: result.data.requestData.limit,
          pageCount: result.data.requestData.totalPages,
          loader: false,
          search: this.props.props.value,
        })
        if (!result.data.requestData.alluser.data) {
          this.setState({
            users: null,
            loader: false,
            search: this.props.props.value,
          })
        }
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  handleInputChange = async event => {
    // const target = event.target
    // const value = target.value
    // const name = target.name
    this.setState({
      [event.target.name]: event.target.value,
    })

    console.log("ssi event==>", event.target.value)
    //   await searchuser(event.target.value)
    //     .then(res => {
    //       console.log("ssi result....", res.data.users.data)
    //       console.log("ssi result res ....", res)
    //       this.setState({ users: res.data.users.data })
    //     })
    //     .catch(err => console.log(err))
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log("submit serach value", this.state.search)
    const data = {
      search: this.state.search,
    }
    console.log("data....", data)
    // if (!this.state.search) {
    //   this.setState({ users: this.state.users })
    // }
    await searchuser({ search: this.state.search })
      .then(res => {
        this.setState({ users: res.data.users.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    let { perPageLimit, totalPages, loader } = this.state
    return (
      <div className="row">
        {loader ? (
          <Loader />
        ) : (
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
                    value={this.state.search}
                  />
                </div>
                <Button type="submit" variant="dark">
                  Search
                </Button>
              </form>
            </div>
            <div class="userlist">
              {console.log("userdetails", this.state.users)}
              {this.state.users ? (
                this.state.users &&
                this.state.users.map(user => (
                  <div className="user-info">
                    <div className="left">
                      <div className="img">
                        <img
                          src={
                            user.profileimage ? user.profileimage : defualtImg
                          }
                        />
                      </div>
                      <div className="content">
                        <h5>
                          <Link to={`/sellerprofile/${user._id}`}>
                            {user.firstName}
                            {user.lastName}
                          </Link>
                        </h5>
                        <div className="review-text">
                          {user.reviewDetails.length} reviews
                        </div>
                        <p>{user.countryname}</p>
                      </div>
                    </div>
                    <div className="reting-box ml-auto">
                      <Rating
                        initialRating={Math.round(user.avgRating)}
                        readonly="true"
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No data Found</p>
              )}
            </div>
            <div className="pagination-box">
              <Pagination
                initialPage={0}
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                pageClassName={"page-item"}
                previousClassName={"page-item"}
                pageLinkClassName={"page-link"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={totalPages}
                pageRangeDisplayed={perPageLimit}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={""}
                activeClassName={"active"}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
