import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MetalofRianFirebaseChat from '../../components/FirebaseChat/MetalofRianFirebaseChat.js'
import {  } from '../../actions/FirebaseChatActions.js';
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import firebase from 'firebase';





class FirebaseChatContainer extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

		

	}

	render(){
		
		const tempdata = !isLoaded(this.props.chat) 
		  ? 'is Loading'
		    : isEmpty(this.props.chat)
		      ? 'temp is Empty'
		        : console.log(this.props.chat)
		return (
			<div>
			</div>
		)
	}

}


function mapState(state) {
  var {firebase} = state
  return { 
  	userid: state.User._id,
    chat: dataToJS(firebase, '/chat')
  }
}

function mapDispatch(dispatch) {
  return {

  };
}

const wrappedFirebaseContainer = firebaseConnect([
  '/users', '/chat#orderByChild=members/duckyoun&equalTo=true'
])(FirebaseChatContainer)


export default connect(mapState, mapDispatch)(wrappedFirebaseContainer)

