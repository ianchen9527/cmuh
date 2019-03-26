import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  onSaveMedicalRecord,
  onFetchMedicalRecord
} from "../../../actions/medicalRecord";
import {
  Form,
  Header,
  Dimmer,
  Loader,
  Select,
  Button,
  Icon,
  List
} from "semantic-ui-react";
import FormWrapper from "./components/FormWrapper";
import Label from "../../presentational/Label";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWrapper from "./components/DatePickerWrapper";
import SelectWrapper from "./components/SelectWrapper";
import InputWrapper from "./components/InputWrapper";
import ctcaeDb from "./assets/ctcae.json";
import treatments from "./assets/treatments.json";
import DatePicker from "react-datepicker";
import CrsRecordAfterWrapper from "./components/CrsRecordAfterWrapper";
import TextAreaWrapper from "./components/TextAreaWrapper";
import GradeWrapper from "./components/GradeWrapper";

class CrsRecordAfter extends Component {
  constructor() {
    super();
    this.state = {
      treatmentCategory: "",
      treatmentMethod: "",
      treatmentMedicine: "",
      medDraSoc: "",
      ctcaeTerm: "",
      grade: "",
      newRecord: {
        gradeLevel: "",
        date: moment().format("YYYY/MM/DD"),
        grades: [],
        treatments: []
      },
      crsRecordAfter: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onFetchMedicalRecord(this.props.medicalRecordId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicalRecord && nextProps.medicalRecord.crsRecordAfter) {
      this.setState({
        crsRecordAfter: nextProps.medicalRecord.crsRecordAfter
      });
    }
  }

  handleSubmit() {
    let medicalRecord = this.props.medicalRecord || {};
    medicalRecord.id = this.props.medicalRecordId;
    if (!!medicalRecord.crsRecordAfter) {
      medicalRecord.crsRecordAfter.push(this.state.newRecord);
    } else {
      medicalRecord.crsRecordAfter = [this.state.newRecord];
    }
    this.props.onSaveMedicalRecord(medicalRecord);
  }

  get dateMoment() {
    return this.state.newRecord.date
      ? moment(this.state.newRecord.date, "YYYY/MM/DD")
      : moment();
  }

  handleDateChange = date => {
    let newRecord = { ...this.state.newRecord };
    newRecord.date = date.format("YYYY/MM/DD");
    this.setState({ newRecord: newRecord });
  };

  handleSelectChange(name, event, data) {
    let newRecord = { ...this.state.newRecord };
    newRecord[name] = data.value;
    this.setState({ newRecord: newRecord });
  }

  handleTreatmentSelectChange(name, event, data) {
    this.setState({ [name]: data.value });
  }

  handleChange(name, event) {
    let newRecord = { ...this.state.newRecord };
    newRecord[name] = event.target.value;
    this.setState({ newRecord: newRecord });
  }

  handleTreatmentChange(name, event) {
    this.setState({ [name]: event.target.value });
  }

  get timeMoment() {
    return this.state.newRecord.time
      ? moment(this.state.newRecord.time, "HH:mm")
      : moment();
  }

  get medDraOptions() {
    return ctcaeDb
      .map(row => {
        return row[0];
      })
      .filter((v, i, a) => {
        return a.indexOf(v) === i;
      })
      .map(medDraSoc => {
        return { key: medDraSoc, text: medDraSoc, value: medDraSoc };
      });
  }

  get ctcaeTermOptions() {
    if (this.state.medDraSoc) {
      return ctcaeDb
        .filter(row => {
          return row[0] === this.state.medDraSoc;
        })
        .map(row => {
          return { key: row[1], text: row[1], value: row[1] };
        })
        .filter((v, i, a) => {
          return a.indexOf(v) === i;
        });
    } else {
      return [];
    }
  }

  get gradeLevelOptions() {
    return [
      { key: 1, text: "1", value: "1" },
      { key: 2, text: "2", value: "2" },
      { key: 3, text: "3", value: "3" },
      { key: 4, text: "4", value: "4" },
      { key: 5, text: "5", value: "5" }
    ];
  }

  get gradeOptions() {
    if (this.state.medDraSoc && this.state.ctcaeTerm) {
      const matchRow = ctcaeDb.filter(row => {
        return (
          row[0] === this.state.medDraSoc && row[1] === this.state.ctcaeTerm
        );
      })[0];
      if (matchRow) {
        return matchRow.slice(2, 7).map((grade, index) => {
          return {
            key: index,
            text: `${grade} (grade ${index + 1})`,
            value: grade
          };
        });
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  get treatmentOptions() {
    return [
      { key: "mechanical", text: "Mechanical support", value: "mechanical" },
      { key: "medical", text: "Medical support", value: "medical" }
    ];
  }

  get treatmentMethodOptions() {
    const treatmentName = this.state.treatmentCategory;
    if (treatmentName) {
      return treatments[treatmentName].map(method => {
        return { key: method, text: method, value: method };
      });
    } else {
      return [];
    }
  }

  renderGrade() {
    return (
      <Form.Field>
        <Label>受試者自述症狀</Label>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(this, "medDraSoc")}
            options={this.medDraOptions}
            value={this.state.medDraSoc}
            placeholder="MedDRA SOC"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(this, "ctcaeTerm")}
            options={this.ctcaeTermOptions}
            value={this.state.ctcaeTerm}
            placeholder="CTCAE Term"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(this, "grade")}
            options={this.gradeOptions}
            value={this.state.grade}
            placeholder="grade"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Button type="button" icon primary onClick={this.addGrade.bind(this)}>
            <Icon name="add" />
          </Button>
        </SelectWrapper>
      </Form.Field>
    );
  }

  addGrade() {
    const grades = `grades`;
    const medDraSoc = `medDraSoc`;
    const ctcaeTerm = `ctcaeTerm`;
    const grade = `grade`;

    if (this.state[medDraSoc] && this.state[ctcaeTerm] && this.state[grade]) {
      let newRecord = { ...this.state.newRecord };
      let crsRecordGrades = newRecord[grades] || [];
      crsRecordGrades.push({
        medDraSoc: this.state[medDraSoc],
        ctcaeTerm: this.state[ctcaeTerm],
        grade: this.state[grade]
      });
      newRecord[grades] = crsRecordGrades;
      this.setState({
        newRecord: newRecord,
        [medDraSoc]: "",
        [ctcaeTerm]: "",
        [grade]: ""
      });
    }
  }

  renderGrades(key) {
    const grades = `grades`;
    if (this.state.newRecord[grades]) {
      return (
        <List size="big">
          {this.state.newRecord[grades].map((grade, index) => {
            return (
              <List.Item key={index}>
                <List.Content>
                  <InputWrapper>
                    <Button
                      type="button"
                      icon
                      color="red"
                      onClick={this.removeGrade.bind(this, index)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </InputWrapper>
                  [{grade.medDraSoc}] [{grade.ctcaeTerm}] [{grade.grade}]
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      );
    }
  }

  removeGrade(index) {
    let newRecord = { ...this.state.newRecord };
    newRecord[`grades`].splice(index, 1);
    this.setState({
      newRecord: newRecord
    });
  }

  renderTreatmentMedicine() {
    if (this.state.treatmentCategory === "medical") {
      return (
        <SelectWrapper>
          <input
            placeholder="drug..."
            value={this.state.treatmentMedicine}
            onChange={this.handleTreatmentChange.bind(
              this,
              "treatmentMedicine"
            )}
          />
        </SelectWrapper>
      );
    }
  }

  addTreatment() {
    if (
      this.state.treatmentCategory === "mechanical" &&
      this.state.treatmentMethod
    ) {
      let newRecord = { ...this.state.newRecord };
      let treatments = newRecord.treatments || [];
      treatments.push({
        category: this.state.treatmentCategory,
        method: this.state.treatmentMethod
      });
      newRecord.treatments = treatments;
      this.setState({
        newRecord: newRecord,
        treatmentCategory: "",
        treatmentMethod: "",
        treatmentMedicine: ""
      });
    } else if (
      this.state.treatmentCategory === "medical" &&
      this.state.treatmentMethod
    ) {
      if (this.state.treatmentMedicine) {
        let newRecord = { ...this.state.newRecord };
        let treatments = newRecord.treatments || [];
        treatments.push({
          category: this.state.treatmentCategory,
          method: this.state.treatmentMethod,
          medicine: this.state.treatmentMedicine
        });
        newRecord.treatments = treatments;
        this.setState({
          newRecord: newRecord,
          treatmentCategory: "",
          treatmentMethod: "",
          treatmentMedicine: ""
        });
      }
    }
  }

  removeTreatment(index) {
    let newRecord = { ...this.state.newRecord };
    newRecord.treatments.splice(index, 1);
    this.setState({
      newRecord: newRecord
    });
  }

  renderTreatment() {
    return (
      <Form.Field>
        <Label>處置方式</Label>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(
              this,
              "treatmentCategory"
            )}
            options={this.treatmentOptions}
            value={this.state.treatmentCategory}
            placeholder="mechanical, medical"
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            onChange={this.handleTreatmentSelectChange.bind(
              this,
              "treatmentMethod"
            )}
            options={this.treatmentMethodOptions}
            value={this.state.treatmentMethod}
            placeholder="Treatment method..."
          />
        </SelectWrapper>
        {this.renderTreatmentMedicine()}
        <SelectWrapper>
          <Button
            type="button"
            icon
            primary
            onClick={this.addTreatment.bind(this)}
          >
            <Icon name="add" />
          </Button>
        </SelectWrapper>
      </Form.Field>
    );
  }

  renderTreatments() {
    if (this.state.newRecord.treatments) {
      return (
        <List size="big">
          {this.state.newRecord.treatments.map((treament, index) => {
            return (
              <List.Item key={index}>
                <List.Content>
                  <InputWrapper>
                    <Button
                      type="button"
                      icon
                      color="red"
                      onClick={this.removeTreatment.bind(this, index)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </InputWrapper>
                  [{treament.category}] {treament.method}{" "}
                  {treament.medicine ? ` - ${treament.medicine}` : ""}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      );
    }
  }

  removeCrsRecordAfter (index) {
    const crsRecordAfter = [];
    let medicalRecord = this.props.medicalRecord || {};
    medicalRecord.crsRecordAfter.forEach((element, _index) => {
      index !== _index && crsRecordAfter.push(element);
    });
    medicalRecord.crsRecordAfter = crsRecordAfter;
    this.props.onSaveMedicalRecord(medicalRecord);
  }

  renderCrsRecordAfter = (crsRecord, index) => {
    return (
      <CrsRecordAfterWrapper key={index}>
        <Form>
          <Form.Field inline>
            <Label>CRS Grade</Label>
            <TextAreaWrapper>{crsRecord.gradeLevel}</TextAreaWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label>發生日期</Label>
            <TextAreaWrapper>{crsRecord.date}</TextAreaWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label>受試者自述症狀</Label>
            <TextAreaWrapper>
              {crsRecord.grades.map((grade, index) => (
                <GradeWrapper key={index}>
                  <div>MedDRASOC: {grade.medDraSoc}</div>
                  <div>CTCAE Term: {grade.ctcaeTerm}</div>
                  <div>grade: {grade.grade}</div>
                </GradeWrapper>
              ))}
            </TextAreaWrapper>
          </Form.Field>
          <Form.Field inline>
            <Label>處置方式</Label>
            <TextAreaWrapper>
              {crsRecord.treatments.map((treament, index) => (
                <GradeWrapper key={index}>
                  <div>category: {treament.category}</div>
                  <div>method: {treament.method}</div>
                </GradeWrapper>
              ))}
            </TextAreaWrapper>
          </Form.Field>
          <Button
            type="button"
            icon
            color="red"
            onClick={this.removeCrsRecordAfter.bind(this, index)}
          >
            <Icon name="trash alternate outline" />
          </Button>
        </Form>
      </CrsRecordAfterWrapper>
    );
  };

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
            <Label>CRS Grade</Label>
            <Select
              onChange={this.handleSelectChange.bind(this, "gradeLevel")}
              options={this.gradeLevelOptions}
              value={this.state.newRecord.gradeLevel}
              placeholder="1 ~ 5"
            />
          </Form.Field>
          <Form.Field inline>
            <Label>發生日期</Label>
            <DatePickerWrapper>
              <DatePicker
                selected={this.dateMoment}
                onChange={this.handleDateChange}
              />
            </DatePickerWrapper>
          </Form.Field>
          {this.renderGrade()}
          {this.renderGrades()}
          {this.renderTreatment()}
          {this.renderTreatments()}
          <Header size="medium" color="red">
            {this.props.errorMessage}
          </Header>
          <Button type="submit" primary>
            儲存
          </Button>
        </Form>
        {this.state.crsRecordAfter.map(this.renderCrsRecordAfter)}
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.getIn(["medicalRecord", "isLoading"]),
  medicalRecord: state.getIn(["medicalRecord", "body"]),
  errorMessage: state.getIn(["medicalRecord", "errorMessage"])
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSaveMedicalRecord, onFetchMedicalRecord }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CrsRecordAfter));
