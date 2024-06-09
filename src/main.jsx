import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './app';
import { SnackbarProvider } from './components/snackbar';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <SnackbarProvider maxSnack={3}>
          <GoogleOAuthProvider clientId="578454885769-3ufucnbiqsick33hgo0hr6fjreo5h3ki.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </SnackbarProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
