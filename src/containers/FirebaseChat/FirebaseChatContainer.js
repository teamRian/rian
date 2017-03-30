import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import "./css/style.css";
import { graphql, compose } from "react-apollo";

import gql from "graphql-tag";

// import {
//     SubscriptionClient,
//     addGraphQLSubscriptions
// } from "subscriptions-transport-ws";
// import ApolloClient, { createNetworkInterface } from "apollo-client";
// //Make subsciption server
// const wsClient = new SubscriptionClient("ws://localhost:8000/subscriptions", {
//     reconnect: true
// });
// // Create a normal network interface:
// const networkInterface = createNetworkInterface({
//     uri: "http://localhost:8000/graphql"
// });
// // Extend the network interface with the WebSocket
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//     networkInterface,
//     wsClient
// );
// // Finally, create your ApolloClient instance with the modified network interface
// const client = new ApolloClient({
//     networkInterface: networkInterfaceWithSubscriptions
// });

class FirebaseChatContainer extends Component {

  

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        nextProps.subscribeToNewComments({
            repoFullName: 'testSubscription',
        });
    }

    render() {
        return (
            <div>
                <button type="button">Query</button>
                <button type="button">Mutation</button>

            </div>
        );
    }
}

FirebaseChatContainer.propTypes = {
        subscribeToNewComments: PropTypes.func.isRequired,
}


function mapState(state) {
    return {
        userid: state.User._id
    };
}

function mapDispatch(dispatch) {
    return {

    };
}




 const COMMENT_QUERY = gql`
    query Comment($repoName: String! $id: Int!) {
      entry(repoFullName: $repoName) {
      	repoFullName
        comments(id: $id) {
          id
          content
        }
      }
    }
`;

 const COMMENTS_SUBSCRIPTION = gql`
    subscription onCommentAdded($repoName: String! $id: Int!){
      commentAdded(repoFullName: $repoName id: $id){
        id
        content
      }
    }
`;




const withData = graphql(COMMENT_QUERY, {
    name: 'comments',
    options: () => ({
        variables: {
            repoName: 'testrock',
            id:1,
        },
    }),
    props: props => {
        return {
            subscribeToNewComments: params => {
                
            	console.log('params', params)
                
                console.log('props', props )   
                return props.comments.subscribeToMore({
                    document: COMMENTS_SUBSCRIPTION,
                    variables: {
                        repoName: 'testrock',
                        id: 1,
                    },

                    updateQuery: (prev, {subscriptionData}) => {
                     
                     if (!subscriptionData.data) {
                         return prev;
                     }

                     const newFeedItem = subscriptionData.data.commentAdded;

                     return Object.assign({}, prev, {
                        entry: {
                            comments: [newFeedItem, ...prev.entry.activities]
                        }
                     });

                    }


                   
                });
            }
        };
    },
});


export default compose(
	withData,
	connect(mapState, mapDispatch)
)(FirebaseChatContainer)


// const ListWithData = withCloneList(FirebaseChatContainer);
// export default connect(mapState, mapDispatch)(ListWithData);




