import React from 'react';
import { Form, FormGroup, FormControl ,Button , Col, Modal, ControlLabel } from 'react-bootstrap';

const TodoAdd = React.createClass({
  getInitialState() {
    return { 
      showModal: false
    };
  },

  // Modal Control
  close() {
    this.setState({ 
      showModal: false 
    });
  },

  open() {
    this.setState({ 
      showModal: true 
    });
  },

  handleSubmit(e) {
      e.preventDefault();

      const author = this.author.value;
      const player = this.player.value;
      const title = this.title.value;
      const text = this.refs.text.value;
      const index = this.props.index + 1; // next index
      const newId = this.props.id + '_' + index;
      const importance = Number(this.importance.value);

      if(author.length === 0 || player.length ===0 || text.length === 0 || title.length === 0 || !importance) {
        alert("모든 입력칸을 채우셔야 합니다!!!")
      } else {
        this.props.addTodo(newId, author, player, title, text, importance, index)
        this.close();
      }
  },

  render() {
    const alignTextarea = {
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "6px 12px"
    }

    return (
      <div>
        <Button type="submit" bsStyle="danger" onClick={this.open}>
            Create To-do
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add To-Do</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalAuthor">
                <h5>작성자</h5>
                <FormControl 
                    componentClass="input" 
                    placeholder="작성자를 입력하세요" 
                    inputRef={ref => {this.author = ref;}} /><hr />

                <h5>참여자</h5>
                <FormControl 
                    componentClass="input" 
                    placeholder="참여자를 입력하세요" 
                    inputRef={ref => {this.player = ref;}} /><hr />
                
                <h5>제목</h5>
                <FormControl 
                    componentClass="input" 
                    placeholder="제목을 입력하세요" 
                    inputRef={ref => {this.title = ref;}} /><hr />
                <h5>중요도</h5>
                <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.importance = ref; }}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </FormControl><hr />
                <h5>해야할 일</h5>
                <textarea style={alignTextarea} rows="8" placeholder="할일을 입력하세요" ref="text"></textarea>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleSubmit}>저장하기</Button>
            <Button onClick={this.close}>취소하기</Button>
          </Modal.Footer>
            </Modal>
        </div>
              
      );
  }
})

export default TodoAdd;
