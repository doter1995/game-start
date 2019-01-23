import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import './index.scss';

var element = document.createElement('div');

// 通过import导入
element.id = 'app';
document.body.appendChild(element);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  element
);
