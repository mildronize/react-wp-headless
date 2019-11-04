import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';
import AppRouter from './pages/AppRouter';
import Config from './config';
import ScrollToTop from 'react-router-scroll-top';

// Apollo GraphQL client
const client = new ApolloClient({
  link: createHttpLink({
    uri: Config.gqlUrl,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
    <ApolloProvider client={client}> 
        <AppRouter />
    </ApolloProvider>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root'),
);
