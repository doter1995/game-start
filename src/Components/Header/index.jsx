import React, { Component } from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';

import NavData from 'Config/nav.js';

import './index.scss';
const { Header } = Layout;

export default class index extends Component {
  render() {
    return (
      <Header className="header">
        <div className="nav_left">
          <NavLink to="/">
            <img
              className="logo"
              src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
            />
          </NavLink>
          <h1>
            <NavLink to="/me">Wdzhang</NavLink>
          </h1>
        </div>
        <div className="nav_right">
          {NavData.map(data => {
            return (
              <NavLink key={data.title} to={data.ul} activeClassName="selected">
                {data.title}
              </NavLink>
            );
          })}
        </div>
      </Header>
    );
  }
}
