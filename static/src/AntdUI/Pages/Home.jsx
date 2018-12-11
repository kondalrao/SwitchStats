import React, { Component } from 'react'
import { Card, Row, Col, Icon, Drawer } from 'antd';
import { inject } from 'rematch-inject';
import { autobind } from 'react-decoration';
import JSONTree from 'react-json-tree';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      displayPayload: {}
    }
  }

  componentWillMount() {
    // console.log("componentWillMount");
    // console.log(this.props);
    this.props.loadData();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps");
  //   console.log(nextProps);
  // }

  // componentDidMount() {
  //   console.log("componentDidMount");
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("componentDidUpdate");
  //   console.log(prevProps);
  //   console.log(prevState);
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("componentWillUpdate");
  //   console.log(nextProps);
  //   console.log(nextState);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate");
  //   console.log(nextProps);
  //   console.log(nextState);

  //   return true;
  // }

  showDrawer = (payloadType='') => {
    switch(payloadType) {
      case 'switchDetails':
        this.setState({
          displayPayload: this.props.switchDetails.payload.version
        })
      break;
      case 'moduleInfo':
      this.setState({
        displayPayload: this.props.switchDetails.payload.moduleInfo
      })
    break;
      default:
      this.setState({
        displayPayload: {}
      })
    }
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    // console.log("Render...");
    // console.log(this.props.switchDetails);
    var bios_version = this.props.switchDetails.bios_version;
    var nxos_version = this.props.switchDetails.nxos_version;
    var nxos_image = this.props.switchDetails.nxos_image;
    var nxos_compile_time = this.props.switchDetails.nxos_compile_time;

    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Switch Details" extra={
              <Icon type="setting"
                    style={{cursor: 'pointer'}}
                    onClick={(event) => { 
                      // this.setState({displayPayload: this.props.switchDetails.payload});
                      this.showDrawer('switchDetails')}} />
              }>
              <div>
                <Row>
                  <Col span={8} style={{textAlign: 'right', padding: '0px'}}>BIOS Version: </Col>
                  <Col span={16} style={{textAlign: 'left', padding: '0px 5px'}}>{bios_version}</Col>
                </Row>
                <Row>
                  <Col span={8} style={{textAlign: 'right', padding: '0px'}}>NXOS Version: </Col>
                  <Col span={16} style={{textAlign: 'left', padding: '0px 5px'}}>{nxos_version}</Col>
                </Row>
                <Row>
                  <Col span={8} style={{textAlign: 'right', padding: '0px'}}>NXOS Image: </Col>
                  <Col span={16} style={{textAlign: 'left', padding: '0px 5px'}}>{nxos_image}</Col>
                </Row>
                <Row>
                  <Col span={8} style={{textAlign: 'right', padding: '0px'}}>NXOS Compile Time: </Col>
                  <Col span={16} style={{textAlign: 'left', padding: '0px 5px'}}>{nxos_compile_time}</Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Card title="Module Info" extra={
              <Icon type="setting"
                    style={{cursor: 'pointer'}}
                    onClick={(event) => { 
                      // this.setState({displayPayload: this.props.switchDetails.payload});
                      this.showDrawer('moduleInfo')}} />
              }>
              <pre style={{textAlign: 'left'}}>
                <JSONTree style={{textAlign: 'left'}} data={this.props.switchDetails.payload.moduleInfo || {}} />
              </pre>
            </Card>
          </Col>
        </Row>
        
        <Drawer title="Payload Data"
                placement="right"
                width={600}
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}>
          <div style={{ fontSize: 14, lineHeight: '22px', marginBottom: 7, color: 'rgba(0,0,0,0.65)' }}>
            <JSONTree style={{textAlign: 'left'}} data={this.state.displayPayload || {}} />
          </div>
        </Drawer>
      </div>
    )
  }
}

export default inject('switchDetails')(Home);
