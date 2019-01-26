import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from 'Component/Header';
import Sider from 'Component/Sider';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from 'Page/PageError/404';
import PageContent from 'Page/PageContent';
import Home from 'Page/Home';
export default class Index extends Component {
  render() {
    return (
      <Layout className="container">
        <Header />
        <Layout>
          <Sider />
          <Layout className="Content">
            <Switch>
              <Route exact path="/" component={Home} />
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
