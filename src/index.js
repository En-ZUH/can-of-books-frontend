import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6q8-1lgj.eu.auth0.com"
      clientId="W8Mf3wVGN3g8jiCV6Hom8UN2zXps1znN"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);




