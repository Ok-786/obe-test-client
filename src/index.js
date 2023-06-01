import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/Reducers';
// import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
import { ApolloProvider, ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { HttpLink } from "@apollo/client/link/http";
import Routes from './Routes';
import { ToastContainer, toast } from 'react-toastify';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:7000/",
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <ApolloProvider client={client}>
      <>
        <Routes />
        <ToastContainer />
      </>
    </ApolloProvider>
  </Provider >
);

