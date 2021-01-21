import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GATSBY_HASURA_GRAPHQL_URL2,
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
