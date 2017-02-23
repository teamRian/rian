import React from 'react';

//Libaries
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

//Components
import WhiteBoardTitle from './WhiteBoardTitle';
import WhiteBoardPanel from './WhiteBoardPanel';
import WhiteBoardState from './WhiteBoardState';

const socket = io.connect(process.env.SOCKET_URL || 'localhost:8000');
			socket.on('connectMsg', (data) => { console.log('connected data : ', data) } );		
class WhiteBoard extends React.Component{
	
	constructor(props) {
		super(props);
	}

	componentDidMount(){

	}

	render(){
		
		return (
			<div className="white-board-box">
				<p>Im WhiteBoard</p>
				<SocketProvider socket={socket}>		
					<WhiteBoardPanel/>
				</SocketProvider>
			</div>
		)

	} // render function end

}


export default WhiteBoard;