import React, { Component } from 'react';
import * as d3 from 'd3';
import './dashBoard.scss';
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.dataText = null;
    this.dataG = null;
    this.oldData = null;
  }
  y2 = (d, R) => {
    return -Math.cos(this.scaleArc(d)) * R;
  };
  x2 = (d, R) => {
    return Math.sin(this.scaleArc(d)) * R;
  };
  renderCharts = (root, width, height) => {
    var magrin = 50;
    var w = width - magrin * 2,
      h = height - magrin * 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var svg = d3
      .select(root)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('margin-left', '5%')
      .append('g')
      .attr('class', 'dashBoard')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    var set = [40, 40, 20];
    var outer = 200,
      inner = 170;
    var pie = d3
      .pie()
      .startAngle(-0.75 * Math.PI)
      .endAngle(0.75 * Math.PI);
    var arc = d3
      .arc()
      .innerRadius(inner)
      .outerRadius(outer);

    var arcG = svg.append('g');
    arcG
      .selectAll('path')
      .data(pie(set))
      .enter()
      .append('path')
      .attr('fill', function(d, i) {
        return color(i);
      })
      .attr('d', arc);
    var dataleng = [];
    for (let i = 0; i <= 100; i++) {
      dataleng.push(i);
    }
    d3.symbol(d3.symbolDiamond);
    this.scaleArc = d3
      .scaleLinear()
      .domain([0, 100])
      .range([-0.75 * Math.PI, 0.75 * Math.PI]);
    var scaleKe = d3
      .scaleLinear()
      .domain([0, 100])
      .range([-225, 45]);
    var dataSet = 20;
    this.oldData = 0;
    //绘制刻度
    var keG = arcG
      .append('g')
      .attr('class', 'ke')
      .selectAll('line')
      .data(dataleng)
      .enter();

    keG
      .append('line')
      .attr('stroke', '#000')
      .attr('stroke-width', function(d, i) {
        if (i == 0 || i == 100) {
          return '1px';
        } else return i % 10 == 0 ? '3px' : '1px';
      })
      .attr('x1', d => {
        return this.x2(d, outer + 5);
      })
      .attr('y1', d => {
        return this.y2(d, outer + 5);
      })
      .attr('y2', d => {
        return this.y2(d, outer);
      })
      .attr('x2', d => {
        return this.x2(d, outer);
      });
    //刻度值
    keG
      .append('text')
      .filter(function(d, i) {
        return i % 10 == 0 ? true : false;
      })
      .text(d => {
        return d;
      })
      .attr('x', d => {
        return this.x2(d, outer + 17);
      })
      .attr('y', d => {
        return this.y2(d, outer + 17);
      })
      .attr('transform', 'translate(' + -10 + ',' + 4 + ')');
    //绘制指针
    this.dataG = arcG
      .append('g')
      .attr('class', 'zhen')
      .append('polygon')
      .attr('stroke', '#e00')
      .attr('fill', '#a00')
      .attr('points', '-50,0 0,-30 165,0 0,30')
      .attr('transform', 'rotate(' + scaleKe(dataSet) + ')');
    var dataTip = arcG.append('g').attr('class', 'text');

    dataTip
      .append('rect')
      .attr('fill', '#eee')
      .attr('stroke', '#ccc')
      .attr('x', -80)
      .attr('y', 120)
      .attr('width', 160)
      .attr('height', 80);
    this.dataText = dataTip
      .append('text')
      .style('font-size', 60)
      .style('text-anchor', 'middle')
      .attr('fill', '#a00')
      .attr('y', 180)
      .text(dataSet);
  };

  update = dataSet => {
    var scaleKe = d3
      .scaleLinear()
      .domain([0, 100])
      .range([-225, 45]);
    this.dataText.text(dataSet);
    this.dataG
      .transition()
      .duration(300)
      .attrTween('transform', () => {
        var i = d3.interpolateNumber(this.oldData, dataSet);
        return t => {
          return 'rotate(' + scaleKe(i(t)) + ')';
        };
      })
      .on('end', () => {
        this.oldData = dataSet;
      });
  };
  componentDidMount() {
    var root = this.node;
    var width = 500,
      height = 500;
    this.renderCharts(root, width, height);
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.update(nextProps.value);
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
