import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';
import { withRouter } from 'react-router';
import matchPath from '../matchPath';
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
    console.log('data', data);
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
    let path = this.state.path;
    let key = path[0];
    if (!SiderData[key]) {
      return <div />;
    }
    console.log(path[2]);
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          theme="dark"
          defaultOpenKeys={[path[1] || '']}
          defaultSelectedKeys={[path[1] + '/' + path[2] || '']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {SiderData[key].map(data => {
            return (
              <SubMenu key={data.link} title={this.renderIcon(data)}>
                {data.links.map(item => (
                  <Menu.Item
                    key={`${data.link}/${item.link}`}
                    onClick={this.onChangeUrl}
                  >
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
