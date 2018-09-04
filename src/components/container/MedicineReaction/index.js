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
  Button,
  Icon,
  List
} from "semantic-ui-react"
import FormWrapper from "./components/FormWrapper"
import Label from "../../presentational/Label"
import TextAreaWrapper from "./components/TextAreaWrapper"
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import DatePickerWrapper from "./components/DatePickerWrapper"
import SelectWrapper from "./components/SelectWrapper"
import InputWrapper from "./components/InputWrapper"
import ctcaeDb from "./assets/ctcae.json"
import treatments from "./assets/treatments.json"

class MedicineReaction extends Component {
  constructor() {
    super()
    this.state = {
      crsTreatmentCategory: "",
      crsTreatmentMethod: "",
      crsTreatmentMedicine: "",
      allergyTreatmentCategory: "",
      allergyTreatmentMethod: "",
      allergyTreatmentMedicine: "",
      crsMedDraSoc: "",
      crsCtcaeTerm: "",
      crsGrade: "",
      allergyMedDraSoc: "",
      allergyCtcaeTerm: "",
      allergyGrade: "",
      medicineReaction: {
        isFirstTime: "",
        date: moment().format("YYYY/MM/DD"),
        crsFrequency: "",
        crsGrades: [],
        crsTreatments: [],
        allergy: "",
        allergyMedicine: "",
        allergyGrades: [],
        allergyTreatments: [],
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

  handleTreatmentSelectChange(name, event, data) {
    this.setState({ [name]: data.value })
  }

  handleChange(name, event) {
    let medicineReaction = { ...this.state.medicineReaction }
    medicineReaction[name] = event.target.value
    this.setState({ medicineReaction: medicineReaction })
  }

  handleTreatmentChange(name, event) {
    this.setState({ [name]: event.target.value })
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
    if (this.state[dependency]) {
      return ctcaeDb
        .filter(row => {
          return row[0] === this.state[dependency]
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
    if (this.state[dependencies[0]] && this.state[dependencies[1]]) {
      const matchRow = ctcaeDb.filter(row => {
        return (
          row[0] === this.state[dependencies[0]] &&
          row[1] === this.state[dependencies[1]]
        )
      })[0]
      if (matchRow) {
        return matchRow.slice(2, 7).map((grade, index) => {
          return {
            key: index,
            text: `${grade} (grade ${index + 1})`,
            value: grade
          }
        })
      } else {
        return []
      }
    } else {
      return []
    }
  }

  get treatmentOptions() {
    return [
      { key: "mechanical", text: "Mechanical support", value: "mechanical" },
      { key: "medical", text: "Medical support", value: "medical" }
    ]
  }

  getTreatmentMethodOptions(...dependencies) {
    const treatmentName = this.state[dependencies[0]]
    if (treatmentName) {
      return treatments[treatmentName].map(method => {
        return { key: method, text: method, value: method }
      })
    } else {
      return []
    }
  }

  renderCrsFrequency() {
    if (!this.state.medicineReaction.isFirstTime) {
      return (
        <Form.Field inline>
          <Label>
            受試者多次施打
            {this.medicineName}, 產生 CRS 之頻率
          </Label>
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

  renderGrade(label, key) {
    const medDraSoc = `${key}MedDraSoc`
    const ctcaeTerm = `${key}CtcaeTerm`
    const grade = `${key}Grade`

    return (
      <Form.Field>
        <Label>{label}</Label>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(this, medDraSoc)}
            options={this.medDraOptions}
            value={this.state[medDraSoc]}
            placeholder="MedDRA SOC"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(this, ctcaeTerm)}
            options={this.getCtcaeTermOptions(medDraSoc)}
            value={this.state[ctcaeTerm]}
            placeholder="CTCAE Term"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(this, grade)}
            options={this.getGradeOptions(medDraSoc, ctcaeTerm)}
            value={this.state[grade]}
            placeholder="grade"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Button
            type="button"
            icon
            primary
            onClick={this.addGrade.bind(this, key)}
          >
            <Icon name="add" />
          </Button>
        </SelectWrapper>
      </Form.Field>
    )
  }

  addGrade(key) {
    const grades = `${key}Grades`
    const medDraSoc = `${key}MedDraSoc`
    const ctcaeTerm = `${key}CtcaeTerm`
    const grade = `${key}Grade`

    if (this.state[medDraSoc] && this.state[ctcaeTerm] && this.state[grade]) {
      let medicineReaction = { ...this.state.medicineReaction }
      let medicineReactionGrades = medicineReaction[grades] || []
      medicineReactionGrades.push({
        medDraSoc: this.state[medDraSoc],
        ctcaeTerm: this.state[ctcaeTerm],
        grade: this.state[grade]
      })
      medicineReaction[grades] = medicineReactionGrades
      this.setState({
        medicineReaction: medicineReaction,
        [medDraSoc]: "",
        [ctcaeTerm]: "",
        [grade]: ""
      })
    }
  }

  renderCrsGrade() {
    if (this.state.medicineReaction.crsFrequency !== "never") {
      return this.renderGrade("近期發生之CRS症狀(Grade)", "crs")
    }
  }

  renderCrsGrades() {
    return this.renderGrades("crs")
  }

  renderGrades(key) {
    const grades = `${key}Grades`
    if (this.state.medicineReaction[grades]) {
      return (
        <List size="big">
          {this.state.medicineReaction[grades].map((grade, index) => {
            return (
              <List.Item key={index}>
                <List.Content>
                  <InputWrapper>
                    <Button
                      type="button"
                      icon
                      color="red"
                      onClick={this.removeGrade.bind(this, key, index)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </InputWrapper>
                  [{grade.medDraSoc}] [{grade.ctcaeTerm}] [{grade.grade}]
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      )
    }
  }

  removeGrade(key, index) {
    let medicineReaction = { ...this.state.medicineReaction }
    medicineReaction[`${key}Grades`].splice(index, 1)
    this.setState({
      medicineReaction: medicineReaction
    })
  }

  renderTreatmentMedicine(dependency, key) {
    const treatmentMedicine = `${key}TreatmentMedicine`
    if (this.state[dependency] === "medical") {
      return (
        <SelectWrapper>
          <input
            placeholder="drug..."
            value={this.state[treatmentMedicine]}
            onChange={this.handleTreatmentChange.bind(this, treatmentMedicine)}
          />
        </SelectWrapper>
      )
    }
  }

  addTreatment(key) {
    const treatments = `${key}Treatments`
    const treatmentCategory = `${key}TreatmentCategory`
    const treatmentMethod = `${key}TreatmentMethod`
    const treatmentMedicine = `${key}TreatmentMedicine`

    if (
      this.state[treatmentCategory] === "mechanical" &&
      this.state[treatmentMethod]
    ) {
      let medicineReaction = { ...this.state.medicineReaction }
      let medicineReactionTreatments = medicineReaction[treatments] || []
      medicineReactionTreatments.push({
        category: this.state[treatmentCategory],
        method: this.state[treatmentMethod]
      })
      medicineReaction[treatments] = medicineReactionTreatments
      this.setState({
        medicineReaction: medicineReaction,
        [treatmentCategory]: "",
        [treatmentMethod]: "",
        [treatmentMedicine]: ""
      })
    } else if (
      this.state[treatmentCategory] === "medical" &&
      this.state[treatmentMethod]
    ) {
      if (this.state[treatmentMedicine]) {
        let medicineReaction = { ...this.state.medicineReaction }
        let medicineReactionTreatments = medicineReaction[treatments] || []
        medicineReactionTreatments.push({
          category: this.state[treatmentCategory],
          method: this.state[treatmentMethod],
          medicine: this.state[treatmentMedicine]
        })
        medicineReaction[treatments] = medicineReactionTreatments
        this.setState({
          medicineReaction: medicineReaction,
          [treatmentCategory]: "",
          [treatmentMethod]: "",
          [treatmentMedicine]: ""
        })
      }
    }
  }

  removeTreatment(key, index) {
    let medicineReaction = { ...this.state.medicineReaction }
    medicineReaction[`${key}Treatments`].splice(index, 1)
    this.setState({
      medicineReaction: medicineReaction
    })
  }

  renderTreatment(label, key) {
    const treatmentCategory = `${key}TreatmentCategory`
    const treatmentMethod = `${key}TreatmentMethod`

    return (
      <Form.Field>
        <Label>{label}</Label>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(
              this,
              treatmentCategory
            )}
            options={this.treatmentOptions}
            value={this.state[treatmentCategory]}
            placeholder="mechanical, medical"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(
              this,
              treatmentMethod
            )}
            options={this.getTreatmentMethodOptions(treatmentCategory)}
            value={this.state[treatmentMethod]}
            placeholder="Treatment method..."
          />
        </SelectWrapper>
        {this.renderTreatmentMedicine(treatmentCategory, key)}
        <SelectWrapper>
          <Button
            type="button"
            icon
            primary
            onClick={this.addTreatment.bind(this, key)}
          >
            <Icon name="add" />
          </Button>
        </SelectWrapper>
      </Form.Field>
    )
  }

  renderTreatments(key) {
    const treatments = `${key}Treatments`
    if (this.state.medicineReaction[treatments]) {
      return (
        <List size="big">
          {this.state.medicineReaction[treatments].map((treament, index) => {
            return (
              <List.Item key={index}>
                <List.Content>
                  <InputWrapper>
                    <Button
                      type="button"
                      icon
                      color="red"
                      onClick={this.removeTreatment.bind(this, key, index)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </InputWrapper>
                  [{treament.category}] {treament.method}{" "}
                  {treament.medicine ? ` - ${treament.medicine}` : ""}
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      )
    }
  }

  renderCrsTreatment() {
    if (this.state.medicineReaction.crsFrequency !== "never") {
      return this.renderTreatment("處理方式", "crs")
    }
  }

  renderCrsTreatments() {
    return this.renderTreatments("crs")
  }

  renderAllergyMedicine() {
    if (this.state.medicineReaction.allergy) {
      return (
        <Form.Field inline>
          <Label>單株抗體藥物名稱</Label>
          <input
            placeholder="單株抗體藥物名稱"
            value={this.state.medicineReaction.allergyMedicine}
            onChange={this.handleChange.bind(this, "allergyMedicine")}
          />
        </Form.Field>
      )
    }
  }

  renderAllergyGrade() {
    if (this.state.medicineReaction.allergy) {
      return this.renderGrade("症狀", "allergy")
    }
  }

  renderAllergyTreatment() {
    if (this.state.medicineReaction.allergy) {
      return this.renderTreatment("處理方式", "allergy")
    }
  }

  renderAllergyTreatments() {
    return this.renderTreatments("allergy")
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
            <Label>
              施打
              {this.medicineName}
              日期
            </Label>
            <DatePickerWrapper>
              <DatePicker
                selected={this.dateMoment}
                onChange={this.handleDateChange}
              />
            </DatePickerWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label>
              受試者為初次施打
              {this.medicineName}
            </Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "isFirstTime")}
              options={this.boolOptions}
              value={this.state.medicineReaction.isFirstTime}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.renderCrsFrequency()}
          {this.renderCrsGrade()}
          {this.renderCrsGrades()}
          {this.renderCrsTreatment()}
          {this.renderCrsTreatments()}
          <Form.Field inline>
            <Label>受試者曾對單株抗體藥物生過敏</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "allergy")}
              options={this.boolOptions}
              value={this.state.medicineReaction.allergy}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.renderAllergyMedicine()}
          {this.renderAllergyGrade()}
          {this.renderAllergyTreatment()}
          {this.renderAllergyTreatments()}
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
