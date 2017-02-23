import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const io = require('socket.io-client');

export default class MessageForm extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    
  }
  
  handleSubmit(e){
      e.preventDefault();
      let message = {
          user: this.props.user,
          text: this.memo.value
      }
      this.props.onMessageSubmit(message);
      this.memo.value = '';
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>  
              <ControlLabel>Enter Message</ControlLabel>
              <FormControl
                type='text'
                placeholder='Enter text'
                inputRef={ref => {this.memo = ref;}}
              />
            </FormGroup>  
            <Button type='submit'bsStyle="primary" bsSize='small'>Send Message</Button>
           </form>       
      </div>
    );
  }
}