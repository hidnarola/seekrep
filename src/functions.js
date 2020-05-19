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
    .post(`${process.env.GATSBY_SERVER_API}email_verify`, id)
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
      console.log("res.....", res)
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
      console.log("res get edit profile", res)
      return res
    })
    .catch(err => {
      console.log("err get profile", err)
    })
}

export function editprofiledata(data, id) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/editprofiledata`, data, id)
    .then(res => {
      console.log("res edited data", res)
      return res
    })
    .catch(err => {
      console.log("err edited data", err)
      return err
    })
}

export function forgotpassworduser(email) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}forgot_password`, email)
    .then(res => {
      console.log("res...", res)
      return res
    })
    .catch(err => {
      console.log("errorrrr", err)
    })
}

export function changepassworduser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}change_password`, data)
    .then(res => {
      console.log("res...", res)
      return res
    })
    .catch(err => {
      console.log("errorrrr", err)
    })
}

export function resetpasswordfunc(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}reset_password`, data)
    .then(res => {
      console.log("res...reset pass", res)
      return res
    })
    .catch(err => {
      console.log("errr", err)
    })
}

export function getReviewsById(finalId) {
  console.log("finalId", finalId)
  return axios
    .post(`${process.env.GATSBY_SERVER_API}review/profileReview/${finalId}`)
    .then(res => {
      console.log("res profile id", res)
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
  console.log("g tokenBolb", tokenBlob)
  const options = {
    method: "POST",
    body: tokenBlob,
    mode: "cors",
    cache: "default",
  }
  return fetch(`${process.env.GATSBY_SERVER_API}auth/google`, options).then(
    r => {
      console.log("r google", r)
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
  console.log("token blob", tokenBlob)
  // const tokenBlob = { access_token: accessToken }
  const options = {
    method: "POST",
    body: tokenBlob,
    mode: "cors",
    cache: "default",
  }
  return fetch(`${process.env.GATSBY_SERVER_API}auth/facebook`, options).then(
    r => {
      console.log("fb r", r)
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
      console.log("res...", res)
      return res
    })
    .catch(err => {
      console.log("errorrrr", err)
    })
}

export function getDataById(id) {
  console.log("id", id)
  return axios
    .get(`${process.env.GATSBY_SERVER_API}users/sellerprofile/${id}`)
    .then(res => {
      console.log("res....", res)
      return res
    })
    .catch(err => {
      console.log("err..", err)
      return err
    })
}

export function getalluser(pageno) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/alluser`, pageno)
    .then(res => {
      console.log("res.. all user..", res)
      return res
    })
    .catch(err => {
      console.log("err...all user", err)
      return err
    })
}

export function searchuser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}users/search`, data)
    .then(res => {
      console.log("res.. all user..", res)
      return res
    })
    .catch(err => {
      console.log("err...all user", err)
      return err
    })
}

export function reviewpost(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}review/addreview`, data)
    .then(res => {
      console.log("res review post", res)
      return res
    })
    .catch(err => {
      console.log("err review post", err)
      return err
    })
}
