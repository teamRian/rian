import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json'

import { resolvers } from '../resolvers/resolvers.js';
const typeDefs = `
type Query {
   noteTimeline: JSON
   channels(id: Test!): [Channel]
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

enum Test {
	rock
	metal
}
`;



const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema }