import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { rootResolver } from '../resolvers/resolvers.js';
const typeDefs = `
type Comment {
    id: String
    content: String
}

type Query {
	id: String!
}

type Subscription {
  commentAdded(repoFullName: String!): Comment
}

schema {
  query: Query
  subscription: Subscription
}
`;

const schema = makeExecutableSchema({ typeDefs, rootResolver });
export { schema }