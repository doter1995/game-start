import React, { Component } from 'react';
import DashBoard from './DashBoardPage';
import D3Map from './D3Map';
import GitChain from './GitChain';
let config = {
  scene: {
    dashBoard: <DashBoard />,
    D3Map: <D3Map />,
    gitChain: <GitChain />,
  },
  common: {},
};
export default props => {
  let path = props.path;
  if (path.length < 2) {
    return config.scene.dashBoard;
  }
  return config[path[1]][path[2]] || <div>this page is develop </div>;
};
