import React, { Component, PropTypes } from 'react';
import { updateFirebaseChatList } from '../../actions/FirebaseChatActions.js';
import { connect } from 'react-redux'
import debounce from 'lodash.debounce';
import './css/style.css';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag'

//make subsciption server
const wsClient = new SubscriptionClient('ws://localhost:8000/subscriptions', {
  reconnect: true
});
// Create a normal network interface:
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/graphql'
});
// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
// Finally, create your ApolloClient instance with the modified network interface
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});


class FirebaseChatContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: true,
			nowRender: null,
			haveChatRoom: false,
		}
	}



	componentWillReceiveProps(nextProps) {

		console.log("GraphQL", nextProps)
	}

	
	render(){

		return (
			  <div>
			  	
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

//graph query
const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;



const withCloneList = graphql(channelsListQuery);

const ListWithData = withCloneList(FirebaseChatContainer);
export default connect(mapState, mapDispatch)(ListWithData);

