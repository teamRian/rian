import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Chat from '../../components/Chat/Chat';
import * as chatActions from '../../actions/chatActions';
import '../../styles/Chat.css';


class ChatApp extends Component {
		constructor(props) {
			super(props);
			
		}


		render() {
				return (
						<div>
								<Chat {...this.props}/>
						</div>
				);
		}

}

function mapState(state) {

	return {
			User: state.User,
			Chatlog: state.chatLogs,
			user: state.chatApp.user,
			users: state.chatUser.joinusers,
			ChatHistory: state.chatReq
	};
}

function mapDispatch(dispatch) {
	return {
			chatRequest: () => {
				dispatch(chatActions.chatRequest())
			},
			chatPost: (logs) => {
				dispatch(chatActions.chatPost(logs))
			},
			getMessage: (msg) => {
				dispatch(chatActions.newMessage(msg))
			},
			newUser: (user) => {
				dispatch(chatActions.newUser(user))
			},
			userJoin: (user) => {
				dispatch(chatActions.userJoin(user))
			},
			userLeft: (user) => {
				dispatch(chatActions.userLeft(user))
			}
	};

}


export default connect(mapState, mapDispatch)(ChatApp);
