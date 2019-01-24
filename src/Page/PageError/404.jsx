import React, { Component } from 'react';
import ContentImg from './404.png';
import './404.scss';
export default class PageNotFound extends Component {
  render() {
    return (
      <div
        className="pageNotFound"
        style={{ background: `Url(${ContentImg}) center no-repeat` }}
      >
        <span className="notFound">404</span>
      </div>
    );
  }
}
