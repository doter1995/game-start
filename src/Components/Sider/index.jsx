import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';
import { withRouter } from 'react-router';
import matchPath from './matchPath';
import SiderData from 'Config/sider.js';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: matchPath(props.location),
    };
  }
  onChangeUrl = data => {
    this.props.history.push(`/${this.state.path[0]}/${data.key}`);
  };
  renderIcon = data => (
    <span>
      <Icon type={data.icon || 'user'} />
      {data.title}
    </span>
  );

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ path: matchPath(nextProps.location) });
    }
  }

  render() {
    let key = this.state.path[0];
    console.log(this.state.path);
    if (!SiderData[key]) {
      return <div />;
    }
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={Object.keys(SiderData[key])}
          style={{ height: '100%', borderRight: 0 }}
        >
          {SiderData[key].map(data => {
            return (
              <SubMenu key={data.title} title={this.renderIcon(data)}>
                {data.links.map(item => (
                  <Menu.Item key={`${item.link}`} onClick={this.onChangeUrl}>
                    {item.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(Index);
