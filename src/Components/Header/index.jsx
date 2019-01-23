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
        <div className="logo" />
        <div className="nav">
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
