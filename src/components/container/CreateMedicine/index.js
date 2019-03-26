import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onSaveMedicine, onFetchMedicines } from "../../../actions/medicine";
import {
  Form,
  Header,
  Dimmer,
  Loader,
  Select,
  TextArea,
  Button
} from "semantic-ui-react";
import FormWrapper from "./components/FormWrapper";
import Label from "../../presentational/Label";
import TextAreaWrapper from "./components/TextAreaWrapper";

class CreateMedicine extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: ""
    };
  }

  componentDidMount() {
    this.props.onFetchMedicines();
  }

  componentDidUpdate() {
    this.state.id &&
      this.state.name &&
      this.props.medicines[this.state.id] &&
      this.props.medicines[this.state.id] === this.state.name &&
      this.props.history.push("medical-records");
  }

  handleSubmit = () => {
    this.props.onSaveMedicine({
      id: this.state.id,
      name: this.state.name
    });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  };

  render() {
    return (
      <FormWrapper center>
        <Dimmer active={this.props.isLoading} page>
          <Loader active />
        </Dimmer>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <Label>藥物全名</Label>
            <input
              placeholder="藥物全名"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Field>
          <Form.Field inline>
            <Label>藥物簡稱（不可重複）</Label>
            <input
              placeholder="藥物簡稱"
              value={this.state.id}
              onChange={this.handleIdChange}
            />
          </Form.Field>
          <Header size="medium" color="red">
            {this.props.errorMessage}
          </Header>
          <Button type="submit" primary>
            儲存
          </Button>
          <Button
            primary
            onClick={() => this.props.history.push("medical-records")}
          >
            返回
          </Button>
        </Form>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.getIn(["medicines", "isLoading"]),
  medicines: state.getIn(["medicines", "body"]),
  errorMessage: state.getIn(["medicines", "errorMessage"])
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSaveMedicine, onFetchMedicines }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateMedicine));
