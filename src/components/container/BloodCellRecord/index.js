import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  onSaveMedicalRecord,
  onFetchMedicalRecord
} from "../../../actions/medicalRecord"
import { Form, Header, Dimmer, Loader, Select, Button } from "semantic-ui-react"
import FormWrapper from "./components/FormWrapper"
import Label from "../../presentational/Label"
import "react-datepicker/dist/react-datepicker.css"

class BloodCellRecord extends Component {
  constructor() {
    super()
    this.state = {
      bloodCellRecord: {
        id: "",
        live: 0,
        dead: 0,
        percentage: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.onFetchMedicalRecord(this.props.medicalRecordId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicalRecord && nextProps.medicalRecord.bloodCellRecord) {
      this.setState({
        bloodCellRecord: nextProps.medicalRecord.bloodCellRecord
      })
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {}
    medicalRecord.id = this.props.medicalRecordId
    medicalRecord.bloodCellRecord = this.state.bloodCellRecord
    this.props.onSaveMedicalRecord(medicalRecord)
  }

  handleSelectChange(name, event, data) {
    let bloodCellRecord = { ...this.state.bloodCellRecord }
    bloodCellRecord[name] = data.value
    this.setState({ bloodCellRecord: bloodCellRecord })
  }

  handleChange(name, event) {
    let bloodCellRecord = { ...this.state.bloodCellRecord }
    if (isNaN(parseInt(event.target.value, 10))) {
      bloodCellRecord[name] = 0
    } else {
      bloodCellRecord[name] = parseInt(event.target.value, 10)
    }

    this.setState({ bloodCellRecord: bloodCellRecord }, () => {
      if (this.state.bloodCellRecord.live || this.state.bloodCellRecord.dead) {
        let bloodCellRecord = { ...this.state.bloodCellRecord }
        bloodCellRecord.percentage = `${Math.round(
          (this.state.bloodCellRecord.live * 10000) /
            (this.state.bloodCellRecord.live + this.state.bloodCellRecord.dead)
        ) / 100}%`
        this.setState({
          bloodCellRecord: bloodCellRecord
        })
      }
    })
  }

  get idOptions() {
    return [
      { key: "pre0", text: "Pre#0", value: "Pre#0" },
      { key: "crs", text: "CRS", value: "CRS" }
    ]
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
            <Label>檢體標示</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "id")}
              options={this.idOptions}
              value={this.state.bloodCellRecord.id}
              placeholder="Pre#0, CRS"
            />
          </Form.Field>
          <Form.Field inline>
            <Label>總（活）細胞數</Label>
            <input
              placeholder="總（活）細胞數"
              value={this.state.bloodCellRecord.live}
              onChange={this.handleChange.bind(this, "live")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>總（死）細胞數</Label>
            <input
              placeholder="總（死）細胞數"
              value={this.state.bloodCellRecord.dead}
              onChange={this.handleChange.bind(this, "dead")}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>存活率</Label>
            <p>{this.state.bloodCellRecord.percentage}</p>
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
)(withRouter(BloodCellRecord))
