import React, { Component } from 'react'
import { inject } from 'rematch-inject'
import { connect } from "react-redux";

import Comp1 from 'comp1'
import Comp2 from 'comp2'

class App extends Component {

    componentWillMount() {
        this.props.cUpdate(1);
        this.props.update('fsfsfdsfds');
    }

    render() {
        return (
            <div>
                <div>This is webroot.</div><br/>

                <Comp1 title="Title" onClick={() => console.log("Clicked!!")}>
                   <Comp2/>
                   <div>The counter: {this.props.counter}</div>
                   <div>The payload: {this.props.switchDetails.payload}</div><br/>
                </Comp1>
            </div>
        )
    }
}

export default inject('switchDetails', 'counter')(App);
