import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from 'Component/Header';
import Sider from 'Component/Sider';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from 'Page/404';
import PageContent from 'Page/PageContent';

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Layout>
          <Sider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Switch>
              <Route exact path="/" component={PageContent} />
              <Route path="/:key/:path" component={PageContent} />
              <Route path="/404" component={PageNotFound} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
