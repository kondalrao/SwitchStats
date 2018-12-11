import React, { Component } from 'react';

import { Navbar } from 'react-bulma-components/full';

export default class Header extends Component {
  render() {
    return (
      <Navbar fixed="top" transparent color='white'>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="/">
            <img src="/gear-favicon.png" alt="Switch Statistics" />
            Switch Statistics
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item href="#">Second</Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item href="#">At the end</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    );
  }
}
