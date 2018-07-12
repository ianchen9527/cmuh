import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  onLogIn,
  onClearAuthenticationError
} from "../../../actions/authentication"
import { Button, Form, Header, Loader, Dimmer } from "semantic-ui-react"
import Main from "../Main"

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
    this.props.onClearAuthenticationError()
    if (this.props.isLoggedIn) {
      this.props.history.push("/home")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.history.push("/home")
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
      <Main>
        <Dimmer active={this.props.isLoading} page>
          <Loader active />
        </Dimmer>
        <Header as="h1" size="huge" color="grey">
          登入
        </Header>
        <Form size="huge" onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <label>帳號</label>
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange.bind(this, "email")}
            />
          </Form.Field>
          <Form.Field inline>
            <label>密碼</label>
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange.bind(this, "password")}
            />
          </Form.Field>
          <Header size="medium" color="red">
            {this.props.errorMessage}
          </Header>
          <Button type="submit" primary>
            登入
          </Button>
        </Form>
      </Main>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(["authentication", "isLoggedIn"]),
  isLoading: state.getIn(["authentication", "isLoading"]),
  errorMessage: state.getIn(["authentication", "errorMessage"])
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onLogIn, onClearAuthenticationError }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
