import React from "react"
import { navigate } from "gatsby"
import swal from "sweetalert"

export default class Logout extends React.Component {
  componentDidMount() {
    localStorage.clear()
    swal({
      title: "Log out",
      text: "You have sucessfully logged out",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      buttons: false,
    }).then(dismiss => {
      if (dismiss === "timer") {
        console.log("I was closed by the timer")
      }
    })
    setTimeout(() => {
      navigate("/")
    }, 2000)
    // navigate("/")
    // localStorage.clear()
  }
  render() {
    return <div className="logout-content"></div>
  }
}
