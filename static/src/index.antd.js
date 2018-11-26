import React from "react";
import { HashRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

const { Content, Header, Footer, Sider } = Layout;

// import 'antd/dist/antd.css'
import "./assets/css/antd.css";

import AppHeader from './components/Layout/AppHeader'
import AppSidebar from './components/Layout/AppSidebar'
import AppFooter from "./components/Layout/AppFooter";
import AppContent from "./components/Layout/AppContent"

export default class AntdApp extends React.Component {
  render() {
    return (
    <HashRouter>
        <Layout>
            <AppSidebar/>
            <Layout style={{ marginLeft: 200 }}>
                <AppHeader/>
                <AppContent/>
                <AppFooter/>
            </Layout>
        </Layout>
    </HashRouter>
    );
  }
}
