import React, { Component } from 'react';

import { CpuChart } from '../Charts';

export default class Page1 extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <CpuChart />
      </div>
    )
  }
}
