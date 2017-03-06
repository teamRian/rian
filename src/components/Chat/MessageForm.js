import React, { Component } from 'react';
import { Popover, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { socketConnect } from 'socket.io-react';
import classNames from 'classnames';
const io = require('socket.io-client');

class MessageForm extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.findUser = this.findUser.bind(this);
  }
  
  findUser(){
      for (var i = 0; i <= this.props.users.length; i++) {
        if(this.props.users[i].includes(this.props.socket.id.slice(6))){
            return this.props.users[i]
        }
      }
  }


  handleSubmit(e){
      e.preventDefault();
      
      let message = {
          username: this.findUser(),
          text: this.memo.value,
          date_added: new Date()
      }
      this.props.onMessageSubmit(message);
      // this.props.chatPost(logs);
      this.memo.value = '';
  }

  handleKeypress(e){
    
    this.props.handleKey(e.key)
      
  }

  render() {

    return (
      <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>  
              {/*<ControlLabel>Enter Message</ControlLabel>*/}
              <FormControl
                type='text'
                placeholder='Enter text'
                inputRef={ref => {this.memo = ref;}}
                onKeyPress={this.handleKeypress.bind(this)}
              />
            </FormGroup>  
            <Button type='submit'bsStyle="primary" bsSize='small'>Send Message</Button>
           </form>       
      </div>
    );
  }
}

export default socketConnect(MessageForm);