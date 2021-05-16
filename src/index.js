import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
    domain="dev-6q8-1lgj.eu.auth0.com"
    clientId="M7wlpZuSKYg0ywtQxg1ioNpQ2a75mBgW"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app')
);

