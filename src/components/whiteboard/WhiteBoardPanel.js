import React from 'react';

//Libaries
import { Editor, EditorState, RichUtils, ContentState, ContentBlock, convertToRaw, convertFromRaw, convertFromHTML, CompositeDecorator } from 'draft-js';
import { socketConnect } from 'socket.io-react';


const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

// props =>
// contentCurrentStateRaw
// changeContentState

class WhiteBoardPanel extends React.Component{

	constructor(props) {
		super(props);
		console.log('props check :::', this.props);
		this.state = { 
			editorState : EditorState.createEmpty()
		}

		/* bind */
		this.listenMessage.bind(this)();
		this._onBoldClick.bind(this);
		this.handleKeyCommand = this.handleKeyCommand.bind(this);

		/* function */
		this.onChange = (editorState) => {
			
			this.setState({editorState});
			// console.log('selectionState ::: ', editorState.getSelection().getAnchorKey());
			var currentContent = editorState.getCurrentContent();			
			var currentContentRaw = convertToRaw(currentContent);
			this.props.socket.emit('editorState',  currentContentRaw);
			
		} 

	}

	listenMessage(){
		
		var panel = this;
		
		// this.props.socket.on('editorState', function(currentContentRaw){
		// 	console.log('server sent me ', currentContentRaw);
		// 	var currentContent = convertFromRaw(currentContentRaw);
		// 	//console.log('currentContent ::: receive ::: ', currentContent)
		// 	panel.setState({editorState : EditorState.moveSelectionToEnd(EditorState.createWithContent(currentContent)) });
		// });
		this.props.socket.on('editorState', function(currentContentRaw){
			//1. store에 저장
			panel.props.changeContentState(currentContentRaw);
			let currentContent = convertFromRaw(currentContentRaw);
			//2. editor 상태변경
			panel.setState({editorState : EditorState.moveSelectionToEnd(EditorState.createWithContent(currentContent)) })
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
				<button onClick={this._onBoldClick}>Bold</button>
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