import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import { projectPost } from '../../actions/ProjectActions';
import '../../styles/NewProject.css';

class NewProject extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
  	e.preventDefault();

  	const projectName = this.title.value;
  	const _creatorId = this.props.User._id;
 	  const _creatorUsername = this.props.User.username;
 	  const users = [this.props.User._id];
  	const project = { projectName, _creatorId, _creatorUsername, users};

  	if(projectName.length === 0){
  		alert('제목을 입력하세요');
  	} else {
  		this.props.projectPost(project)
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
                    inputRef={ref => {this.title = ref;}} /> <br/>
                <h5>작성자</h5>
                <FormControl 
                    componentClass="input" 
                    placeholder="작성자를 입력하세요" 
                    inputRef={ref => {this.author = ref;}} /> <br/>

                <h5>참여자</h5>
                <FormControl 
                    componentClass="input" 
                    placeholder="참여자를 입력하세요" 
                    inputRef={ref => {this.player = ref;}} /> <br/>
              </FormGroup>
            </Form>
      	</div>
      	<div className="HolyGrailFooter">
      		<div className="buttons">
      			<Button 
		      	>
		      	Cancle
	      		</Button>
	      		<Button 
	      			bsStyle="primary" 
	      			onClick={this.handleSubmit}
		      	>
		      	Add
	      		</Button>
	      	</div>
      	</div>
      </div>
    );
  }
}


function mapState(state) {
  return {
    User: state.User
  };
}

function mapDispatch(dispatch) {
  return {
    projectPost: (form)=>{
      dispatch(projectPost(form))
    }
  };
}

export default connect(mapState, mapDispatch)(NewProject);