import React, { Component } from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.scss';
const { Header } = Layout;
const config = [
  {
    title: 'D3',
    ul: '/d3',
  },
  {
    title: 'THREE',
    ul: '/three',
  },
  {
    title: 'GITHUB',
    ul: '/github',
  },
  {
    title: 'BLOG',
    ul: '/blog',
  },
];
export default class index extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <div className="nav">
          {config.map(data => {
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
