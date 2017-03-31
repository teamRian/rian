import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from '../resolvers/resolvers.js';
const typeDefs = `
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

type Query {
   channels(id: Test!): [Channel]
   entry(repoFullName: String!): Repo
}

type Message {
  chatRoom: Int!
  id: Int!
  content: String
}

type Mutation {
   sendMessages(chatRoom:Int!, id: Int!, content: String): Message
}

type Subscription{
   commentAdded(chatRoom: String!, id: Int!): Message
}

schema {
   query: Query
   mutation: Mutation
   subscription: Subscription
}

enum Test {
	rock
	metal
}
`;



const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema }