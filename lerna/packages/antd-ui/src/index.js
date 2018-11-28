import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import "antd/dist/antd.css";
import 'ant-design-pro/dist/ant-design-pro.css';

import AppHeader from '../components/Layout/AppHeader'
import AppSidebar from '../components/Layout/AppSidebar'
import AppFooter from "../components/Layout/AppFooter";
import AppContent from "../components/Layout/AppContent"

const { Content, Header, Footer, Sider } = Layout;

export default class AntdApp extends Component {
  render() {
    return (
      <Layout>
          <AppSidebar/>
          <Layout style={{ marginLeft: 200 }}>
              <AppHeader/>
              <AppContent/>
              <AppFooter/>
          </Layout>
      </Layout>
    )
  }
}

