import React, { Component, PropTypes } from 'react';
import ChatNotiBlock from "./ChatNotiBlock.js"

class ChatNotification extends Component {
	constructor(props) {
		super(props);
		this.renderChatList = this.renderChatList.bind(this)
		this.state = {
			chatList: this.renderChatList(this.props.chatList),
			chatroomListid: this.props.chatList.map
		}
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.chatList !== nextProps.chatList) {
			console.log('Chat Room list change')
			this.setState((prevState, props)=>({
				chatList: this.renderChatList(nextProps.chatList),
				chatroomListid: nextProps.chatList
			}))
		}

	}

	renderChatList(props){

		var result = props.map((a, index)=>{
			console.log(this.props)
			return <ChatNotiBlock chatRoomid={a} userid={this.props.userid} key={index} goToChatRoom={this.props.goToChatRoom} />
		})
		console.log('here', result)
		return result
	}	


	render(){

		return (
			<div>
			  {this.state.chatList}
			</div>
		)
	}
}

export default ChatNotification