import React from "react"
import { deleteUseData } from "../../../functions"
import { Table } from "reactstrap"
import { navigate } from "gatsby"
import swal from "sweetalert"

export default class DeleteUser extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem("admintoken")) {
      navigate("/admin/login")
    }

    console.log("delete id", this.props.props.id)
    const id = this.props.props.id
    deleteUseData(id)
      .then(result => {
        console.log("result all users", result)
        if (result.data.status === 1) {
          swal(result.data.message).then(() => {
            navigate("/admin/allusers")
          })
        }
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  render() {
    return <div></div>
  }
}
