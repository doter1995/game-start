import React, { Component } from 'react';
import { withRouter } from 'react-router';
import matchPath from 'Component/matchPath';
class PageContent extends Component {
  render() {
    return <div>{matchPath(this.props.location)}</div>;
  }
}
export default withRouter(PageContent);
