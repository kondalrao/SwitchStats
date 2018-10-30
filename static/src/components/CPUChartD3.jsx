import React, { Component, } from 'react';
import autoBind from 'react-autobind';
import * as d3 from "d3";
import {LinePath} from "@vx/shape";
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';


export default class CPUChartD3 extends Component {
    constructor (props) {
        super(props);
        autoBind(this);

        this.state = {
            widthScale: d3
                .scaleBand()
                .domain(d3.range(0, this.props.data.length))
                .range([0, this.props.width]),
            heightScale: d3
                .scaleLinear()
                .domain([0, d3.max(this.props.data)])
                .range([0, this.props.height])
        }

        this.svgWidth = this.props.width;
        this.svgHeight = this.props.height;
        this.margin = {top: 30, right: 30, bottom: 30, left: 30};
        this.width = +this.svgWidth - this.margin.left - this.margin.right;
        this.height = +this.svgHeight - this.margin.top - this.margin.bottom;
        // d3.timer(this.update, 1000, 1000);
    }

    update() {
        console.log("update");
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        console.log(prevState);
        let { widthScale, heightScale } = prevState;
    
        widthScale.domain(d3.range(0, nextProps.data.length));
        heightScale.domain([0, d3.max(nextProps.data)]);
    
        prevState = { ...prevState, widthScale, heightScale };
        return prevState;
      }

    componentDidMount() {
        // create chart and do first data bind
        console.log("componentDidMount: Create chart and do first data bind.");
    }

    componentDidUpdate() {
        // update chart with new data
        console.log("componentDidUpdate")
    }

    componentWillEnter(callback) {
        // start enter transition, then callback()
        // componentWillEnter: is the same as d3’s .enter()
        console.log("componentWillEnter");
    }
 
    componentWillLeave(callback) {
        // start exit transition, then callback()
        // componentWillLeave: is the same as d3’s .exit()
        console.log("componentWillLeave")
    }

  render() {
    const { x, y, data, height } = this.props,
    { widthScale, heightScale } = this.state;

    return (
        <div className="graph">
        <svg width="100%" height="500">
            <g transform={`translate(${x}, ${y})`} >
                {data.map((d, i) => (
                    <rect
                        x={widthScale(i)}
                        y={height - heightScale(d)}
                        width={widthScale.bandwidth()}
                        style={{
                            fill: "blue"
                        }}
                        key={i}
                    />
                ))}
            </g>
        </svg>
        </div>
    )
  }
}
