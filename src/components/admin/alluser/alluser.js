import React from "react"
import { allUserSellers, ProfileApproveReject } from "../../../functions"
import { Table } from "reactstrap"
import { Link, navigate } from "gatsby"
import Pagination from "react-paginate"
import { Button, Form, Input } from "reactstrap"
import "./alluser.scss"
import swal from "sweetalert"

export default class AllUserSeller extends React.Component {
  state = {
    users: [],
    limit: "",
    totalPages: "",
    pageCount: "",
    totalRecord: 0,
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }

    allUserSellers()
      .then(result => {
        console.log("result all users", result)
        this.setState({
          users: result.data.requestData.alluser.data,
          pageCount: result.data.requestData.totalPages,
          totalRecord: result.data.requestData.alluser.totalrecods,
          limit: result.data.requestData.limit,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    const serach = {
      searchText: this.state.search,
    }
    allUserSellers(serach)
      .then(result => {
        console.log("result all users", result)
        this.setState({
          users: result.data.requestData.alluser.data,
          pageCount: result.data.requestData.totalPages,
          totalRecord: result.data.requestData.alluser.totalrecods,
          limit: result.data.requestData.limit,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  searchhandler = e => {
    e.preventDefault()
    const serach = {
      searchText: this.state.search,
    }
    allUserSellers(serach)
      .then(result => {
        console.log("result all users", result)
        this.setState({
          users: result.data.requestData.alluser.data,
          pageCount: result.data.requestData.totalPages,
          totalRecord: result.data.requestData.alluser.totalrecods,
          limit: result.data.requestData.limit,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  handlePageClick = page => {
    console.log("page no....", page)
    const pageno = page.selected + 1
    console.log("pageno", pageno)
    const pageNo = {
      page: page.selected + 1,
    }

    allUserSellers(pageNo)
      .then(result => {
        console.log("result all users", result)
        this.setState({
          users: result.data.requestData.alluser.data,
          pageCount: result.data.requestData.totalPages,
          totalRecord: result.data.requestData.alluser.totalrecods,
          limit: result.data.requestData.limit,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }
  appRejHandler = (e, id, status) => {
    e.preventDefault()
    const data = {
      id: id,
      status: status,
    }
    console.log("data", data)
    ProfileApproveReject(data)
      .then(result => {
        // console.log("result", result)
        if (result.data.status === 0) {
          swal(result.data.message)
        } else if (result.data.status === 2) {
          swal(result.data.message)
        } else if (result.data.status === 1) {
          swal(result.data.message).then(() => {
            allUserSellers()
              .then(result => {
                console.log("result all users", result)
                this.setState({
                  users: result.data.requestData.alluser.data,
                  pageCount: result.data.requestData.totalPages,
                  totalRecord: result.data.requestData.alluser.totalrecods,
                  limit: result.data.requestData.limit,
                })
              })
              .catch(err => {
                console.log("err", err)
              })
          })
        }
      })
      .catch(error => {
        console.log("errorr", error)
      })
  }
  render() {
    let { limit, totalPages } = this.state
    return (
      <div>
        <div className="searchbox">
          <Form onSubmit={e => this.searchhandler(e)} className="serchform">
            <Input
              type="text"
              name="search"
              onChange={e => this.changeHandler(e)}
            />
            <Button>Search</Button>
          </Form>
        </div>

        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Reviews</th>
              <th>Profile Verified</th>
              <th>Aprrove/Reject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users ? (
              this.state.users &&
              this.state.users.map((user, key) => (
                <tr>
                  <td>{key + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.reviewDetails.length} Reviews</td>
                  <td>{user.profileVerified ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      onClick={e => this.appRejHandler(e, user._id, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={e => this.appRejHandler(e, user._id, "reject")}
                    >
                      Reject
                    </Button>
                  </td>
                  <td>
                    <span className="edit">
                      <Link to={`/admin/edituser/${user._id}`}>
                        <i class="fa fa-edit"></i>
                      </Link>
                    </span>
                    <span className="delete">
                      <Link to={`/admin/deleteuser/${user._id}`}>
                        <i class="fa fa-trash"></i>
                      </Link>
                    </span>
                    <span>
                      <Link to={`/admin/userdetail/${user._id}`}>
                        <i class="fa fa-info-circle"></i>
                      </Link>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <p>No records found</p>
            )}
          </tbody>
        </Table>
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
            pageRangeDisplayed={limit}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={""}
            activeClassName={"active"}
          />
        </div>
      </div>
    )
  }
}
