import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
const io = require('socket.io-client');

export default class ChangeNameForm extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    
  }

  // componentDidMount() {
  //   this.socket = io();
  // }

  handleSubmit(e){
      e.preventDefault();
      let newName = this.newname.value;
      this.props.onChangeName(newName);
      this.newname.value = '';
  }

  render() {
    return (
      <div className='change_name_form'>
          
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>  
                <ControlLabel>Enter Name</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter name'
                  inputRef={ref => {this.newname = ref;}}
                />
            </FormGroup>  
            <Button className='changeNameBtn' type='submit'bsStyle="primary" bsSize='small'>Change Name</Button>
           </form>       
      </div>
    );
  }
}

