import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import { Button, Header } from "semantic-ui-react"
import Main from "../Main"

class CreateMedicalRecord extends Component {
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
          新建病歷
        </Header>
      </Main>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.get("authentication").get("isLoggedIn")
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateMedicalRecord))
