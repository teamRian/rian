import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import resolver from '../resolvers/RootResolver.js';
const RootSchema = `
type Query {
   noteTimeline: JSON
   channels: [Channel]
   entry(repoFullName: String!): Repo
}

type Mutation {
   sendMessages(chatRoom:Int!, id: Int!, content: String): Message
}

type Subscription{
   commentAdded(chatRoom: String!, id: Int!): Message
}

scalar JSON

type Channel {
   id: String!                
   user: String
}

type Repo {
  repoFullName: String!
  comments(id: Int!): Comment
}

type Comment{
  id: Int!
  content: String
}

type Message {
  chatRoom: Int!
  id: Int!
  content: String
}

schema {
   query: Query
   mutation: Mutation
   subscription: Subscription
}
`;

const schema = makeExecutableSchema({ 
	typeDefs: [RootSchema], 
	resolver
});

export { schema }