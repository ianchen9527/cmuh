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
import InputWrapper from "./components/InputWrapper"
import TextWrapper from "./components/TextWrapper"

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
            location: ["", "", ""]
          },
          {
            id: "#0",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ["", "", ""]
          },
          {
            id: "#1",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ["", "", ""]
          },
          {
            id: "#2",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ["", "", ""]
          },
          {
            id: "#3",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ["", "", ""]
          },
          {
            id: "#4",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ["", "", ""]
          },
          {
            id: "#CRS",
            coagulation: "",
            hemolysis: "",
            volume: "",
            tube: "",
            location: ["", "", ""]
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

  handleLocationChange(index, order, event) {
    let serumRecord = { ...this.state.serumRecord }
    serumRecord.records[index]["location"][order] = event.target.value
    this.setState({ serumRecord: serumRecord })
  }

  get statusOptions() {
    return [
      { key: "yes", text: "Yes", value: true },
      { key: "no", text: "No", value: false }
    ]
  }

  get tubeOptions() {
    return [
      { key: 1, text: "1", value: 1 },
      { key: 2, text: "2", value: 2 },
      { key: 3, text: "3", value: 3 },
      { key: 4, text: "4", value: 4 }
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
          <Table.Cell>
            <FormSelectWrapper>
              <Select
                fluid
                onChange={this.handleRecordSelectChange.bind(
                  this,
                  index,
                  "coagulation"
                )}
                options={this.statusOptions}
                value={this.state.serumRecord.records[index].coagulation}
              />
            </FormSelectWrapper>
          </Table.Cell>
          <Table.Cell>
            <FormSelectWrapper>
              <Select
                fluid
                onChange={this.handleRecordSelectChange.bind(
                  this,
                  index,
                  "hemolysis"
                )}
                options={this.statusOptions}
                value={this.state.serumRecord.records[index].hemolysis}
              />
            </FormSelectWrapper>
          </Table.Cell>
          <Table.Cell>
            <FormSelectWrapper>
              <input
                style={{ width: "90px" }}
                value={this.state.serumRecord.records[index].volume}
                onChange={this.handleRecordChange.bind(this, index, "volume")}
              />
            </FormSelectWrapper>
          </Table.Cell>
          <Table.Cell>
            <FormSelectWrapper>
              <Select
                fluid
                onChange={this.handleRecordSelectChange.bind(
                  this,
                  index,
                  "tube"
                )}
                options={this.tubeOptions}
                value={this.state.serumRecord.records[index].tube}
              />
            </FormSelectWrapper>
          </Table.Cell>
          <Table.Cell>
            <FormSelectWrapper>
              <TextWrapper>Box-</TextWrapper>
              <InputWrapper>
                <input
                  style={{ width: "90px" }}
                  value={this.state.serumRecord.records[index].location[0]}
                  onChange={this.handleLocationChange.bind(this, index, 0)}
                />
              </InputWrapper>
              <TextWrapper>-</TextWrapper>
              <InputWrapper>
                <input
                  style={{ width: "90px" }}
                  value={this.state.serumRecord.records[index].location[1]}
                  onChange={this.handleLocationChange.bind(this, index, 1)}
                />
              </InputWrapper>
              <TextWrapper>-</TextWrapper>
              <InputWrapper>
                <input
                  style={{ width: "90px" }}
                  value={this.state.serumRecord.records[index].location[2]}
                  onChange={this.handleLocationChange.bind(this, index, 2)}
                />
              </InputWrapper>
            </FormSelectWrapper>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  renderTable() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>標號</Table.HeaderCell>
            <Table.HeaderCell>凝血</Table.HeaderCell>
            <Table.HeaderCell>溶血</Table.HeaderCell>
            <Table.HeaderCell>分裝體積(ml)</Table.HeaderCell>
            <Table.HeaderCell>管數</Table.HeaderCell>
            <Table.HeaderCell>存放地點</Table.HeaderCell>
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
            <Label>處理時間</Label>
            <DatePickerWrapper>
              <TimePicker
                format="HH:mm"
                showSecond={false}
                onChange={this.handleTimeChange.bind(this, "beginAt")}
                value={this.getMoment(this.state.serumRecord.beginAt)}
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
