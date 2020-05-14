import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import About from "../components/about/about"
import Seachbox from "../components/searchbox/searchbox"
import Verifyapp from "../components/verifyapp/verifyapp"
import Feateredseller from "../components/featuredseller/featuredseller"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Seachbox />
    <About />
    <Verifyapp />
    <Feateredseller />
  </Layout>
)
export default IndexPage
