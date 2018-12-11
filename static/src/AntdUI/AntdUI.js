import React, { Component } from 'react';
import { Layout } from 'antd';

import { Menu, Header, Content, Footer } from './Layout';

import "antd/dist/antd.less";
import "antd/lib/style/themes/default.less";
import "ant-design-pro/dist/ant-design-pro.css";
import "ant-design-pro/lib/style/themes/default.less";
import './index.less';

export default class AntdUI extends Component {
  render() {
    return (
      <div className='site'>
        <Layout>
          <Menu/>
          <Layout style={{ marginLeft: 200 }}>
            <Header/>
            <div className='site-content' >
              <Content />
            </div>
          </Layout>
        </Layout>
        <Footer />
      </div>
    );
  }
}
