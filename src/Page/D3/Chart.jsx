import React, { Component } from 'react';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.setRefs = React.createRef();
  }
  componentDidMount() {
    this.props.initCharts();
  }
  render() {
    return <div ref={this.setRefs} />;
  }
}
