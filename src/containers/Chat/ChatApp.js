import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Chat from '../../components/Chat/Chat';
import * as chatActions from '../../actions/chatActions';
import '../../styles/Chat.css';

class ChatApp extends Component {
		constructor(props) {
			super(props);
			
		}

		componentWillMount() {
			const { dispatch, user } = this.props;	
		}

		render() {
				return (
						<div>
								<Chat changeName={this.props.changeName} {...this.props}/>
						</div>
				);
		}

}

function mapState(state) {

	return {
			user: state.chatUser.user,
			users: state.chatUser.joinusers,
			messages: state.chatApp.messages,
			changeName: state.chatApp.text//[] array지
	};
}

function mapDispatch(dispatch) {
	return {
			getMessage: (q) => dispatch(chatActions.newMessage(q))
	};

}


export default connect(mapState)(ChatApp);
