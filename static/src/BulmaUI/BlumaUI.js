import React, { Component } from 'react';

import { Header, Content, Footer } from './Layout';

import 'bulma/bulma.sass';
import 'react-bulma-components/src/index.sass';
import jsStyles from './BulmaUI.css.js';

export default class BulmaUI extends Component {
  render() {
    return (
      <div style={jsStyles.Site}>
        <Header />
        <div style={jsStyles.SiteContent}>
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}
