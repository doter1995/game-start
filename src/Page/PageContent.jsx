import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { DashBoard } from 'Page/D3';
class PageContent extends Component {
  render() {
    return (
      <div>
        <DashBoard />
      </div>
    );
  }
}
export default withRouter(PageContent);
