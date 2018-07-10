import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { onSaveMedicalRecord } from "../../../actions/medicalRecord"
import { Step, Form, Header, Dimmer, Loader, Icon } from "semantic-ui-react"
import Main from "../Main"
import FormWrapper from "./components/FormWrapper"

class EditMedicalRecord extends Component {
  constructor() {
    super()
    this.state = {
      stages: [
        { header: "受試者背景", active: true, completed: false },
        { header: "藥物反應", active: false, completed: false },
        { header: "打藥物前相關紀錄", active: false, completed: false },
        { header: "抽血與施打藥物紀錄", active: false, completed: false },
        { header: "CRS紀錄（詳細紀錄）", active: false, completed: false },
        { header: "血清檢體操作紀錄", active: false, completed: false },
        { header: "血球檢體操作紀錄", active: false, completed: false }
      ]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

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

  handleSubmit() {
    console.log("submit")
  }

  handleSelectChange = (name, event, data) => {
    this.setState({ [name]: data.value })
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.value })
  }

  renderSteps() {
    return (
      <Step.Group vertical>
        {this.state.stages.map((stage, index) => (
          <Step key={index} completed={stage.completed} active={stage.active}>
            <Icon name="pencil alternate" />
            <Step.Content>
              <Step.Title>{stage.header}</Step.Title>
            </Step.Content>
          </Step>
        ))}
      </Step.Group>
    )
  }

  render() {
    return (
      <Main row={true}>
        <Dimmer active={this.props.isLoading}>
          <Loader active />
        </Dimmer>
        {this.renderSteps()}
        <FormWrapper>
          <Form size="large" onSubmit={this.handleSubmit}>
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
          </Form>
        </FormWrapper>
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
  bindActionCreators({ onSaveMedicalRecord }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditMedicalRecord))
