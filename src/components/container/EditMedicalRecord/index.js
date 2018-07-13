import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Step, Icon } from "semantic-ui-react"
import Main from "../Main"
import PatientInformation from "../PatientInformation"
import StepsWrapper from "./components/StepsWrapper"
import MedicineReaction from "../MedicineReaction"
import BloodRecord from "../BloodRecord"

class EditMedicalRecord extends Component {
  constructor() {
    super()
    this.state = {
      stages: [
        { header: "受試者背景", active: true, completed: false },
        { header: "藥物反應", active: false, completed: false },
        { header: "打藥物前相關紀錄", active: false, completed: false },
        { header: "抽血與施打藥物紀錄", active: false, completed: false },
        { header: "CRS紀錄（詳細紀錄）", active: false, completed: false },
        { header: "血清檢體操作紀錄", active: false, completed: false },
        { header: "血球檢體操作紀錄", active: false, completed: false }
      ]
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

  changeStage(index, event) {
    let stages = this.state.stages.map(stage => {
      stage.active = false
      return stage
    })
    stages[index].active = true
    this.setState({ stages: stages })
  }

  renderForm() {
    let formComponent = null
    const medicalRecordId = this.props.match.params.medicalRecordId
    this.state.stages.forEach((stage, index) => {
      if (stage.active) {
        switch (index) {
          case 0:
            formComponent = (
              <PatientInformation medicalRecordId={medicalRecordId} />
            )
            break
          case 1:
            formComponent = (
              <MedicineReaction medicalRecordId={medicalRecordId} />
            )
            break
          case 3:
            formComponent = <BloodRecord medicalRecordId={medicalRecordId} />
            break
          default:
            break
        }
      }
    })
    return formComponent
  }

  render() {
    return (
      <Main row={true}>
        <StepsWrapper>
          <Step.Group vertical>
            {this.state.stages.map((stage, index) => (
              <Step
                key={index}
                completed={stage.completed}
                active={stage.active}
                onClick={this.changeStage.bind(this, index)}
              >
                <Icon name="pencil alternate" />
                <Step.Content>
                  <Step.Title>{stage.header}</Step.Title>
                </Step.Content>
              </Step>
            ))}
          </Step.Group>
        </StepsWrapper>
        {this.renderForm()}
      </Main>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(["authentication", "isLoggedIn"])
})

export default connect(mapStateToProps)(withRouter(EditMedicalRecord))
