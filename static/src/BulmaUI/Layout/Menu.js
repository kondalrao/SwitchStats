import React, { Component } from 'react';

import BulmaMenu from 'react-bulma-components/lib/components/menu';

export default class Menu extends Component {
  render() {
    return (
        <BulmaMenu>
        <BulmaMenu.List title="General">
          <BulmaMenu.List.Item>Dashboard</BulmaMenu.List.Item>
          <BulmaMenu.List.Item>Customer</BulmaMenu.List.Item>
        </BulmaMenu.List>
    
        <BulmaMenu.List title="Administration">
          <BulmaMenu.List.Item>Team Settings</BulmaMenu.List.Item>
          <BulmaMenu.List.Item>
            <BulmaMenu.List title="Manage Your Team">
              <BulmaMenu.List.Item>Members</BulmaMenu.List.Item>
              <BulmaMenu.List.Item>Plugins</BulmaMenu.List.Item>
              <BulmaMenu.List.Item>Add a member</BulmaMenu.List.Item>
            </BulmaMenu.List>
          </BulmaMenu.List.Item>
          <BulmaMenu.List.Item>Invitations</BulmaMenu.List.Item>
          <BulmaMenu.List.Item>Cloud Storage</BulmaMenu.List.Item>
          <BulmaMenu.List.Item>Authentication</BulmaMenu.List.Item>
        </BulmaMenu.List>
        <BulmaMenu.List title="Transactions">
          <BulmaMenu.List.Item>Payments</BulmaMenu.List.Item>
          <BulmaMenu.List.Item>Transfers</BulmaMenu.List.Item>
          <BulmaMenu.List.Item>Balance</BulmaMenu.List.Item>
        </BulmaMenu.List>
      </BulmaMenu>
    );
  }
}
