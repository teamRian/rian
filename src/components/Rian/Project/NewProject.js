import React, { Component, PropTypes } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import "../../../styles/NewProject.css";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { User, history, userAddProject } = this.props;
    console.log(this.props,"HANDLE SUBMIT");
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
      <div className="HolyGrail">
        <div className="HolyGrailHeader">
          New Project
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
    );
  }
}

export default withRouter(NewProject);
