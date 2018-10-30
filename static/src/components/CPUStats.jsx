import React, { Component, } from 'react';
import { socket } from '../connection';

export default class CpuStats extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: 0,
            system: 0,
            idle: 0,
            text: 'CPU Stats',
        };

        this.socket = socket.getSocket();

        socket.subject('CPUStats').subscribe((data) => {
            this.handleData(data);
        });
    }

    // componentDidMount () {
    //     console.log("componentDidMount")
    //     this.socket = new RxSocket('localhost:4000')
    //     this.event$ = this.socket.observable('my event')
    //     this.event$.subscribe((data) => {
    //         console.log(data['data'])
    //         this.setState({ text: data['data'], });
    //     })
    // }

    // componentDidMount () {
    //     this.socket = socket.getSocket()
    //     console.log(this.socket)

    //     if (this.socket === undefined) return;

    //     // this.socket.on('CPUStats', (data) => {
    //     //             let values = data['data']
    //     //             console.log(values)
    //     //             this.setState({user: values[0], system: values[2], idle: values[3]})
    //     // });
    //     this.subscription = evtCPUStats.subscribe(
    //         (x) => this.handleData(x),
    //         (e) => console.log('error A: ' + e.message),
    //         () => console.log('completed A'))
    // }

    componentDidMount () {

    }

    componentWillUnmount () {
        console.log("componentWillUnmount: Closing the socket.")
        this.socket.close();
    }

    handleData (e) {
        console.log('handleData: ', e.data);
        let values = e.data;
        this.setState({user: values[0], system: values[2], idle: values[3]})
    }

    render () {
        return (
            // <div>Hello {this.state.number}</div>
            <div><pre>{this.state.text}</pre>
            <pre>User: {this.state.user}</pre>
            <pre>System: {this.state.system}</pre>
            <pre>Idle: {this.state.idle}</pre></div>
        );
    }
}
