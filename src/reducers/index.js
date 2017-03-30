import { combineReducers } from 'redux'
import {
	// SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
	// REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// Import Reducers
import * as UserReducer from './UserReducer';
import * as CalendarReducer from './CalendarReducer';
import * as PlanReducer from './PlanReducer';
import * as TodosReducer from './TodosReducer.js';
import * as FileManagementReducer from './FileManagementReducer.js';
import * as ProjectReducer from './ProjectReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer';
import { firebaseStateReducer } from 'react-redux-firebase';
import * as NoteTimelineReducer from './NoteTimelineReducer';
import * as FirebaseChatReducer from './FirebaseChatReducer'
import {
    SubscriptionClient,
    addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import WebSocket from 'ws'

import ApolloClient, { createNetworkInterface } from "apollo-client";

// Create a normal network interface:
const networkInterface = createNetworkInterface({
    uri: "http://localhost:8000/graphql"
});

//Make subsciption server
const wsClient = new SubscriptionClient("ws://localhost:8000/subscriptions", {
    reconnect: true
}, WebSocket);
// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);
// Finally, create your ApolloClient instance with the modified network interface
export const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
});

// export const client = new ApolloClient();



export const rootReducer = combineReducers(
	Object.assign(
		{}, 
		UserReducer,
		TodosReducer,
		ProjectReducer,
		CalendarReducer,
		PlanReducer,
		NoteEditorReducer,
		WhiteBoardReducer,
		FileManagementReducer,
  	{firebase: firebaseStateReducer},
  	NoteTimelineReducer,
  	FirebaseChatReducer,
  	{apollo: client.reducer()}
	))


