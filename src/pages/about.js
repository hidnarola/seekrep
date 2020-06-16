import React from "react"
import Layout from "../components/layout/layout"
import About from "../components/about/about"
import { Helmet } from "react-helmet"

const AboutPage = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About</title>
    </Helmet>
    <Layout>
      <About />
    </Layout>
  </>
)
export default AboutPage
