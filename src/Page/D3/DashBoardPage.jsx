import React, { Component } from 'react';
import { DashBoard } from 'Component/Charts';
import ReactInterval from 'react-interval';

class Index extends Component {
  state = {
    value: 20,
  };
  componentDidMount() {
    this.setState({
      width: document.querySelector('#Content').offsetWidth,
      height: document.querySelector('#Content').offsetHeight,
    });
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <ReactInterval
          timeout={1000}
          enabled
          callback={() =>
            this.setState({ value: (Math.random() * 100).toFixed(0) })
          }
        />
        <DashBoard value={this.state.value} width={500} height={500} />
      </div>
    );
  }
}
export default Index;
