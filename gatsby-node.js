// // exports.onCreatePage = ({ page, actions }) => {
// // createPage({
// //   path: `/sellerprofile/${id}`,
// //   component: path.resolve("./src/pages/sellerprofile.js"),
// // })

// //   const { createPage, deletePage } = actions
// //   if (page.path.match(/^\/sellerprofile/)) {
// //     page.matchPath = `/sellerprofile/*`

// //     createPage(page)
// //   }
// // }

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   console.log("page ===>", page)
//   console.log("page path ===>", page.path)

//   if (page.path.match(/^\/sellerprofile/)) {
//     createPage({
//       path: "/sellerprofile/*",
//       matchPath: "/sellerprofile/:id",
//       component: path.resolve(`./src/pages/sellerprofile.js`),
//     })
//   }
// }

// if (page.path.match(/^\/searchpage/)) {
//   page.matchPath = "/searchpage/:search"

//   // Update the page.
//   createPage(page)
// }

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/sellerprofile/)) {
    page.matchPath = "/sellerprofile/*"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/writereview/)) {
    page.matchPath = "/writereview/:profileID"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/emailverify/)) {
    page.matchPath = "/emailverify/:userId"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/resetpassword/)) {
    page.matchPath = "/resetpassword/:token"

    // Update the page.
    createPage(page)
  }
}
