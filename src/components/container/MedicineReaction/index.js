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
  Select,
  TextArea,
  Button
} from "semantic-ui-react"
import FormWrapper from "./components/FormWrapper"
import Label from "../../presentational/Label"
import TextAreaWrapper from "./components/TextAreaWrapper"
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import DatePickerWrapper from "./components/DatePickerWrapper"
import SelectWrapper from "./components/SelectWrapper"
import ctcaeDb from "./assets/ctcae.json"

class MedicineReaction extends Component {
  constructor() {
    super()
    this.state = {
      medicineReaction: {
        isFirstTime: "",
        date: moment().format("YYYY/MM/DD"),
        crsFrequency: "",
        crsMedDraSoc: "",
        crsCtcaeTerm: "",
        crsGrade: "",
        crsTreatment: "",
        allergy: "",
        allergyMedicine: "",
        allergyMedDraSoc: "",
        allergyCtcaeTerm: "",
        allergyGrade: "",
        allergyTreatment: "",
        allergyNonSingleMedicine: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidMount() {
    this.props.onFetchMedicalRecord(this.props.medicalRecordId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicalRecord && nextProps.medicalRecord.medicineReaction) {
      this.setState({
        medicineReaction: nextProps.medicalRecord.medicineReaction
      })
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {}
    medicalRecord.id = this.props.medicalRecordId
    medicalRecord.medicineReaction = this.state.medicineReaction
    this.props.onSaveMedicalRecord(medicalRecord)
  }

  handleDateChange(date) {
    let medicineReaction = { ...this.state.medicineReaction }
    medicineReaction.date = date.format("YYYY/MM/DD")
    this.setState({ medicineReaction: medicineReaction })
  }

  handleSelectChange(name, event, data) {
    let medicineReaction = { ...this.state.medicineReaction }
    medicineReaction[name] = data.value
    this.setState({ medicineReaction: medicineReaction })
  }

  handleChange(name, event) {
    let medicineReaction = { ...this.state.medicineReaction }
    medicineReaction[name] = event.target.value
    this.setState({ medicineReaction: medicineReaction })
  }

  get boolOptions() {
    return [
      { key: true, text: "是", value: true },
      { key: false, text: "否", value: false }
    ]
  }

  get frequencyOptions() {
    return [
      { key: "always", text: "每次皆發生", value: "always" },
      { key: "occasionally", text: "偶爾發生", value: "occasionally" },
      { key: "never", text: "從未發生", value: "never" }
    ]
  }

  get medicineName() {
    let medicineName = ""
    switch (this.props.medicalRecordId.split("-")[1]) {
      case "R":
        medicineName = "Rituximab"
        break
      case "H":
        medicineName = "Herceptin"
        break
      case "C":
        medicineName = "Cetuximab"
        break
      default:
        medicineName = "Rituximab"
        break
    }
    return medicineName
  }

  get dateMoment() {
    return this.state.medicineReaction.date
      ? moment(this.state.medicineReaction.date, "YYYY/MM/DD")
      : moment()
  }

  get medDraOptions() {
    return ctcaeDb
      .map(row => {
        return row[0]
      })
      .filter((v, i, a) => {
        return a.indexOf(v) === i
      })
      .map(medDraSoc => {
        return { key: medDraSoc, text: medDraSoc, value: medDraSoc }
      })
  }

  getCtcaeTermOptions(dependency) {
    if (this.state.medicineReaction[dependency]) {
      return ctcaeDb
        .filter(row => {
          return row[0] === this.state.medicineReaction[dependency]
        })
        .map(row => {
          return { key: row[1], text: row[1], value: row[1] }
        })
        .filter((v, i, a) => {
          return a.indexOf(v) === i
        })
    } else {
      return []
    }
  }

  getGradeOptions(...dependencies) {
    if (
      this.state.medicineReaction[dependencies[0]] &&
      this.state.medicineReaction[dependencies[1]]
    ) {
      return ctcaeDb
        .filter(row => {
          return (
            row[0] === this.state.medicineReaction[dependencies[0]] &&
            row[1] === this.state.medicineReaction[dependencies[1]]
          )
        })[0]
        .slice(2, 7)
        .map((grade, index) => {
          return {
            key: grade,
            text: `${grade} (grade ${index + 1})`,
            value: grade
          }
        })
    } else {
      return []
    }
  }

  renderCrsFrequency() {
    if (!this.state.medicineReaction.isFirstTime) {
      return (
        <Form.Field inline>
          <Label>受試者多次施打{this.medicineName}, 產生 CRS 之頻率</Label>
          <Select
            onChange={this.handleSelectChange.bind(this, "crsFrequency")}
            options={this.frequencyOptions}
            value={this.state.medicineReaction.crsFrequency}
            placeholder="每次皆發生，偶爾發生，從未發生"
          />
        </Form.Field>
      )
    }
  }

  renderCrsGrade() {
    if (this.state.medicineReaction.crsFrequency !== "never") {
      return (
        <Form.Field>
          <Label>近期發生之CRS症狀(Grade)</Label>
          <SelectWrapper>
            <Select
              onChange={this.handleSelectChange.bind(this, "crsMedDraSoc")}
              options={this.medDraOptions}
              value={this.state.medicineReaction.crsMedDraSoc}
              placeholder="MedDRA SOC"
            />
          </SelectWrapper>
          <SelectWrapper>
            <Select
              onChange={this.handleSelectChange.bind(this, "crsCtcaeTerm")}
              options={this.getCtcaeTermOptions("crsMedDraSoc")}
              value={this.state.medicineReaction.crsCtcaeTerm}
              placeholder="CTCAE Term"
            />
          </SelectWrapper>
          <SelectWrapper>
            <Select
              onChange={this.handleSelectChange.bind(this, "crsGrade")}
              options={this.getGradeOptions("crsMedDraSoc", "crsCtcaeTerm")}
              value={this.state.medicineReaction.crsGrade}
              placeholder="grade"
            />
          </SelectWrapper>
        </Form.Field>
      )
    }
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
            <Label>施打{this.medicineName}日期</Label>
            <DatePickerWrapper>
              <DatePicker
                selected={this.dateMoment}
                onChange={this.handleDateChange}
              />
            </DatePickerWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label>受試者為初次施打{this.medicineName}</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "isFirstTime")}
              options={this.boolOptions}
              value={this.state.medicineReaction.isFirstTime}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.renderCrsFrequency()}
          {this.renderCrsGrade()}
          <Form.Field inline>
            <Label large>受試者對何種藥物過敏(非單株抗體藥物)</Label>
            <TextAreaWrapper>
              <TextArea
                placeholder="受試者對何種藥物過敏(非單株抗體藥物)"
                value={this.state.medicineReaction.allergyNonSingleMedicine}
                onChange={this.handleChange.bind(
                  this,
                  "allergyNonSingleMedicine"
                )}
              />
            </TextAreaWrapper>
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
)(withRouter(MedicineReaction))
