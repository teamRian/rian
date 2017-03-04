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

// editors
// changeEditorState
// addEditorState

class WhiteBoardPanel extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			editorState : EditorState.createEmpty()
		}
		console.log(this.props);
		console.log(this.state.editorState)
		/* 생성될때 editorState를 editors reducer에 추가! */
		
		this.props.changeEditorState(this.state.editorState, this.props.idx);
		/* 그리고, socket으로 보내야함! 개발! */

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
			// panel.props.changeContentState(currentContentRaw);

			let currentContent = convertFromRaw(currentContentRaw);
			//1. editor 상태변경
			panel.setState({editorState : EditorState.moveSelectionToEnd(EditorState.createWithContent(currentContent)) });
			//2. stor에 저장
			panel.props.changeEditorState(panel.state.editorState, panel.props.key);
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