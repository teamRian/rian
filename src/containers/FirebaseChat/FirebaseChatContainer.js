import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MetalofRianFirebaseChat from '../../components/FirebaseChat/MetalofRianFirebaseChat.js'
import ChatNotification from '../../components/FirebaseChat/ChatNotification.js'
import {  } from '../../actions/FirebaseChatActions.js';
import debounce from 'lodash.debounce';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
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

	componentWillReceiveProps(nextProps) {
		// console.log('Next Props', nextProps)
	}

	changeList(){
		this.setState((prevState, props) => ({list: !prevState.list}))
	}

	render(){
		const tempdata = !isLoaded(this.props.chat) 
		  ? 'is Loading'
		    : isEmpty(this.props.chat)
		      ? 'temp is Empty'
		        : console.log(this.props.chat)

		return (
			  <div>
			  	<button onClick={ ()=>{this.changeList()} }/>
				<div className="ChatContainer">
					{!this.state.list && <MetalofRianFirebaseChat userid={this.props.userid} chatRoomId={this.state.nowRender} firebase={this.props.firebase}/>}
					{this.state.list && <ChatNotification chatList={this.props.chat} goToChatRoom={this.goToChatRoom.bind(this)}/>}
				</div>
			  </div>
			
		)

	}

}


function mapState(state) {
  var {firebase} = state
  return { 
  	firebase: firebase,
  	userid: state.User._id,
    chat: dataToJS(firebase, '/chat')
  }
}

function mapDispatch(dispatch) {
  return {
  };
}

const giveProps = connect(({ User })=>({ userid: User._id}))(FirebaseChatContainer)

const wrappedFirebaseContainer = firebaseConnect( ({ userid }) => ([
  `/chat#orderByChild=members/${userid}&equalTo=true`
]))(giveProps)


export default connect(mapState, mapDispatch)(wrappedFirebaseContainer)

