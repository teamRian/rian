import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, Button, Col, Modal, ControlLabel } from 'react-bootstrap';
import DatePicker from './CalendarDatePicker';

export default class CalendarPostModal extends Component {
	constructor(props){
		super(props);
		this.state= { showModal: false }
	}

	close(){
	    this.setState({ showModal: false });
	}

	open(){
		console.log(this.props);
		this.setState({ showModal: true });
	}

	handleSubmit(e) {
      	e.preventDefault();
		var date = document.getElementById("calendar-datepicker").getAttribute('data-formattedvalue');
		var title = this.title.value;
		console.log(date,title);
		if(date.length === 0 || title.length === 0) {
			alert("모든 입력칸을 채우셔야 합니다!!!")
		} else {
								// //     {
					   //      _userId, username,year,month,day,
					   //      type:"once", 
					   //      title: "New Event"
					   //    }
		    var { _id, username } = this.props.User;
		    date = date.split('/');
		    var year = date[2];
		    var month = date[1];
		    var day = date[0];
		    var post = { _userId: _id, username, year, month, day, title,
		    	type:"once"
		    }
		    console.log("SEND",post);
			this.props.calendarPost(post)
			this.close();
		}
  	}

	render(){
		const alignTextarea = {
	      width: "100%",
	      border: "1px solid #ccc",
	      borderRadius: "4px",
	      padding: "6px 12px"
	    }
		return (
			<div>
        		<Button type="submit" bsStyle="danger" onClick={()=>this.open()}>
        			New Plan
				</Button>
				<Modal show={this.state.showModal} onHide={()=>this.close()}>
		          <Modal.Header closeButton>
		            <Modal.Title>New Plan</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <Form onSubmit={this.handleSubmit}>
		              <FormGroup controlId="formHorizontalAuthor">
		                <h5>Title</h5>
		                <FormControl 
		                	autoFocus
		                    componentClass="input" 
		                    placeholder="제목을 입력하세요" 
		                    inputRef={ref => {this.title = ref}} /><hr />
		                <h5>Content</h5>
		                <textarea style={alignTextarea} rows="8" placeholder="할일을 입력하세요" ref="text"></textarea>
		                <ControlLabel>Date</ControlLabel>
		                <DatePicker Calendar={this.props.Calendar}/>
		              </FormGroup>
		            </Form>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e)}>저장하기</Button>
		            <Button onClick={()=>this.close()}>취소하기</Button>
		          </Modal.Footer>
		        </Modal>
			</div>
		)
	}
}