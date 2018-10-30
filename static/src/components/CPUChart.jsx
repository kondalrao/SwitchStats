import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import * as d3 from "d3";
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';
// import { socket } from '../connection';

export default class CPUChart extends Component {
    constructor (props) {
        super(props);

        this.svgWidth = 600
        this.svgHeight = 300;
        this.margin = { top: 20, right: 20, bottom: 30, left: 50 };
        this.width = this.svgWidth - this.margin.left - this.margin.right;
        this.height = this.svgHeight - this.margin.top - this.margin.bottom;

        // Getting initial data;
        var data = [];
        var step = 0;
        for (step = 0; step < 100; step++) {
            data.push({
                user: 0,
                system: 0,
                idle: 0});
        }

        this.state = {
            data: data,
            text: 'CPU Stats',
        }

        autoBind(this);
    }

    componentDidMount() {
        // create chart and do first data bind
        this.timer = setInterval(this.updateData, 1000);
    }

    shouldComponentUpdate() {
        // console.log("shouldComponentUpdate: " + this.state.data.length)
        if(this.state.data.length > 100)
            return true;

        return false;
    }
      
    componentDidUpdate() {
        // update chart with new data
        // console.log("componentDidUpdate");
        this.shiftData();
    }

    componentWillMount () {
        // starts an interval to update alphabet
    }

    componentWillUnmount () {
        // cleanup after chart
        console.log("componentWillUnmount: Closing the socket.");
        clearInterval(this.timer);
    }

    _getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    updateData () {
        var data = {};
        data.data = [ this._getRndInteger(0,100),
                      this._getRndInteger(0,100),
                      this._getRndInteger(0,100),
                      this._getRndInteger(0,100)];

        this.handleData(data);
    }

    handleData (e) {
        // console.log('handleData: ', e.data);
        let values = e.data;
        let currData = this.state.data;

        currData.push({ user: values[0],
                        system: values[2],
                        idle: values[3]});
        // if (currData.length > 100) {
        //     currData.shift();
        // }

        this.setState({data: currData});
    }

    shiftData() {
        let currData = this.state.data;

        // console.log(currData);
        currData.shift();
        this.setState({data: currData});
    }

    render () {
        var values = this.state.data;
        var user = [];
        var system = [];
        var idle = [];
        values.forEach((value, index) => user.push({idx:index, value:value.user}));
        values.forEach((value, index) => system.push({idx:index, value:value.system}));
        values.forEach((value, index) => idle.push({idx:index, value:value.idle}));

        return (
            <div>
                <pre>{this.state.text} <br/>
                User: {values.user} System: {values.system} Idle: {values.idle}</pre>
            <VictoryChart
                // animate={{ duration: 1000}}
            >
                <VictoryAxis
                    tickValues={[0, 20, 40, 60, 80, 100]}
                    // tickFormat={["0", "20", "40", "60", "80"]}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={[0, 20, 40, 60, 80, 100]}
                    tickFormat={["0", "20", "40", "60", "80", "100"]}
                />
                <VictoryLine 
                    data = {user}
                    x = {(d) => d.idx}
                    y = {(d) => d.value}
                    interpolation="natural"
                    style={{ data: { stroke: "green", strokeWidth: 2, strokeLinecap: "round" } }}
                />
                <VictoryLine 
                    data = {system}
                    x = {(d) => d.idx}
                    y = {(d) => d.value}
                    interpolation="natural"
                    style={{ data: { stroke: "blue", strokeWidth: 2, strokeLinecap: "round" } }}
                />
                <VictoryLine 
                    data = {idle}
                    x = {(d) => d.idx}
                    y = {(d) => d.value}
                    interpolation="natural"
                    style={{ data: { stroke: "orange", strokeWidth: 2, strokeLinecap: "round" } }}
                />
            </VictoryChart>
            </div>
        );
    }
}