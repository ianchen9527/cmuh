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

class PatientInformation extends Component {
  constructor() {
    super()
    this.state = {
      patientInformation: {
        name: "",
        realId: "",
        gender: "",
        disease: "",
        cardiovascularDisease: "",
        cardiovascularDiseasesDescription: "",
        allergy: "",
        allergyDescription: "",
        infection: "",
        infectionDescription: "",
        chronic: "",
        chronicDescription: "",
        familyDisease: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.onFetchMedicalRecord(this.props.medicalRecordId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicalRecord) {
      this.setState({
        patientInformation: nextProps.medicalRecord.patientInformation
      })
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {}
    medicalRecord.id = this.props.medicalRecordId
    medicalRecord.patientInformation = this.state.patientInformation
    this.props.onSaveMedicalRecord(medicalRecord)
  }

  handleSelectChange(name, event, data) {
    let patientInformation = { ...this.state.patientInformation }
    patientInformation[name] = data.value
    this.setState({ patientInformation: patientInformation })
  }

  handleChange(name, event) {
    let patientInformation = { ...this.state.patientInformation }
    patientInformation[name] = event.target.value
    this.setState({ patientInformation: patientInformation })
  }

  get genderOptions() {
    return [
      { key: "M", text: "Male", value: "M" },
      { key: "F", text: "Female", value: "F" }
    ]
  }

  get boolOptions() {
    return [
      { key: true, text: "是", value: true },
      { key: false, text: "否", value: false }
    ]
  }

  conditionRender(key, component) {
    if (this.state.patientInformation[key]) {
      return component
    } else {
      return
    }
  }

  renderDescription(key) {
    return (
      <Form.Field inline>
        <Label large>請簡略描述症狀與處理方式</Label>
        <TextAreaWrapper>
          <TextArea
            placeholder="請簡略描述症狀與處理方式"
            value={this.state.patientInformation[key]}
            onChange={this.handleChange.bind(this, key)}
          />
        </TextAreaWrapper>
      </Form.Field>
    )
  }

  renderCardiovascularDisease() {
    return this.renderDescription("cardiovascularDiseasesDescription")
  }

  renderAllergy() {
    return this.renderDescription("allergyDescription")
  }

  renderInfection() {
    return this.renderDescription("infectionDescription")
  }

  renderChronic() {
    return this.renderDescription("chronicDescription")
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
            <Label>姓名</Label>
            <input
              placeholder="姓名"
              value={this.state.patientInformation.name}
              onChange={this.handleChange.bind(this, "name")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>病歷號碼</Label>
            <input
              placeholder="病歷號碼"
              value={this.state.patientInformation.realId}
              onChange={this.handleChange.bind(this, "realId")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>性別</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "gender")}
              options={this.genderOptions}
              value={this.state.patientInformation.gender}
              placeholder="Male, Female"
            />
          </Form.Field>
          <Form.Field inline>
            <Label>病症</Label>
            <TextAreaWrapper>
              <TextArea
                placeholder="病症..."
                value={this.state.patientInformation.disease}
                onChange={this.handleChange.bind(this, "disease")}
              />
            </TextAreaWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label large>近一個月是否有心血管異常</Label>
            <Select
              onChange={this.handleSelectChange.bind(
                this,
                "cardiovascularDisease"
              )}
              options={this.boolOptions}
              value={this.state.patientInformation.cardiovascularDisease}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.conditionRender(
            "cardiovascularDisease",
            this.renderCardiovascularDisease()
          )}
          <Form.Field inline>
            <Label large>近一個月是否有過敏症狀</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "allergy")}
              options={this.boolOptions}
              value={this.state.patientInformation.allergy}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.conditionRender("allergy", this.renderAllergy())}
          <Form.Field inline>
            <Label large>近一個月是否有感染症狀</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "infection")}
              options={this.boolOptions}
              value={this.state.patientInformation.infection}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.conditionRender("infection", this.renderInfection())}
          <Form.Field inline>
            <Label large>受試者是否有其他慢性疾病</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "chronic")}
              options={this.boolOptions}
              value={this.state.patientInformation.chronic}
              placeholder="是, 否"
            />
          </Form.Field>
          {this.conditionRender("chronic", this.renderChronic())}
          <Form.Field inline>
            <Label large>特殊家族病史 (含三等親與配偶)</Label>
            <TextAreaWrapper>
              <TextArea
                placeholder="特殊家族病史 (含三等親與配偶)"
                value={this.state.patientInformation.familyDisease}
                onChange={this.handleChange.bind(this, "familyDisease")}
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
)(withRouter(PatientInformation))
