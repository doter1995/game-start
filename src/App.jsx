import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Header from 'Component/Header';
import Sider from 'Component/Sider';

const { SubMenu } = Menu;
const { Content } = Layout;

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Layout>
          <Sider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
