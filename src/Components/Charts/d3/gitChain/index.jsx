import React, { Component } from 'react';
import GitChain from './gitChain';

export default class index extends Component {
  componentDidMount() {
    this.gitChain = new GitChain({
      node: this.node,
      ...this.props,
    });
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.gitChain.update({ active: nextProps.active });
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
