import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import "./css/style.css";
import {
    SubscriptionClient,
    addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { graphql } from "react-apollo";

import gql from "graphql-tag";

//Make subsciption server
const wsClient = new SubscriptionClient("ws://localhost:8000/subscriptions", {
    reconnect: true
});
// Create a normal network interface:
const networkInterface = createNetworkInterface({
    uri: "http://localhost:8000/graphql"
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
        this.state = {};
    }

    componentWillMount() {
        this.props.subscribeToNewComments({
            repoFullName: this.props.userid
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log("GraphQL", nextProps);
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

function mapState(state) {
    return {
        userid: state.User._id
    };
}

function mapDispatch(dispatch) {
    return {};
}

// FirebaseChatContainer.propTypes = {
//     repoFullName: PropTypes.string.isRequired,
//     subscribeToNewComments: PropTypes.func.isRequired
// };

//graph query
const COMMENT_QUERY = gql`
    query Comment($repoName: String!) {
      entry(repoFullName: $repoName) {
        comments {
          id
          content
        }
      }
    }
`;

const COMMENTS_SUBSCRIPTION = gql`
    subscription onCommentAdded($repoFullName: String!){
      commentAdded(repoFullName: $repoFullName){
        id
        content
      }
    }
`;

const withData = graphql(COMMENT_QUERY)

// const withData = graphql(COMMENT_QUERY, {
//     name: "comments",
//     options: ({userid}) => ({
//         variables: {
//             repoName: userid
//         }
//     }),
//     props: props => {
//         return {
//             subscribeToNewComments: params => {
//                 return props.comments.subscribeToMore({
//                     document: COMMENTS_SUBSCRIPTION,
//                     variables: {
//                         repoName: params
//                     },
//                     updateQuery: (prev, { subscriptionData }) => {
//                         if (!subscriptionData.data) {
//                             return prev;
//                         }

//                         const newFeedItem = subsscriptionData.data.commentAdded;

//                         return Object.assign({}, prev, {
//                             entry: {
//                                 comments: [
//                                     newFeedItem,
//                                     ...prev.entry.activities
//                                 ]
//                             }
//                         });
//                     }
//                 });
//             }
//         };
//     }
// });

const CommentsPageWithData = withData(FirebaseChatContainer);

export default connect(mapState, mapDispatch)(CommentsPageWithData);
