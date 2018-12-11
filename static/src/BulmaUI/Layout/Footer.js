import React, { Component } from 'react';

import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import BulmaFooter from 'react-bulma-components/lib/components/footer';

export default class Footer extends Component {
  render() {
    return (
      <BulmaFooter style={{ padding: '1rem 1.5rem' }}>
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <p>
              <strong>SwitchStatistics</strong> by Kondal Rao Komaragiri
            </p>
          </Content>
        </Container>
      </BulmaFooter>
    );
  }
}
