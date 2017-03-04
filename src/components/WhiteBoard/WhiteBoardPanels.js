import React from 'react';

//Libaries
import { Editor, EditorState, RichUtils, ContentState, ContentBlock, convertToRaw, convertFromRaw, convertFromHTML, CompositeDecorator } from 'draft-js';
import { socketConnect } from 'socket.io-react';

//Componenets
import WhiteBoardPanel from './WhiteBoardPanel.js';

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

class WhiteBoardPanels extends React.Component{

	constructor(props) {
		super(props);
	}

	render(){

		return(
			<div className="white-board-panel-box">
				{
					this.props.editors.map( (editorState, idx) => {
						return (
							<WhiteBoardPanel socket={this.props.socket} idx={idx} key={idx}
								contentCurrentStateRaw={this.props.contentCurrentStateRaw}
								changeContentState={this.props.changeContentState}				
								editors={this.props.editors}
								changeEditorState={this.props.changeEditorState}
								addEditorState={this.props.addEditorState}
							/>
						)
					}, this)
				}

			</div>
		)

	}

}



				// <WhiteBoardPanel socket={this.props.socket} key={1}
				// 	contentCurrentStateRaw={this.props.contentCurrentStateRaw}
				// 	changeContentState={this.props.changeContentState}				
				// />
				// <WhiteBoardPanel socket={this.props.socket} key={2}
				// 	contentCurrentStateRaw={this.props.contentCurrentStateRaw}
				// 	changeContentState={this.props.changeContentState}
				// />


export default socketConnect(WhiteBoardPanels);