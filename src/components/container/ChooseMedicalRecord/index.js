import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import { Button, Header, Dimmer, Form, Loader, Select } from "semantic-ui-react"
import Main from "../Main"

function padLeft(str, len) {
  str = "" + str
  return str.length >= len
    ? str
    : new Array(len - str.length + 1).join("0") + str
}

class ChooseMedicalRecord extends Component {
  constructor() {
    super()
    this.state = {
      rch: "",
      cara: "",
      sequence: "",
      visit: "",
      errorMessage: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  get idGroupOptions() {
    const sequenceArray = new Array(100)
    const visitArray = new Array(10)
    return [
      [
        { key: "R", text: "R", value: "R" },
        { key: "H", text: "H", value: "H" },
        { key: "C", text: "C", value: "C" }
      ],
      [
        { key: "CA", text: "CA", value: "CA" },
        { key: "RA", text: "RA", value: "RA" }
      ],
      sequenceArray.fill(undefined).map((value, index) => {
        const trueValue = padLeft(index + 1, 3)
        return {
          key: trueValue,
          text: trueValue,
          value: trueValue
        }
      }),
      visitArray.fill(undefined).map((value, index) => {
        const trueValue = index + 1
        return {
          key: trueValue,
          text: trueValue,
          value: trueValue
        }
      })
    ]
  }

  get medicalRecordId() {
    return `CRS-${this.state.rch}-${this.state.cara}-${
      this.state.sequence
    }-visit${this.state.visit}`
  }

  get isDataValid() {
    return (
      this.state.rch &&
      this.state.cara &&
      this.state.sequence &&
      this.state.visit
    )
  }

  handleChange(name, event, data) {
    this.setState({ [name]: data.value })
  }

  handleSubmit() {
    if (this.isDataValid) {
      this.props.history.push(`medical-records/${this.medicalRecordId}`)
    } else {
      this.setState({ errorMessage: "請填入完整收案編碼" })
    }
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

  render() {
    return (
      <Main>
        <Dimmer active={false}>
          <Loader active />
        </Dimmer>
        <Header as="h1" size="huge" color="grey">
          選取病歷
        </Header>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <label>收案編碼</label>
            <Header as="span">CRS-</Header>
            <Select
              onChange={this.handleChange.bind(this, "rch")}
              options={this.idGroupOptions[0]}
              placeholder="R, H, C"
            />
            <Header as="span">-</Header>
            <Select
              onChange={this.handleChange.bind(this, "cara")}
              options={this.idGroupOptions[1]}
              placeholder="CA, RA"
            />
            <Header as="span">-</Header>
            <Select
              onChange={this.handleChange.bind(this, "sequence")}
              options={this.idGroupOptions[2]}
              placeholder="001 ~ 100"
            />
            <Header as="span">-visit</Header>
            <Select
              onChange={this.handleChange.bind(this, "visit")}
              options={this.idGroupOptions[3]}
              placeholder="1 ~ 10"
            />
          </Form.Field>
          <Header size="medium" color="red">
            {this.state.errorMessage}
          </Header>
          <Button type="submit" primary>
            新增 / 編輯
          </Button>
        </Form>
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
)(withRouter(ChooseMedicalRecord))
