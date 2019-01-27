import React, { Component } from 'react';
import { withRouter } from 'react-router';
import matchPath from 'Component/matchPath';
import { DashBoard } from 'Page/D3';
import ReactInterval from 'react-interval';
class PageContent extends Component {
  state = {
    value: 20,
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        <ReactInterval
          timeout={1000}
          enabled
          callback={() =>
            this.setState({ value: (Math.random() * 100).toFixed(0) })
          }
        />
        <DashBoard value={this.state.value} />
      </div>
    );
  }
}
export default withRouter(PageContent);
