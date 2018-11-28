import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import Home from '../Pages/Home'
import Page1 from '../Pages/Page1'

const { Content } = Layout;

export default class AppContent extends Component {
    render() {
        return (
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', height: '85vh'}}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/page1" component={Page1}/>
                    </Switch>
                </div>
            </Content>
        )
    }
}
