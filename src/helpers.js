import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

export const navigateTo = path => {
  window.history.pushState(null, null, path);
  renderApp();
};
