import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  onSaveMedicalRecord,
  onFetchMedicalRecord
} from "../../../actions/medicalRecord"
import {
  Form,
  Header,
  Dimmer,
  Loader,
  Button,
  Table,
  Select
} from "semantic-ui-react"
import FormWrapper from "./components/FormWrapper"
import Label from "../../presentational/Label"
import TimePicker from "rc-time-picker"
import "rc-time-picker/assets/index.css"
import moment from "moment"
import DatePickerWrapper from "./components/DatePickerWrapper"
import FormSelectWrapper from "./components/FormSelectWrapper"

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

  handleRecordSelectChange(index, name, event, data) {
    let bloodRecord = { ...this.state.bloodRecord }
    bloodRecord.records[index][name] = data.value
    this.setState({ bloodRecord: bloodRecord })
  }

  handleTimeChange(name, value) {
    if (value) {
      let bloodRecord = { ...this.state.bloodRecord }
      bloodRecord[name] = value.format("HH:mm")
      this.setState({ bloodRecord: bloodRecord })
    }
  }

  handleRecordTimeChange(index, gradeIndex, name, value) {
    if (value) {
      let bloodRecord = { ...this.state.bloodRecord }
      bloodRecord.records[index].grades[gradeIndex][name] = value.format(
        "HH:mm"
      )
      this.setState({ bloodRecord: bloodRecord })
    }
  }

  handleChange(name, event) {
    let bloodRecord = { ...this.state.bloodRecord }
    bloodRecord[name] = event.target.value
    this.setState({ bloodRecord: bloodRecord })
  }

  handleRecordChange(index, name, event) {
    let bloodRecord = { ...this.state.bloodRecord }
    bloodRecord.records[index][name] = event.target.value
    this.setState({ bloodRecord: bloodRecord })
  }

  handleRecordGradeChange(index, gradeIndex, name, event) {
    let bloodRecord = { ...this.state.bloodRecord }
    bloodRecord.records[index].grades[gradeIndex][name] = event.target.value
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

  getRecordPeriod(record) {
    let period = ""
    switch (record.id) {
      case "#1":
        period = "0~15min"
        break
      case "#2":
        period = "16~30min"
        break
      case "#3":
        period = "31~45min"
        break
      case "#4":
        period = "46~60min"
        break
      default:
        break
    }
    return period
  }

  renderRecordGrade(index, gradeIndex) {
    return (
      <Table.Cell>
        <Table basic="very" celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell width="2">
                <Header size="tiny">時間</Header>
              </Table.Cell>
              <Table.Cell width="5">
                <TimePicker
                  fluid
                  format="HH:mm"
                  showSecond={false}
                  onChange={this.handleRecordTimeChange.bind(
                    this,
                    index,
                    gradeIndex,
                    "time"
                  )}
                  value={this.getMoment(
                    this.state.bloodRecord.records[index].grades[gradeIndex]
                      .time
                  )}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width="2">
                <Header size="tiny">體溫</Header>
              </Table.Cell>
              <Table.Cell width="5">
                <input
                  value={
                    this.state.bloodRecord.records[index].grades[gradeIndex]
                      .bodyTemperature
                  }
                  onChange={this.handleRecordGradeChange.bind(
                    this,
                    index,
                    gradeIndex,
                    "bodyTemperature"
                  )}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width="2">
                <Header size="tiny">血壓</Header>
              </Table.Cell>
              <Table.Cell width="5">
                <input
                  value={
                    this.state.bloodRecord.records[index].grades[gradeIndex]
                      .bloodPressure
                  }
                  onChange={this.handleRecordGradeChange.bind(
                    this,
                    index,
                    gradeIndex,
                    "bloodPressure"
                  )}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width="2">
                <Header size="tiny">血氧量</Header>
              </Table.Cell>
              <Table.Cell width="5">
                <input
                  value={
                    this.state.bloodRecord.records[index].grades[gradeIndex]
                      .bloodOxygenation
                  }
                  onChange={this.handleRecordGradeChange.bind(
                    this,
                    index,
                    gradeIndex,
                    "bloodOxygenation"
                  )}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Table.Cell>
    )
  }

  renderRecords() {
    return this.state.bloodRecord.records.map((record, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{record.id}</Table.Cell>
          <Table.Cell>{this.getRecordPeriod(record)}</Table.Cell>
          <Table.Cell>
            <FormSelectWrapper>
              <Select
                fluid
                onChange={this.handleRecordSelectChange.bind(
                  this,
                  index,
                  "status"
                )}
                options={this.statusOptions}
                value={this.state.bloodRecord.records[index].status}
              />
            </FormSelectWrapper>
          </Table.Cell>
          <Table.Cell>
            <FormSelectWrapper>
              <input
                value={this.state.bloodRecord.records[index].speed}
                onChange={this.handleRecordChange.bind(this, index, "speed")}
              />
            </FormSelectWrapper>
          </Table.Cell>
          {this.renderRecordGrade(index, 0)}
          {this.renderRecordGrade(index, 1)}
        </Table.Row>
      )
    })
  }

  renderTable() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>採血管編號</Table.HeaderCell>
            <Table.HeaderCell>區間</Table.HeaderCell>
            <Table.HeaderCell>狀態</Table.HeaderCell>
            <Table.HeaderCell>輸注速度(滴/時)</Table.HeaderCell>
            <Table.HeaderCell>CRS(Grade 1)發生時間與生理紀錄</Table.HeaderCell>
            <Table.HeaderCell>
              CRS(Grade >= 2)發生時間與生理紀錄
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row />
          {this.renderRecords()}
        </Table.Body>
      </Table>
    )
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
          {this.renderTable()}
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
