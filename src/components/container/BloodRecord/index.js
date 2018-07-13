import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  onSaveMedicalRecord,
  onFetchMedicalRecord
} from "../../../actions/medicalRecord"
import { Form, Header, Dimmer, Loader, Button } from "semantic-ui-react"
import FormWrapper from "./components/FormWrapper"
import Label from "../../presentational/Label"
import TimePicker from "rc-time-picker"
import "rc-time-picker/assets/index.css"
import moment from "moment"
import DatePickerWrapper from "./components/DatePickerWrapper"

class BloodRecord extends Component {
  constructor() {
    super()
    this.state = {
      bloodRecord: {
        beginAt: moment().format("HH:mm"),
        endAt: moment().format("HH:mm"),
        records: [
          {
            id: "#1",
            status: "",
            speed: "",
            grades: [
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              },
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              }
            ]
          },
          {
            id: "#2",
            status: "",
            speed: "",
            grades: [
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              },
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              }
            ]
          },
          {
            id: "#3",
            status: "",
            speed: "",
            grades: [
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              },
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              }
            ]
          },
          {
            id: "#4",
            status: "",
            speed: "",
            grades: [
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              },
              {
                time: "",
                bodyTemperature: "",
                bloodPressure: "",
                bloodOxygenation: ""
              }
            ]
          }
        ]
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.onFetchMedicalRecord(this.props.medicalRecordId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicalRecord && nextProps.medicalRecord.bloodRecord) {
      this.setState({
        bloodRecord: nextProps.medicalRecord.bloodRecord
      })
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {}
    medicalRecord.id = this.props.medicalRecordId
    medicalRecord.bloodRecord = this.state.bloodRecord
    this.props.onSaveMedicalRecord(medicalRecord)
  }

  handleSelectChange(name, event, data) {
    let bloodRecord = { ...this.state.bloodRecord }
    bloodRecord[name] = data.value
    this.setState({ bloodRecord: bloodRecord })
  }

  handleTimeChange(name, value) {
    if (value) {
      let bloodRecord = { ...this.state.bloodRecord }
      bloodRecord[name] = value.format("HH:mm")
      this.setState({ bloodRecord: bloodRecord })
    }
  }

  handleChange(name, event) {
    let bloodRecord = { ...this.state.bloodRecord }
    bloodRecord[name] = event.target.value
    this.setState({ bloodRecord: bloodRecord })
  }

  get statusOptions() {
    return [
      { key: "continue", text: "持續", value: "continue" },
      { key: "discontinue", text: "中斷", value: "discontinue" }
    ]
  }

  getMoment(time) {
    return time ? moment(time, "HH:mm") : moment()
  }

  render() {
    return (
      <FormWrapper>
        <Dimmer active={this.props.isLoading} page>
          <Loader active />
        </Dimmer>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <Label>收案編碼</Label>
            <p>{this.props.medicalRecordId}</p>
          </Form.Field>
          <Form.Field inline>
            <Label>開始打藥</Label>
            <DatePickerWrapper>
              <TimePicker
                format="HH:mm"
                showSecond={false}
                onChange={this.handleTimeChange.bind(this, "beginAt")}
                value={this.getMoment(this.state.bloodRecord.beginAt)}
              />
            </DatePickerWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label>完成打藥</Label>
            <DatePickerWrapper>
              <TimePicker
                format="HH:mm"
                showSecond={false}
                onChange={this.handleTimeChange.bind(this, "endAt")}
                value={this.getMoment(this.state.bloodRecord.endAt)}
              />
            </DatePickerWrapper>
          </Form.Field>
          <Header size="medium" color="red">
            {this.props.errorMessage}
          </Header>
          <Button type="submit" primary>
            儲存
          </Button>
        </Form>
      </FormWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.getIn(["medicalRecord", "isLoading"]),
  medicalRecord: state.getIn(["medicalRecord", "body"]),
  errorMessage: state.getIn(["medicalRecord", "errorMessage"])
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSaveMedicalRecord, onFetchMedicalRecord }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BloodRecord))
