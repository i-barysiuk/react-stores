import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-client-preset';
import {ApolloClient} from 'apollo-client';
import CreateClientStore from './CreateClientStore';

const cache = new InMemoryCache();

const stateLink = CreateClientStore(cache);

const Client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
  ]),
  cache: cache,
});

export default Client;