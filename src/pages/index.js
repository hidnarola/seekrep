import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import About from "../components/about/about"
import Seachbox from "../components/searchbox/searchbox"
import Verifyapp from "../components/verifyapp/verifyapp"
import Feateredseller from "../components/featuredseller/featuredseller"

const IndexPage = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Home</title>
    </Helmet>
    <Layout>
      <SEO title="Home" />
      <Seachbox />
      <About />
      <Verifyapp />
      <Feateredseller />
    </Layout>
  </>
)
export default IndexPage
