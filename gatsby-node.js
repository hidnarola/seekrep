exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/sellerprofile/)) {
    page.matchPath = "/sellerprofile/*"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/searchpage/)) {
    page.matchPath = "/searchpage/:value"

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

  if (page.path.match(/^\/userprofile/)) {
    page.matchPath = "/userprofile/:username"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/admin\/edituser/)) {
    page.matchPath = "/admin/edituser/:id"

    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/admin\/userdetail/)) {
    page.matchPath = "/admin/userdetail/:id"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/admin\/deleteuser/)) {
    page.matchPath = "/admin/deleteuser/:id"

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/admin\/reviewdetails/)) {
    page.matchPath = "/admin/reviewdetails/:id"

    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/admin\/resetpassword/)) {
    page.matchPath = "/admin/resetpassword/:token"

    // Update the page.
    createPage(page)
  }
}
