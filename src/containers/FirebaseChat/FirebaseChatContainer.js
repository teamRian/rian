import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MetalofRianFirebaseChat from '../../components/FirebaseChat/MetalofRianFirebaseChat.js'
import ChatNotification from '../../components/FirebaseChat/ChatNotification.js'
import { updateFirebaseChatList } from '../../actions/FirebaseChatActions.js';
import debounce from 'lodash.debounce';
import './css/style.css';
class FirebaseChatContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: true,
			nowRender: null
		}
		this.changeList = this.changeList.bind(this)
		this.goTochatRoom = this.goToChatRoom.bind(this)
	}

	goToChatRoom(chatRoomId){
		this.setState((prevState, props)=>(
			{ 
				list: false,
				nowRender: chatRoomId,
			}
		))
	}

	componentDidMount() {
		firebase.database().ref('/users/' + this.props.userid + '/ChatRoom').on('value', (data)=>{
			console.log("firebase chat", data.val())
				var chatroomlist = Object.keys(data.val())
		this.props.updateFirebaseChatList(chatroomlist)
		})
	}

	changeList(){
		this.setState((prevState, props) => ({list: !prevState.list}))
	}

	render(){

		return (
			  <div>
			  	<button onClick={ ()=>{this.changeList()} }/>
				<div className="ChatContainer">
					{!this.state.list && <MetalofRianFirebaseChat userid={this.props.userid} chatRoomId={this.state.nowRender} />}
					{this.state.list && <ChatNotification userid={this.props.userid} chatList={this.props.chat} goToChatRoom={this.goToChatRoom.bind(this)}/>}
				</div>
			  </div>
			
		)

	}

}


function mapState(state) {
  return {
  	userid: state.User._id,
  	chat: state.FirebaseChat.chatroomlist
  }
}

function mapDispatch(dispatch) {
  return {
  	updateFirebaseChatList: (chatroomlist)=>dispatch(updateFirebaseChatList(chatroomlist))
  };
}

export default connect(mapState, mapDispatch)(FirebaseChatContainer)

