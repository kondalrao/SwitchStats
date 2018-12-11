import React, { Component } from 'react';

import Container from 'react-bulma-components/lib/components/container';
// import BulmaContent from 'react-bulma-components/lib/components/content';
import Columns from 'react-bulma-components/lib/components/columns';

import Menu from './Menu';

export default class Content extends Component {
  render() {
    return (
      <Container fluid>
        <Columns>
          <Columns.Column size={3} color='grey'>
            <Menu/>
          </Columns.Column>
          <Columns.Column size={9}>
            <p className="bd-notification is-success">dewfqfsB </p>
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}
