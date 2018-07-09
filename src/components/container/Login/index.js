import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { onLogIn } from "../../../actions/authentication"
import { Button, Form } from "semantic-ui-react"

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/medical-records")
    }
  }

  handleSubmit() {
    this.props.onLogIn(this.state.email, this.state.password)
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field inline>
          <label>Email</label>
          <input
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange.bind(this, "email")}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
        </Form.Field>
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.get("authentication").get("isLoggedIn")
})

const mapDispatchToProps = dispatch => bindActionCreators({ onLogIn }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
