import React, { Component } from 'react';
import DashBoard from './DashBoardPage';
let config = {
  scene: {
    dashBoard: <DashBoard />,
  },
  common: {},
};
export default props => {
  let path = props.path;
  return config[path[1]][path[2]] || <div>this page is develop </div>;
};
