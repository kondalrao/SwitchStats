import React, { Component } from 'react';

import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { Icon } from 'antd';

const copyright = <div> Switch Statistics <Icon type="copyright" />2018 by Kondal Komaragiri (kkomarag)</div>;

export default class SSFooter extends Component {
  render() {
    return (
    <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
      <GlobalFooter copyright={copyright}/>
    </div>
    );
  }
}
