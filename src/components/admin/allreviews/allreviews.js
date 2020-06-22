import React from "react"
import { allReviewsAdmin } from "../../../functions"
import { Table } from "reactstrap"
import * as moment from "moment"
import Rating from "react-rating"
import { Link, navigate } from "gatsby"
import Pagination from "react-paginate"
import Spinner from "../../spinner/spinner"

export default class AllReviews extends React.Component {
  state = {
    reviews: [],
    limit: "",
    totalPages: "",
    pageCount: "",
    totalRecord: 0,
    loader: false,
  }
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }
    this.setState({ loader: true })
    allReviewsAdmin()
      .then(result => {
        console.log("compo result", result)
        this.setState({
          reviews: result.data.requestData.review,
          totalRecord: result.data.requestData.totalRecord,
          pageCount: result.data.requestData.totalPages,
          limit: result.data.requestData.limit,
          loader: false,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  handlePageClick = page => {
    const pageno = page.selected + 1

    const pageNo = {
      page: pageno,
    }
    // this.setState({ loader: true })
    allReviewsAdmin(pageNo)
      .then(result => {
        console.log("page result", result)
        this.setState({
          reviews: result.data.requestData.review,
          totalRecord: result.data.requestData.totalRecord,
          pageCount: result.data.requestData.totalPages,
          limit: result.data.requestData.limit,
          loader: false,
        })
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  render() {
    let { limit, totalPages } = this.state
    return (
      <div>
        {this.state.loader ? (
          <Spinner />
        ) : (
          <>
            <h4 className="admin-title">All Reviews</h4>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>To</th>
                  <th>From</th>
                  <th>Ratings</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reviews &&
                  this.state.reviews.map((review, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>
                        <Link
                          to={`/admin/reviewdetails/${review.reviews_details._id}`}
                        >
                          {review.reviews_details.firstName}
                          {review.reviews_details.lastName}
                        </Link>
                      </td>
                      <td>
                        {review.creator_details.firstName}{" "}
                        {review.creator_details.lastName}
                      </td>
                      <td>
                        <Rating
                          initialRating={review.rating}
                          readonly="true"
                          emptySymbol="fa fa-star-o fa-2x"
                          fullSymbol="fa fa-star fa-2x"
                        />
                      </td>
                      <td>{moment(review.createdAt).format("LL")}</td>
                    </tr>
                  ))}
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
          </>
        )}
      </div>
    )
  }
}
