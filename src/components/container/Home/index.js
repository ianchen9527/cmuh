import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
import { onLogIn } from "../../../actions/authentication"
import { Button, Header } from "semantic-ui-react"
import { Link } from "react-router-dom"
import Main from "../Main"
import LinkWrapper from "./components/LinkWrapper"

class Home extends Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoggedIn) {
      this.props.history.push("/login")
    }
  }

  render() {
    return (
      <Main>
        <Header as="h1" size="huge" color="grey">
          Home
        </Header>
        <LinkWrapper>
          <Link to="/medical-records">
            <Button primary>選取病歷</Button>
          </Link>
        </LinkWrapper>
      </Main>
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
)(withRouter(Home))
