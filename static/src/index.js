import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import Store from './Store';
import AntdUI from './AntdUI';

render(
  <Provider store={Store}>
    <HashRouter>
      <AntdUI />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
