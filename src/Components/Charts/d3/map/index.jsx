import React, { Component } from 'react';
import D3Map from './d3map';

export default class index extends Component {
  componentDidMount() {
    console.log('aaa');
    this.d3Map = new D3Map({
      node: this.node,
      ...this.props,
    });
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.d3Map.update({ active: nextProps.active });
  }
  render() {
    return (
      <div
        style={{ textAlign: 'center' }}
        ref={ref => {
          this.node = ref;
        }}
      />
    );
  }
}
