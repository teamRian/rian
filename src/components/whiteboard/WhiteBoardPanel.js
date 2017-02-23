import React from 'react';

//Libaries
import { Editor, EditorState, RichUtils, ContentState, ContentBlock, convertToRaw, convertFromRaw, convertFromHTML, CompositeDecorator } from 'draft-js';
import { socketConnect } from 'socket.io-react';


const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};


class WhiteBoardPanel extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			editorState : EditorState.createEmpty()
		}
		this.listenMessage.bind(this)();
		this.onChange = (editorState) => {
			this.setState({editorState});
			console.log('selectionState ::: ', editorState.getSelection().getAnchorKey());
			var currentContent = editorState.getCurrentContent();			
			var currentContentRaw = convertToRaw(currentContent);
			this.props.socket.emit('editorState',  currentContentRaw);
			this.handleKeyCommand = this.handleKeyCommand.bind(this);
		} 
	}

	listenMessage(){
		
		var panel = this;
		
		this.props.socket.on('editorState', function(currentContentRaw){
			console.log('server sent me ', currentContentRaw);
			var currentContent = convertFromRaw(currentContentRaw);
			//console.log('currentContent ::: receive ::: ', currentContent)
			panel.setState({editorState : EditorState.moveSelectionToEnd(EditorState.createWithContent(currentContent)) });
		});

	}


	onChangeHandler(editorState){
		// this.setState({ editorState });
		console.log(editorState);
	}

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }	

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }  

	render(){

		return(
			<div>
				<button onClick={this._onBoldClick.bind(this)}>Bold</button>
				<Editor editorState={this.state.editorState}								
								customStyleMap={styleMap}
                ref="editor"
                handleKeyCommand={this.handleKeyCommand}						
								onChange={this.onChange} />			
			</div>
		)

	}

}

export default socketConnect(WhiteBoardPanel);