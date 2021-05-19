import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';

import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloClient, ApolloLink, HttpLink ,InMemoryCache, ApolloProvider,  } from '@apollo/client';

import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';

import { split } from 'apollo-link';


const GRAPHQL_URL = 'localhost:4000'

const httpLink = new HttpLink({
  uri: `${GRAPHQL_URL}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_URL}`,
  options: { reconnect: true },
});

const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const httpAuthLink = authLink.concat(httpLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpAuthLink,
);

export default new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    link,
  ]),
  cache,
});