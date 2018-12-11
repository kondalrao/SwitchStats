import React from "react";
import { inject } from 'rematch-inject';
import { Card, Row, Col } from 'antd';
import { message, notification } from 'antd';
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-streaming";

const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

const color = Chart.helpers.color;

class CPUChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timer: null
    }
  }

  onRefresh = (chart) => {
    console.log("onRefresh: " + this.props.cpuInfo);
    const data = this.props.cpuInfo;
    chart.config.data.datasets.forEach(function(dataset) {
      dataset.data.push({
        x: Date.now(),
        // y: Math.random()* Math.round(Math.random() * 100)
        y: data
      });
    });
  }

  tick = () => {
    this.openNotification()
    this.props.loadData();
  }

  openNotification = (timeout=2) => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification received.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      duration: timeout
    });
    message.info('message: Calling loadData', timeout);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 5000);
    this.setState({timer});
    this.props.loadData();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const data = {
      datasets: [
        {
          label: 'RCPU',
          backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
          borderColor: 'rgba(255,99,132,1)',
          fill: false,
          cubicInterpolationMode: 'monotone',
          data: [{x: Date.now(), y:0}]
        },
        // {
        //   label: 'LCPU',
        //   backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        //   borderColor: 'rgba(99,255,132,1)',
        //   fill: false,
        //   cubicInterpolationMode: 'monotone',
        //   data: [{x: Date.now(), y:0}]
        // }
      ]
    };

    const options = {
      title: {
        display: true,
        text: 'Realtime Chart'
      },
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            duration: 50000,
            refresh: 5000,
            delay: 10000,
            onRefresh: this.onRefresh
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'value'
          }
        }]
      },
      tooltips: {
        mode: 'nearest',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: false
      },
      annotation: {
          annotations: [{
          drawTime: 'afterDatasetsDraw',
          borderColor: 'red',
          borderDash: [2, 2],
          borderWidth: 2,
          mode: 'vertical',
          type: 'line',
          value: 10,
          scaleID: 'x-axis-0',
        }]
      },
      maintainAspectRation: false
    };

    return(
      <Row>
        <Col span={6} style={{textAlign: 'right', padding: '0px'}}>
        </Col>
        <Col span={18} style={{textAlign: 'left', padding: '0px 5px'}}>
          <Line data={data} options={options} height={100} />
        </Col>
      </Row>
    )
  }
}

export default inject('cpuInfo')(CPUChart);
