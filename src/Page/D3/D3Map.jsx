import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import { D3Map } from 'Component/Charts';

export default class Index extends Component {
  state = {
    active: 0,
  };
  render() {
    let dataSet = [
      {
        id: 1,
        title: '西安项目',
        latlng: [34.284102, 108.929673], //google地图坐标(百度地图坐标是有偏移的)
        text: '正在不断发展中',
      },
      {
        id: 2,
        title: '北京项目',
        latlng: [39.873406, 116.328331],
        text: '正在不断发展中',
      },
      {
        id: 3,
        title: '深圳项目',
        latlng: [22.540409, 114.054267],
        text: '正在不断发展中',
      },
      {
        id: 4,
        title: '杭州项目',
        latlng: [30.292383, 120.140163],
        text: '正在不断发展中',
      },
      {
        id: 5,
        title: '太原项目',
        latlng: [37.852404, 112.554556],
        text: '正在不断发展中',
      },
    ];
    return (
      <div>
        <ReactInterval
          timeout={1000}
          enabled
          callback={() => this.setState({ active: ++this.state.active % 4 })}
        />
        <D3Map
          json="/data/china.json"
          dataSet={dataSet}
          width={800}
          height={500}
          active={this.state.active}
        />
      </div>
    );
  }
}
