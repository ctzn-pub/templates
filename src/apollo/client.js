import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GATSBY_HASURA_GRAPHQL_URL,
    headers: {
      'x-hasura-admin-secret': process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});
