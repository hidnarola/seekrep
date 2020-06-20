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

    if (e.target.value !== "") {
      document.getElementById("search_error").innerHTML = ""
    } else {
      document.getElementById("search_error").innerHTML =
        "Please enter name to search"
    }
  }
  keyDownHandler = e => {
    var field = document.querySelector('[name="search"]')

    field.onkeypress = e => {
      if (e.which === 32 && !e.target.value.length) e.preventDefault()
      if (
        e.which < 48 ||
        (e.which > 57 && e.which < 65) ||
        (e.which > 90 && e.which < 97) ||
        e.which > 122
      ) {
        e.preventDefault()
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const search = this.state.search

    if (search !== "") {
      document.getElementById("search_error").innerHTML = ""
      navigate(`/searchpage/${search}`)
    } else {
      document.getElementById("search_error").innerHTML =
        "Please enter name to search"
    }
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
                <div>
                  <label>Search for a full name or username</label>
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    id="test"
                    onChange={e => this.changeHandler(e)}
                    onKeyDown={e => this.keyDownHandler(e)}
                  />
                  <span style={{ color: "red" }} id="search_error"></span>
                </div>
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
