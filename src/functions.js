import axios from "axios"
const url = process.env.SERVER_API

export function fetchSignUp() {
  axios
    .get(`${process.env.GATSBY_SERVER_API}/product/list`)
    .then(res => console.log("res.....", res))
    .catch(err => {
      console.log("err....", err)
    })
}

export function createuser(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}/signup`, data)
    .then(res => {
      console.log("res.....", res)
      console.log("message...", res.data.message)
      if (res.data.status === 0) {
        return res.data.message
      } else if (res.data.status === 1) {
        window.location = "/"
      } else {
        return res.data.message
      }
    })
    .catch(err => {
      return err
    })
}

export function loginuser(login_data) {
  console.log("HOST login", process.env.SERVER_API)
  return axios
    .post(`${process.env.GATSBY_SERVER_API}/login`, login_data)
    .then(res => {
      console.log("res.....", res)
      console.log("message...", res.data.message)
      if (res.data.status === 0) {
        return res.data.message
      } else if (res.data.status === 1) {
        return res.data.message
      } else {
        return res.data.message
      }
    })
    .catch(err => {
      return err
    })
}

export function geteditprofile() {
  return axios
    .get(`${process.env.GATSBY_SERVER_API}/users/editprofile`)
    .then(res => {
      console.log("res get edit profile", res)
      return res
    })
    .catch(err => {
      console.log("err get profile", err)
    })
}

export function editprofiledata(data) {
  return axios
    .post(`${process.env.GATSBY_SERVER_API}/users/editprofiledata`, data)
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
    .post(`${process.env.GATSBY_SERVER_API}/forgot_password`, email)
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
    .post(`${process.env.GATSBY_SERVER_API}/reset_password`, data)
    .then(res => {
      console.log("res...reset pass", res)
      return res
    })
    .catch(err => {
      console.log("errr", err)
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
  return fetch(`${process.env.GATSBY_SERVER_API}/auth/google`, options).then(
    r => {
      console.log("r google", r)
      const token = r.headers.get("x-auth-token")
      console.log("token google front", token)
      r.json().then(user => {
        console.log("user google", user)
        // console.log("token", token)
        if (token) {
          return user, token
        }
      })
    }
  )
}

export function facebookLogin(accessToken) {
  const tokenBlob = new Blob(
    [JSON.stringify({ access_token: accessToken }, null, 2)],
    { type: "application/json" }
  )
  console.log("token blob", tokenBlob)
  const options = {
    method: "POST",
    body: tokenBlob,
    mode: "cors",
    cache: "default",
  }
  fetch(`${process.env.GATSBY_SERVER_API}/auth/facebook`, options).then(r => {
    console.log("fb r", r)
    const token = r.headers.get("x-auth-token")
    r.json()
      .then(user => {
        console.log("user fb", user)
        if (token) {
          return user, token
        }
      })
      .catch(err => {
        console.log("err", err)
      })
  })
}

export function profileDetail() {
  return axios
    .get("http://localhost:3000/users/editprofile")
    .then(res => {
      console.log("res...", res)
      return res
    })
    .catch(err => {
      console.log("errorrrr", err)
    })
}

export function getalluser() {
  return axios
    .get(`${process.env.GATSBY_SERVER_API}/users/alluser`)
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
    .post(`${process.env.GATSBY_SERVER_API}/users/search`, data)
    .then(res => {
      console.log("res.. all user..", res)
      return res
    })
    .catch(err => {
      console.log("err...all user", err)
      return err
    })
}
