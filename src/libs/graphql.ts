import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL || ''
    : 'http://localhost:8080';

/**
 * @description Default Client
 */
export const defaultApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
});

/**
 * @description Overriding Client
 */
const httpLink = createHttpLink({
  uri: `${url}/blogs`,
});
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token') || '';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
export const blogsApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
