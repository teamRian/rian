import React from 'react';

//Libaries
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

//Components
//import WhiteBoardTitle from './WhiteBoardTitle';
import WhiteBoardPanel from './WhiteBoardPanel';
//import WhiteBoardState from './WhiteBoardState';

//const socket = io.connect(process.env.SOCKET_URL || 'localhost:8000');
const socket = io('/whiteboard');
			socket.on('connectMsg', (data) => { console.log('connected data : ', data) } );		

class WhiteBoard extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			editorCnt : 1
		}
		this.addEditor.bind(this);
	}

	addEditor(){
		console.log("clicked");
	}

	render(){
		
		return (
			<div className="white-board-box">
				<p>Im WhiteBoard</p>
				<div onClick={this.addEditor} className="white-board-panel-box">
					<SocketProvider socket={socket}>
							<WhiteBoardPanel 
								contentCurrentStateRaw={this.props.contentCurrentStateRaw}
								changeContentState={this.props.changeContentState}
							/>
					</SocketProvider>
				</div>
			</div>
		)

	} // render function end

}


export default WhiteBoard;