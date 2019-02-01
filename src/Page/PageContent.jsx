import React, { Component } from 'react';
import { withRouter } from 'react-router';
import matchPath from 'Component/matchPath';

import D3 from './D3';
import Three from './Three';
let getConfig = path => {
  return {
    d3: <D3 path={path} />,
    three: <Three path={path} />,
  };
};
class PageContent extends Component {
  render() {
    let path = matchPath(this.props.location);
    return getConfig(path)[path[0]] || <div>page is develop</div>;
  }
}
export default withRouter(PageContent);
