import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

// dev-k8exjz54buyom02n.us.auth0.com
// BmiYpTtYohxMnfRVE7oAdlnLoNlhsNSP 

ReactDOM.render(
  <React.StrictMode>

{/* //! HERE 1 */}
    <Auth0Provider
      domain="dev-k8exjz54buyom02n.us.auth0.com"
      clientId="BmiYpTtYohxMnfRVE7oAdlnLoNlhsNSP"
      redirectUri={window.location.origin}
    >

      <GithubProvider>
        <App />
      </GithubProvider>

    </Auth0Provider>

  </React.StrictMode>,
  document.getElementById('root')
);


