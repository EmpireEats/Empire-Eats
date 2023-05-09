import React from 'react';
import store from './redux/store/configureStore';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import '../public/styles/index.css';
import { SocketProvider } from './contexts/SocketContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Router>
  </Provider>
);

