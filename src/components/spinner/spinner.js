import React from "react"
import { Spinner } from "react-bootstrap"

const Loader = () => (
  <div className="col-12">
    <div className="loding-boxs">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  </div>
)

export default Loader
