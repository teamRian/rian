import React, { Component } from 'react';
import { Popover, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { socketConnect } from 'socket.io-react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
const io = require('socket.io-client');

class MessageForm extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.findUser = this.findUser.bind(this);
    this.timeoutFunction = this.timeoutFunction.bind(this);
    this.handleTypingStatus = debounce(this.handleTypingStatus, 2000, {
      "leading": true,
      "trailing": false,
      "maxWait": 2000
    })
    this.state = {
      typing: false,
      typeStatus: '',
      timeout: undefined
    }
    
  }

  componentDidMount() {

    this.props.socket.on('user:typing', data => {
        if(data.status) {
          this.handleTypingStatus.bind(this)(data)
        } else {
          this.setState({
            typeStatus: ''
          })
        }
      })
    
  }

  handleTypingStatus(data){
      console.log('디바운싱')
      this.setState({
        typeStatus: data.status
      })
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

  timeoutFunction() {
    console.log('되는거니??????')
      this.setState({
        typing: false
      })
      this.props.socket.emit('user:typing', false)
  }
  
  handleKeypress(e){
    
    this.setState({
      typing: true
    })
    this.props.socket.emit('user:typing', `${this.findUser()} typing...`)
    clearTimeout(this.timeout);
    var that = this;
    this.timeout = setTimeout(() => {that.timeoutFunction()}, 3000)
    this.props.handleKey(e.key);
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
              {!!this.state.typeStatus ? <div>{this.state.typeStatus}</div> : ''}
            </FormGroup>

            <Button type='submit'bsStyle="primary" bsSize='small'>Send Message</Button>
           </form>       
      </div>
    );
  }
}

export default socketConnect(MessageForm);