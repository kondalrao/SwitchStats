import React, { Component } from 'react'
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux'

import store from 'store';
import App from './webroot';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
