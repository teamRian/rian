import React, { Component, PropTypes } from 'react';


class ChatNotification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatList: null
		}
		this.renderChatList = this.renderChatList.bind(this)
		
	}

	componentDidMount() {
		this.setState((prevState, props)=>({chatList: this.renderChatList(this.props.chatList)}))
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.chatList !== nextProps.chatList) {
			console.log('change')
			this.setState((prevState, props)=>({chatList: this.renderChatList(nextProps.chatList)}))
		}

	}

	renderChatList(props){
		var result = []
		var count = 0
		for (let key in props) {
			var temp = <div key={count} onClick={ ()=>{console.log(key); this.props.goToChatRoom(key)} }>{key}</div>
			result.push(temp)
			count++
		}
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