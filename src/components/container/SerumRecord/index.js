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

class SerumRecord extends Component {
  constructor() {
    super()
    this.state = {
      serumRecord: {
        endAt: moment().format("HH:mm"),
        records: [
          {
            id: "#Pre0",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
          },
          {
            id: "#0",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
          },
          {
            id: "#1",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
          },
          {
            id: "#2",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
          },
          {
            id: "#3",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
          },
          {
            id: "#4",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
          },
          {
            id: "#CRS",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ""
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
    if (nextProps.medicalRecord && nextProps.medicalRecord.serumRecord) {
      this.setState({
        serumRecord: nextProps.medicalRecord.serumRecord
      })
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {}
    medicalRecord.id = this.props.medicalRecordId
    medicalRecord.serumRecord = this.state.serumRecord
    this.props.onSaveMedicalRecord(medicalRecord)
  }

  handleRecordSelectChange(index, name, event, data) {
    let serumRecord = { ...this.state.serumRecord }
    serumRecord.records[index][name] = data.value
    this.setState({ serumRecord: serumRecord })
  }

  handleTimeChange(name, value) {
    if (value) {
      let serumRecord = { ...this.state.serumRecord }
      serumRecord[name] = value.format("HH:mm")
      this.setState({ serumRecord: serumRecord })
    }
  }

  handleRecordChange(index, name, event) {
    let serumRecord = { ...this.state.serumRecord }
    serumRecord.records[index][name] = event.target.value
    this.setState({ serumRecord: serumRecord })
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

  renderRecords() {
    return this.state.serumRecord.records.map((record, index) => {
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
)(withRouter(SerumRecord))
