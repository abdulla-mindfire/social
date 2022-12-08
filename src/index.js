import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from './context/AuthContext'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Sentry.init({
//   dsn: "https://9a74859de93f42d690616171891215ac@o4504287363661824.ingest.sentry.io/4504287365955584",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
