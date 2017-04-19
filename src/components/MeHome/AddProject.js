import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { userAddProject } from "../../actions/UserActions";
import "./AddProject.css";

@withRouter
@connect(mapState, mapDispatch)
export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { User, history, userAddProject } = this.props;
    const name = this.title.value;
    const creator = this.props.User._id;
    const member = [this.props.User._id];
    const whiteboard = [];
    const project = { name, creator, member, whiteboard };
    // add chatroom here!
    // const chatroom =
    if (name.length === 0) {
      alert("제목을 입력하세요");
    } else {
      userAddProject(project, this.props.history);
    }
  }

  render() {
    return (
      <div className="body-2">
        <div />
        <div />
        <div className="HolyGrail">
          <div className="HolyGrailHeader">
            Add Project
          </div>
          <div className="HolyGrailBody">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalAuthor">
                <h5>제목 (*)</h5>
                <FormControl
                  componentClass="input"
                  placeholder="제목을 입력하세요"
                  inputRef={ref => {
                    this.title = ref;
                  }}
                />
              </FormGroup>
            </Form>
          </div>
          <div className="HolyGrailFooter">
            <div className="buttons">
              <Button>
                Cancle
              </Button>
              <Button bsStyle="primary" onClick={this.handleSubmit}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
  };
}

function mapDispatch(dispatch) {
  return {
    userAddProject: (form, history) => {
      dispatch(userAddProject(form, history));
    }
  };
}

