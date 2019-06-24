import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloProvider} from 'react-apollo';
import Client from './Client';

const Root = () => (
  <ApolloProvider  client={Client}>
    <App />
  </ApolloProvider>);

ReactDOM.render(<Root />, document.getElementById('root'));
