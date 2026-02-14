import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { store } from './store'

// Basic error boundary-like check
window.onerror = function (message, source, lineno, colno, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; color: white; background: #8b0000; font-family: sans-serif; border-radius: 10px; margin: 20px;">
        <h1 style="margin: 0">Oops! 💥</h1>
        <p>The app crashed with this error:</p>
        <pre style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; white-space: pre-wrap;">${message}</pre>
        <p style="font-size: 0.8rem; opacity: 0.7">${source}:${lineno}:${colno}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; cursor: pointer; border: none; border-radius: 5px; background: white; color: #8b0000; font-weight: bold;">Try Refreshing</button>
      </div>
    `;
  }
  return false;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)


