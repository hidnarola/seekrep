import { Container, Row, Col, Button } from "react-bootstrap"
import React from "react"
import "./searchbox.scss"
import { navigate } from "gatsby"

export default class Searchbox extends React.Component {
  state = {
    search: "",
  }

  changeHandler = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log("search", this.state.search)
  }

  handleSubmit = e => {
    e.preventDefault()
    navigate("/searchpage")
    console.log("clicked")
  }

  render() {
    return (
      <section className="search-bg">
        <Container>
          <Row>
            <Col xs="12" lg="8" className="mx-auto text-center">
              <h1>Behind every seller is a story that matters</h1>
              <p>Read reviews. Write reviews. Get peace of mind.</p>
              <form className="search-box" onSubmit={this.handleSubmit}>
                <label>Search for a full name or username</label>
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  onChange={e => this.changeHandler(e)}
                />
                <Button variant="dark" onClick={this.handleSubmit}>
                  Search
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}
