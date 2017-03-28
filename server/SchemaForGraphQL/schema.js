import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from '../resolvers/resolvers.js';
const typeDefs = `
type Channel {
   id: ID!                
   name: String
}
type Query {
   channels: [Channel]
}
type Mutation {
 addChannel(name: String!): Channel
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema }