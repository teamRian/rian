import React, { Component } from 'react';
import Message from './Message';


const io = require('socket.io-client');

export default class MessageList extends Component {
	// static propTypes = {
	//   addTodo: PropTypes.func.isRequired
	// };
	
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<div className='messages chat'>
							{
									this.props.messages.map((message, i) => {
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