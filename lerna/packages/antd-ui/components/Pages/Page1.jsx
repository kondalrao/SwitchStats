import React, { Component } from 'react'
import { connect } from "react-redux";

class Page1 extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.props.loadData();
    }

    render() {
        var version = this.props.switchDetails.version;
        return (
            <div>
                This is page 1 {version.kick_file_name}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    switchDetails: state.switchDetails,
});

const mapDispatchToProps = dispatch => ({
    loadData: id => dispatch.switchDetails.loadData()
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page1);