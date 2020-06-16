import React from "react"
import { Button } from "react-bootstrap"
import { getalluser } from "../../functions"
import defualtImg from "../../images/default.png"
import "./searchpage.scss"
import { Link } from "gatsby"
import Pagination from "react-paginate"
import Loader from "../spinner/spinner"
import Rating from "react-rating"
import { Helmet } from "react-helmet"

export default class Search extends React.Component {
  state = {
    search: "",
    users: [],
    pageCount: "",
    perPageLimit: "",
    totalPages: "",
    totalRecord: 0,
    loader: false,
  }

  componentDidMount() {
    this.setState({ loader: true })

    // DM
    const data = {
      page: 1,
      searchText: this.props.props.value,
    }

    getalluser(data)
      .then(result => {
        this.setState({
          users: result.data.requestData.alluser.data,
          perPageLimit: result.data.requestData.limit,
          pageCount: result.data.requestData.totalPages,
          totalRecord: result.data.requestData.alluser.totalrecods,
          loader: false,
          search: this.props.props.value,
        })
        /** Remove by dm */
        // if (!result.data.users) {
        //   console.log('Yes its come here')
        //   this.setState({
        //     users: null,
        //     loader: false,
        //     search: this.props.props.value,
        //   })
        // }
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  handlePageClick = page => {
    const pageno = page.selected + 1

    // const pageNo = {
    //   pageno: pageno,
    // }

    // Dm
    const data = {
      page: pageno,
      searchText: this.state.search, // DM
    }
    // getalluser(pageNo)
    getalluser(data)
      .then(result => {
        this.setState({
          users: result.data.requestData.alluser.data,
          perPageLimit: result.data.requestData.limit,
          pageCount: result.data.requestData.totalPages,
          totalRecord: result.data.requestData.alluser.totalrecods,
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

    if (event.target.value !== "") {
      document.getElementById("search2_error").innerHTML = ""
    } else {
      document.getElementById("search2_error").innerHTML =
        "Please enter name to search"
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    // Dm
    if (this.state.search === "") {
      document.getElementById("search2_error").innerHTML =
        "Please enter name to search"
    } else {
      document.getElementById("search2_error").innerHTML = ""
      const data = {
        page: 1,
        searchText: this.state.search, // DM
      }
      getalluser(data)
        .then(result => {
          console.log("gat all user result", result)
          this.setState({
            users: result.data.requestData.alluser.data,
            perPageLimit: result.data.requestData.limit,
            pageCount: result.data.requestData.totalPages,
            totalRecord: result.data.requestData.alluser.totalrecods,
            loader: false,
            // search: this.props.props.value,
            search: this.state.search,
          })
          if (!result.data.requestData.alluser.data) {
            this.setState({
              users: null,
              loader: false,
              // search: this.props.props.value,
              search: this.state.search,
            })
          }
        })
        .catch(error => {
          console.log("error", error)
        })
    }
  }

  render() {
    let { perPageLimit, totalPages, loader } = this.state
    return (
      <div className="row">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Search Page</title>
        </Helmet>
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
                <span style={{ color: "red" }} id="search2_error"></span>
                <Button type="submit" variant="dark">
                  Search
                </Button>
              </form>
            </div>
            <div class="userlist">
              {this.state.users && this.state.users.length > 0 ? (
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
                            {user.firstName} {user.lastName}
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
                <p>No record available</p>
              )}
            </div>
            {this.state.totalRecord > 10 ? (
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
                  // onPageChange={() => this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={""}
                  activeClassName={"active"}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
