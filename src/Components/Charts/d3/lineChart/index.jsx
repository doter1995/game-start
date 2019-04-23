import React, { Component } from 'react';
import LineChart from './LineChart';
import * as d3 from 'd3';

export default class index extends Component {
  load = () => {
    //以下为定时测试
    var parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S');
    var formatDate = d3.timeFormat('%Y-%m-%d %H:%M:%S');
    var sum = 29441;
    var time = parseDate('2017-12-20 0:00:00');

    function addDataTest() {
      sum += Number(Math.random().toFixed(3) * 5000);
      time = Number(time.valueOf() + 300000);
      return {
        date: formatDate(time),
        value: sum,
        v: 1 + Number(Math.random().toFixed(2)),
      };
    }
    var lineChart = new LineChart({
      dataSet: [
        {
          date: '2017-12-18 14:00:00',
          exceedFlag: 'N',
          goalFlag: 'N',
          value: '31231',
          ratio: '0.7589',
        },
        {
          date: '2017-12-18 14:05:00',
          exceedFlag: 'N',
          goalFlag: 'N',
          value: '312311',
          ratio: '0.7589',
        },
      ],
      width: window.innerWidth * 0.83,
      height: window.innerHeight * 0.8,
      markImage: ['/images/linechart/point.png', '/images/linechart/star.png'],
      dTipIcon: ['/images/linechart/zonge.png', './images/linechart/leiji.png'],
      tipTitle: ['2016年总销售额', '2017年预计总销售额'],
      bgColor: '#211885',
      yUint: '元',
      margin: [25, 10, 5, 20],
      themeColor: 'rgba(255,255,255,0.51)',
      node: this.node,
      lineStyle: ['#E50CE9', 1],
      circleStyle: ['#23B9F7', 4],
      textSize: 16,
    });
    fetch('./data/linechartData.json')
      .then(re => re.json())
      .then(d => {
        console.log('linechartData', d);
        lineChart.addData(d.lineList);
      });
  };
  componentDidMount() {
    this.load();
  }

  render() {
    return (
      <div
        ref={ref => {
          this.node = ref;
        }}
      />
    );
  }
}
