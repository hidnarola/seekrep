import axios from "axios"
import { argsToArgsConfig } from "graphql/type/definition"
const url = process.env.SERVER_API

export function fetchSignUp() {
  axios
    .get(`${process.env.GATSBY_SERVER_API}product/list`)
    .then(res => console.log("res.....", res))
    .catch(err => {
      console.log("err....", err)
    })
}

export function createuser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}signup`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function verifymailid(id) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}email_verify/${id}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function loginuser(login_data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}login`, login_data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function geteditprofile(id) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/editprofile`, id)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function editprofiledata(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/editprofiledata`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function forgotpassworduser(email) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}forgot_password`, email)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function changepassworduser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}change_password`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function resetpasswordfunc(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}reset_password`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function getReviewsById(finalId, page) {
  return axios
    .post(
      `${process.env.GATSBY_SERVER_API}review/profileReview/${finalId}`,
      page
    )
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
export function getReviewChartDetail(id) {
  return axios
    .get(`${process.env.GATSBY_SERVER_API}review/ratingdetails/${id}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function googleLogin(accessToken) {
  const tokenBlob = new Blob(
    [JSON.stringify({ access_token: accessToken }, null, 2)],
    { type: "application/json" }
  )

  const options = {
    method: "POST",
    body: tokenBlob,
    mode: "cors",
    cache: "default",
  }
  return fetch(`${process.env.GATSBY_SERVER_API}auth/google`, options).then(
    r => {
      // console.log("token google front", token)
      // r.json().then(user => {
      //   console.log("user google", user)
      //   const token = user.token
      //   return user
      //   // console.log("token", token)
      //   // if (token) {
      //   //   console.info("--------------------------")
      //   //   console.info("token google login =>", token)
      //   //   console.info("--------------------------")
      //   //   return user, token
      //   // }
      // })
      return r.json()
    }
  )
}

export function facebookLogin(accessToken) {
  const tokenBlob = new Blob(
    [JSON.stringify({ access_token: accessToken }, null, 2)],
    { type: "application/json" }
  )

  // const tokenBlob = { access_token: accessToken }
  const options = {
    method: "POST",
    body: tokenBlob,
    mode: "cors",
    cache: "default",
  }
  return fetch(`${process.env.GATSBY_SERVER_API}auth/facebook`, options).then(
    r => {
      // const token = r.headers.get("x-auth-token")
      // r.json()
      //   .then(user => {
      //     console.log("user fb", user)
      //     if (token) {
      //       return user, token
      //     }
      //   })
      //   .catch(err => {
      //     console.log("err", err)
      //   })
      // r.json().then(res => {
      //   console.info("--------------------------")
      //   console.info("res =>", res)
      //   console.info("--------------------------")
      //   return res
      // })
      return r.json()
    }
  )
}

export function profileDetail() {
  return axios
    .get(`${process.env.GATSBY_SERVER_API}users/editprofile/:id`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function getDataById(id) {
  return axios
    .get(`${process.env.GATSBY_SERVER_API}users/sellerprofile/${id}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function getalluser(pageno) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/alluserreview`, pageno)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function searchuser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/search`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function reviewpost(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}review/addreview`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function adminLogin(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/login`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function adminForgotPassword(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/forgot_password`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function adminResetPassword(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/reset_password`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function allUserSellers(pageNo, serach) {
  return axios
    .post(
      `${process.env.GATSBY_SERVER_API}admin/allusersellers`,
      pageNo,
      serach
    )
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function adminAddUser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/adminadduser`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function getProfileDetail(id) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/profiledata`, id)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function getUserById(id) {
  return axios
    .get(`${process.env.GATSBY_SERVER_API}admin/edituser/${id}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function editUseData(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/edituserdata`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function deleteUseData(id) {
  return axios
    .delete(`${process.env.GATSBY_SERVER_API}admin/deleteuser/${id}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function allReviewsAdmin(pageNo) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/allreviews`, pageNo)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function ReviewDetailsById(id) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/profileReview/${id}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

export function ProfileApproveReject(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}admin/profile_verify`, data)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
