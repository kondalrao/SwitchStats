import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { init } from "@rematch/core";
import { Provider } from "react-redux";

import * as models from "@switch-stats/models";
import AntdApp from '@switch-stats/antd-ui'

// generate Redux store
const store = init({
    models
});

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AntdApp/>
            </BrowserRouter>
        </Provider>
    );
}

// eslint-dable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'))
