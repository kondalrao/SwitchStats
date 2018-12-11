import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      chartData: {
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    };
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 5000);
    this.setState({timer});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick = () => {
    var chartData = this.state.chartData;
    var data = chartData.datasets[0].data;

    console.log(data);

    var newData = [...data, {
      x: (new Date().getTime()),
      y1: Math.floor(Math.random() * 100)
    }];
    chartData.datasets[0].data = newData;
    this.setState({chartData})
  }

  render() {
    return (
    <div>
        <h2>Line Example</h2>
        <Line data={this.state.chartData} />
      </div>
    )
  }
}
