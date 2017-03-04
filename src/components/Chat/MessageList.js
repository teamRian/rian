import React, { Component } from 'react';
import Message from './Message';


const io = require('socket.io-client');

export default class MessageList extends Component {
	// static propTypes = {
	//   addTodo: PropTypes.func.isRequired
	// };
	
	constructor(props) {
		super(props);
		this.state = {
				messages: []
		}
	}

	componentDidMount() {
			// if(!!this.props.User._id){
			// 		this.setState({
			// 				messages: this.props.ChatHistory
			// 		})
			// } else {
			// 		this.setState({
			// 				messages: this.props.messages
			// 		})
			// }
	}

	render() {
		let messages = !!this.props.User._id ? this.props.ChatHistory.messages : this.props.messages;
		return (
			<div className='messages chat'>
							{
									messages.map((message, i) => {
											return (
													
													<Message
														key={i}
														username={message.username}													
														text={message.text}
														date={message.date_added}
														users={this.props.users}
														socket={this.props.socket}
													/>										
												
											);
									})
							}
			</div>
		);
	}
}