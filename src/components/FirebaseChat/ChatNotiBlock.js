import React, { Component, PropTypes } from 'react';

class ChatNotiBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onUpdate: '没有'
		}
	this.onFirebaseNoti = this.onFirebaseNoti.bind(this)
	this.firebaseRef = firebase.database().ref('/chat/' + this.props.chatRoomid + '/finalTimestamp/timestamp')
	
	}

	componentDidMount(){
		this.onFirebaseNoti(this.props.chatRoomid)
	}

	componentWillUnmount() {
		this.firebaseRef.off()
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextState)
		return true
	}

	onFirebaseNoti(chatroomId){
		this.firebaseRef.on('value', (data)=>{
			var that = this
			var finalstamp = data.val()
			console.log('FianlStamp', finalstamp)
			firebase.database().ref('/chat/' + chatroomId + '/readpoint/' + this.props.userid).once('value', (snapshot)=>{
				console.log("My timestamp", snapshot.val(), finalstamp)
				if (finalstamp <= snapshot.val().timestamp) {
					console.log('meiyou')
					that.setState((prevState, props)=>({
						onUpdate: '没有'
					}))
				} else {
					console.log('you')
					that.setState((prevState, props)=>({
						onUpdate: '有'
					}))
				}
			})
		})
	}



	render(){
		return (
			<div onClick={ ()=>{this.props.goToChatRoom(this.props.chatRoomid)} }>{this.props.chatRoomid}{this.state.onUpdate}</div>
		)
	}
}

export default ChatNotiBlock