import React, { Component } from 'react'
import { inject } from 'rematch-inject';
import G2 from '@antv/g2';

class CpuChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      timer: null,
      counter: 0,
      chartData: [{x:0, y1:0}]
    };

    for (let i = 0; i < 20; i += 1) {
      this.state.chartData.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y1: Math.floor(Math.random() * 100) + 1000
      });
    }

    this.chart = null;
    G2.Global.renderer = 'svg';
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 5000);
    this.setState({timer});
    this.props.loadData();

    this.chart = new G2.Chart({
      container: document.getElementById('c1'),
      width: 600,
      height: 300,
      background: {
        fill: '#fff',
        fillOpacity: 1,
        stroke: '#aaa',
        strokeOpacity: 1,
        opacity: 1,
        lineWidth: 2
      }
    });
    this.chart.source(this.state.chartData);
    this.chart.scale({
      x: {
        type: 'time'
      },
      y: {
        type: 'timecat'
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick = () => {
    this.props.loadData();
    this.setState({
      counter: this.state.counter + 1
    });
    
    var Data = this.state.chartData;
    var newData = [...Data, {
      x: (new Date().getTime()),
      y1: Math.floor(Math.random() * 100)
    }];

    console.log(Data);
    console.log(newData)

    // this.setState({chartData: newData});
    this.chart.render();
  }

  render() {
    return (
      <div>
        <div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>
        <div>{this.props.cpuInfo}</div>
        CpuChart
        <div id="c1"></div>
      </div>
    )
  }
}

export default inject('cpuInfo')(CpuChart);