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
  Search,
  List,
  Icon
} from "semantic-ui-react"
import FormWrapper from "./components/FormWrapper"
import Label from "../../presentational/Label"
import InputWrapper from "./components/InputWrapper"
import LineWrapper from "./components/LineWrapper"

class PremedicationRecord extends Component {
  constructor() {
    super()
    this.state = {
      antiemeticName: "",
      antiemeticDose: "",
      steroidName: "",
      steroidDose: "",
      antihistamineName: "",
      antihistamineDose: "",
      analgesicsName: "",
      analgesicsDose: "",
      premedicationRecord: {
        bodyTemperature: "",
        heartReate: "",
        systolicBloodPressure: "",
        diastolicBloodPressure: "",
        bloodOxygenation: "",
        antiemetic: [],
        steroid: [],
        antihistamine: [],
        analgesics: []
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.onFetchMedicalRecord(this.props.medicalRecordId)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.medicalRecord &&
      nextProps.medicalRecord.premedicationRecord
    ) {
      this.setState({
        premedicationRecord: nextProps.medicalRecord.premedicationRecord
      })
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {}
    medicalRecord.id = this.props.medicalRecordId
    medicalRecord.premedicationRecord = this.state.premedicationRecord
    this.props.onSaveMedicalRecord(medicalRecord)
  }

  handleChange(name, event) {
    let premedicationRecord = { ...this.state.premedicationRecord }
    premedicationRecord[name] = event.target.value
    this.setState({ premedicationRecord: premedicationRecord })
  }

  handleFormChange(name, event) {
    this.setState({ [name]: event.target.value })
  }

  handleSearchChange(name, event, data) {
    this.setState({ [name]: data.value })
  }

  handleSearchSelected(name, event, data) {
    this.setState({ [name]: data.result.title })
  }

  addDrug(category) {
    if (this.state[`${category}Name`] && this.state[`${category}Dose`]) {
      let premedicationRecord = { ...this.state.premedicationRecord }
      let premedicationRecordCategory = premedicationRecord[category] || []
      premedicationRecordCategory.push({
        name: this.state[`${category}Name`],
        dose: this.state[`${category}Dose`]
      })
      premedicationRecord[category] = premedicationRecordCategory
      this.setState({
        premedicationRecord: premedicationRecord,
        [`${category}Name`]: "",
        [`${category}Dose`]: ""
      })
    }
  }

  removeDrug(category, index) {
    let premedicationRecord = { ...this.state.premedicationRecord }
    premedicationRecord[category].splice(index, 1)
    this.setState({
      premedicationRecord: premedicationRecord
    })
  }

  renderPremedication(label, category, drugs) {
    return (
      <LineWrapper>
        <Label>{label}</Label>
        <InputWrapper>
          <Search
            icon=""
            placeholder="藥名"
            value={this.state[`${category}Name`]}
            results={drugs}
            onResultSelect={this.handleSearchSelected.bind(
              this,
              `${category}Name`
            )}
            onSearchChange={this.handleSearchChange.bind(
              this,
              `${category}Name`
            )}
          />
        </InputWrapper>
        <InputWrapper>
          <input
            placeholder="劑量"
            value={this.state[`${category}Dose`]}
            onChange={this.handleFormChange.bind(this, `${category}Dose`)}
          />
        </InputWrapper>
        <InputWrapper>
          <Button
            type="button"
            primary
            onClick={this.addDrug.bind(this, category)}
            icon
          >
            <Icon name="add" />
          </Button>
        </InputWrapper>
      </LineWrapper>
    )
  }

  renderAntiemetic() {
    return this.renderPremedication("止吐劑", "antiemetic", [
      { title: "palonosetron" }
    ])
  }

  renderSteroid() {
    return this.renderPremedication("類固醇", "steroid", [
      { title: "dexamethasone" },
      { title: "hydrocortisone" }
    ])
  }

  renderAntihistamine() {
    return this.renderPremedication("抗組織胺", "antihistamine", [
      { title: "diphenhydramine" }
    ])
  }

  renderAnalgesics() {
    return this.renderPremedication("止痛劑", "analgesics", [
      { title: "acetaminophen" }
    ])
  }

  renderDrugs(category) {
    if (this.state.premedicationRecord[category]) {
      return (
        <List size="big">
          {this.state.premedicationRecord[category].map((drug, index) => {
            return (
              <List.Item key={index}>
                <List.Content>
                  {drug.name} - {`${drug.dose}`}
                  <InputWrapper>
                    <Button
                      type="button"
                      icon
                      color="red"
                      onClick={this.removeDrug.bind(this, category, index)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </InputWrapper>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      )
    }
  }

  renderAntiemeticDrugs() {
    return this.renderDrugs("antiemetic")
  }

  renderSteroidDrugs() {
    return this.renderDrugs("steroid")
  }

  renderAntihistamineDrugs() {
    return this.renderDrugs("antihistamine")
  }

  renderAnalgesicsDrugs() {
    return this.renderDrugs("analgesics")
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
            <Label>體溫</Label>
            <input
              placeholder="體溫"
              value={this.state.premedicationRecord.bodyTemperature}
              onChange={this.handleChange.bind(this, "bodyTemperature")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>心跳</Label>
            <input
              placeholder="心跳"
              value={this.state.premedicationRecord.heartReate}
              onChange={this.handleChange.bind(this, "heartRate")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>收縮壓</Label>
            <input
              placeholder="收縮壓"
              value={this.state.premedicationRecord.systolicBloodPressure}
              onChange={this.handleChange.bind(this, "systolicBloodPressure")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>舒張壓</Label>
            <input
              placeholder="舒張壓"
              value={this.state.premedicationRecord.diastolicBloodPressure}
              onChange={this.handleChange.bind(this, "diastolicBloodPressure")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>血氧比</Label>
            <input
              placeholder="血氧比"
              value={this.state.premedicationRecord.bloodOxygenation}
              onChange={this.handleChange.bind(this, "bloodOxygenation")}
            />
          </Form.Field>
          {this.renderAntiemetic()}
          {this.renderAntiemeticDrugs()}
          {this.renderSteroid()}
          {this.renderSteroidDrugs()}
          {this.renderAntihistamine()}
          {this.renderAntihistamineDrugs()}
          {this.renderAnalgesics()}
          {this.renderAnalgesicsDrugs()}
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
)(withRouter(PremedicationRecord))
