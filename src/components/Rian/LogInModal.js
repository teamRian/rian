import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, FormControl, Button, Col, Modal, ControlLabel } from 'react-bootstrap';

export default class CalendarLogInModal extends Component {
	constructor(props){
		super(props);
		this.state= { showModal: false }
	}

	close(){
	    this.setState({ showModal: false });
	}

	open(){
		this.setState({ showModal: true });
	}

	handleSubmit(e) {
      e.preventDefault();
      if(this.username.value.length === 0) {
        alert("아이디를 입력하세요")
      } else {
        this.props.userLogIn({username:this.username.value})
        this.close();
      }
  	}

  	handleKeyPress(e){
  		if(e.charCode ===13){
  			this.handleSubmit(e)
  		}
  	}

	render(){
		return (
			<div className="modalButtons">
        		<Button type="submit" bsStyle="danger" onClick={()=>this.open()}>
        			로그인
				</Button>
				<Modal show={this.state.showModal} onHide={()=>this.close()}>
		          <Modal.Header closeButton>
		            <Modal.Title>Welcome to Rian</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <Form onSubmit={this.handleSubmit}>
		              <FormGroup controlId="formHorizontalAuthor">
		                <h5>아이디</h5>
		                <FormControl 
		                	autoFocus
		                    componentClass="input" 
		                    placeholder="아이디를 입력하세요" 
		                    onKeyPress={(e)=>this.handleKeyPress(e)}
		                    inputRef={ref => {this.username = ref}} />
		              </FormGroup>
		            </Form>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e)}>로그인</Button>
		            <Button onClick={()=>this.close()}>닫기</Button>
		          </Modal.Footer>
		        </Modal>
			</div>
		)
	}
}