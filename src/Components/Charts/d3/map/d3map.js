import * as d3 from 'd3';

export default function(config) {
  var DataSet = config.dataSet ? config.dataSet : [];
  var Node = config.node ? config.node : document.body;
  var Width = config.width ? config.width : window.innerWidth - 20;
  var Height = config.height ? config.height : window.innerHeight - 20;
  var active = config.active ? config.active : 0;
  var scale = config.scale ? config.scale : 600;
  var json = config.json ? config.json : '';
  var background = config.background ? config.background : '#345';
  var stroke = config.stroke ? config.stroke : '#666';
  var color = ['#2E2D57', '#35A8F9'];
  //开始
  var svg = d3
    .select(Node)
    .append('svg')
    .attr('width', Width)
    .attr('height', Height)
    .attr('background-color', background);
  var mapG = svg.append('g').attr('class', 'map');
  var pointG = svg.append('g').attr('class', 'point');
  var x = 0,
    y = 0; //设置旋转角度
  var projection = d3
    .geoMercator()
    .center([107, 37])
    .scale(scale)
    .translate([Width / 2, Height / 2]);
  var path = d3.geoPath(projection);
  if (!json) {
    console.error('请配置地图json文件');
    return null;
  }
  console.log('aa');
  fetch(json)
    .then(res => res.json())
    .then(dataSet => {
      mapG
        .selectAll('path')
        .data(dataSet.features)
        .enter()
        .append('path')
        .attr('class', 'pathLine')
        .attr('d', path)
        .attr('fill', function(d, i) {
          return color[0];
        })
        .attr('stroke', stroke);
    })
    .catch(e => {
      console.error(e);
    });
  //绘制坐标点
  var points = pointG
    .selectAll('g.node')
    .data(DataSet)
    .enter()
    .append('g')
    .each(function(d, i) {
      d['xy'] = projection([d.latlng[1], d.latlng[0]]);
    })
    .attr('class', 'node');

  points
    .append('circle')
    .attr('r', 5)
    .attr('cx', function(d, i) {
      return d.xy[0];
    })
    .attr('cy', function(d, i) {
      return d.xy[1];
    })
    .attr('fill', function(d, i) {
      return d.id == active ? '#0f0' : '#35A8F9';
    })
    .attr('class', function(d, i) {
      return d.id == active ? 'active' : 'inactive';
    })
    .on('click', function(d, i) {
      active = d.id;
      updateActive();
    });
  //动点动画
  var opacity = 0.1;
  var t = d3.interval(function(elapsed) {
    opacity += 0.1;
    opacity %= 1;
    points
      .select('circle.active')
      .attr('opacity', function() {
        return 1 - opacity;
      })
      .attr('r', 5 + opacity * 4);
  }, 100);

  //
  this.update = function(config) {
    if (config.active != undefined) {
      active = config.active;
      updateActive();
    }
  };

  //更新动态点
  function updateActive() {
    points
      .selectAll('circle')
      .attr('class', 'inactive')
      .attr('r', 5)
      .attr('opacity', 1)
      .attr('fill', '#35A8F9');
    points
      .selectAll('circle')
      .filter(function(d) {
        return active == d.id;
      })
      .attr('class', 'active')
      .attr('fill', '#0f0');
  }
}
