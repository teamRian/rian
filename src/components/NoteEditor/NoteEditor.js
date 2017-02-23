import React, { Component } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
        console.log("asdfasdf")sdfasdfasdfsadf
        return this.setState({editorState}) 
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  
  handleKeyCommand(commadfand) {
    
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  componentDidMount() {
    this.props.onChangeDispatch(this.state.editorState)
  }

  render() {
    return (
      
      "asdfasdf"

    );
  }
}



