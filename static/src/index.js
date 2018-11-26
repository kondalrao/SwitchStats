import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { init } from "@rematch/core";
import { Provider } from "react-redux";

import * as models from './models';
import AntdApp from './index.antd'

// generate Redux store
const store = init({
    models
});


const App = () => {
    return (
        <Provider store={store}>
        <AntdApp />
        </Provider>
    );
}

// eslint-dable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'))
