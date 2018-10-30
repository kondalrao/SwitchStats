import React, { Component, } from 'react';
import * as d3 from "d3";
// import CPUChart from './CPUChart';
import CPUChartD3 from './CPUChartD3';

export default class App extends Component {

    state = {
        data: d3.range(34).map(Math.random),
    };
    
    render () {
        const { data, currentIndex } = this.state;

        return (
            <CPUChartD3 
                data={data}
                width={500}
                height={250}
                x={0}
                y={0}
            />
        );
    }
}
