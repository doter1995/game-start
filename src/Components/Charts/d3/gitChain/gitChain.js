import * as d3 from 'd3';
import uuid4 from 'uuid/v4';
export default function(config) {
  //配置属性
  let title = config.title ? config.title : '请加入标题';
  let node = config.node ? config.node : 'body';
  let width = config.width ? config.width : window.innerWidth;
  let height = config.height ? config.height : window.innerHeight;
  let data = config.data ? config.data : [];
  let useDataset = config.useDataset
    ? config.useDataset
    : function(d) {
        console.log(d);
      };
  let markerWidth = 5; //箭头的大小
  let tipDot = '; '; //切换中文，或者英文,
  //基础工具
  let parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S.%L');

  let axisTextColor = '#ccc';

  let marginLeft = 30;
  let marginRight = 20;
  let marginTop = 40;
  let marginBottom = 20;
  let W = width - marginLeft - marginRight;
  let H = height - marginTop - marginBottom - 20;
  let _svgtitle;
  // var color = d3.scaleOrdinal(d3.schemeCategory20);
  //dom
  let rootNode;
  //样式属性
  //是否居中对齐 否则左对齐
  let isCenter = config.isCenter ? true : false;
  //左侧图的宽度，0为不设置
  let itemW = config.itemW ? config.itemW : 0;
  //是否排序
  let isSortNode = config.isSortNode != undefined ? config.isSortNode : true;
  let isSortTime = config.isSortTime != undefined ? config.isSortTime : true;
  //水平一的宽
  let itemMargin = 50;
  //垂直1的高
  let itemMargin1 = 45;
  //节点圆半径
  let nodeR = 15;
  //背景色透明度，高亮时透明度
  let opacity = config.style.opacity ? config.style.opacity : [0.3, 0.9];
  // var userColor = ['#39397a', '#627a35', '#8d6d2c', '#853c37', '#737f74']
  // var color = ['#2c80bf', '#e95400', '#2aa450', '#bcbf00', '#636363']
  let userColor = config.style.userColor
    ? config.style.userColor
    : ['#39397a', '#627a35', '#8d6d2c', '#853c37', '#737f74'];
  let color = config.style.color
    ? config.style.color
    : ['#2c80bf', '#e95400', '#2aa450', '#bcbf00', '#636363'];
  //文字颜色
  let textColor = config.style.textColor
    ? config.style.textColor
    : ['#333', '#eee'];
  //使用按钮的样式
  //按钮背景(标准，高亮)
  let use_back = ['#380', '#7b0'];
  let backGround, linkNode, linkLine, linkTitleRect, linkTitle;

  //绘制
  function render() {
    d3.select(node)
      .selectAll('*')
      .remove();
    d3.select(node)
      .selectAll('svg')
      .remove();
    let Node = d3.select(node);
    _svgtitle = Node.append('div')
      .style('position', 'relative')
      .style('color', axisTextColor)
      .style('top', '20px')
      .style('text-align', 'center')
      .style('font-weight', '600')
      .style('font-size', '0.7rem')
      .style('width', width - 10 + 'px')
      .html(config.title);
    //预处理数据
    var dataSet = formatData(data);
    //获取图表的长度
    var length = dataSet.data[dataSet.data.length - 1].index;
    var Hlength = length * itemMargin1; //拿到长度
    rootNode = Node.append('svg')
      .attr('width', width - 10)
      .attr('height', height - 20)
      .append('g')
      .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');
    var Y = d => (isSortTime ? d : Hlength - d);

    //绘制数据
    let titltData = { index: -1, length: 0, titles: [] };
    //处理图形的宽度
    itemW = itemW != 0 ? itemW : dataSet.classes.length * itemMargin;
    //调整图层
    backGround = rootNode.append('g');
    linkLine = rootNode.append('g');
    linkNode = rootNode.append('g');
    linkTitleRect = rootNode.append('g');
    linkTitle = rootNode.append('g');
    if (isCenter) {
      let center = W / 2 - 20;
      let left = center - itemW;
      backGround.attr('transform', 'translate(' + left + ',0)');
      linkNode.attr('transform', 'translate(' + left + ',0)');
      linkLine.attr('transform', 'translate(' + left + ',0)');
      linkTitleRect.attr('transform', 'translate(' + left + ',0)');
      linkTitle.attr('transform', 'translate(' + left + ',0)');
    }

    dataSet.data.forEach(function(d, i) {
      //绘制连线
      let line = d3
        .line()
        .x(d => d[0])
        .y(d => Y(d[1]))
        .curve(d3.curveMonotoneX);
      let orientLine = GetLines(dataSet, d);
      orientLine.forEach(function(dd, ii) {
        linkLine
          .append('path')
          .attr('class', 'line')
          .datum(dd.line)
          .attr('d', line)
          .attr('stroke-width', 3)
          .attr('stroke', () => userColor[dataSet.user.indexOf(d.user)])
          .attr('fill', 'none')
          .attr(
            'marker-end',
            'url(#' +
              addMarker(dd.orient, userColor[dataSet.user.indexOf(d.user)]) +
              ')',
          );
      });
      //绘制节点
      backGround
        .append('rect')
        .datum(d)
        .attr('x', function(d) {
          return itemMargin * dataSet.classes.indexOf(d.to);
        })
        .attr('y', function(d) {
          return Y(itemMargin1 * d.index) - nodeR;
        })
        .attr('width', function(d) {
          return itemW - itemMargin * dataSet.classes.indexOf(d.to);
        })
        .attr('height', 2 * nodeR)
        .attr('fill', userColor[dataSet.user.indexOf(d.user)])
        .attr('opacity', opacity[0])
        .on('mouseover', function(d) {
          select(d);
        })
        .on('mouseout', function(d) {
          select({ index: -1 });
        });
      linkNode
        .append('circle')
        .datum(d)
        .attr('cx', function(d) {
          return itemMargin * dataSet.classes.indexOf(d.to);
        })
        .attr('cy', function(d) {
          return Y(itemMargin1 * d.index);
        })
        .attr('r', function(d) {
          return nodeR;
        })
        .attr('fill', function(d, i) {
          return color[dataSet.classes.indexOf(d.to)];
        })
        .attr('stroke', function(d) {
          return userColor[dataSet.user.indexOf(d.user)];
        })
        .attr('stroke-width', 4)
        .on('mouseover', function(d) {
          select(d);
        })
        .on('mouseout', function(d) {
          select({ index: -1 });
        });
      //打印内容
      if (titltData.index != d.index) {
        var frist = 0;
        titltData.index = d.index;
        titltData.length = 0;
        linkTitleRect
          .append('rect')
          .datum(d)
          .attr('x', function() {
            return itemW + 20 + titltData.length * 12;
          })
          .attr('y', function() {
            return Y(itemMargin1 * d.index) - nodeR;
          })
          .attr('height', 2 * nodeR)
          .attr('width', W - itemW)
          .attr('fill', userColor[dataSet.user.indexOf(d.user)])
          .attr('opacity', opacity[0])
          .on('mouseover', d => select(d))
          .on('mouseout', d => select({ index: -1 }));
        //每一行,第一打印
        var userData = getTitle(dataSet, titltData);
        var dataString = '';
        dataSet.user.forEach(function(d) {
          if (userData.user.indexOf(d) != -1) {
            //匹配到用户
            dataString += ' ' + d; //打印用户
            var textData = userData.data[userData.user.indexOf(d)];
            if (textData.create.to.length > 0) {
              //有创建
              dataString += getType('create');
              textData.create.to.forEach(function(d, i) {
                dataString += i > 0 ? tipDot : '';
                dataString += getTag(d);
              });
              frist = 1;
            }
            if (textData.use.to.length > 0) {
              //有使用
              dataString += frist == 0 ? '' : tipDot;
              dataString += getType('use');
              textData.use.to.forEach(function(d, i) {
                dataString += i > 0 ? tipDot : '';
                dataString += getTag(d);
              });
              frist = 1;
            }
            if (textData.refer.length > 0) {
              dataString += frist == 0 ? '' : tipDot;
              dataString += getType('refer');
              textData.refer.forEach(function(dd, i) {
                dd.from.forEach(function(d, i) {
                  dataString += i > 0 ? ',' : '';
                  dataString += getTag(d);
                });
                dataString += '到' + getTag(dd.to) + '';
              });
              frist = 1;
            }
          }
        });
        //准备打印内容

        linkTitle
          .append('text')
          .attr('class', 'link')
          .datum(d)
          .attr('x', function() {
            return itemW + 30;
          })
          .attr('y', function(d) {
            return Y(itemMargin1 * d.index) + 5;
          })
          .text(function(d) {
            dataString += '(' + d.time.substring(0, 19) + ')';
            return dataString;
          })
          .attr('fill', textColor[0])
          .on('mouseover', function(d) {
            select(d);
          })
          .on('mouseout', function(d) {
            select({ index: -1 });
          });

        //打印使用按钮
        var Allow_use = false;
        dataSet.data.forEach(function(ddd) {
          if (titltData.index == ddd.index) {
            ddd.allow_use == true ? (Allow_use = true) : '';
            return;
          }
        });
        if (Allow_use) {
          var useTip = linkTitle.append('g').datum(d);
          useTip
            .append('rect')
            .attr('class', 'tip_use_back')
            .attr('x', W - 40)
            .attr('y', Y(itemMargin1 * d.index) - nodeR)
            .attr('width', 50)
            .attr('height', 30)
            .attr('fill', use_back[0])
            .on('mousemove');
          useTip
            .append('text')
            .attr('class', 'tip_Use')
            .attr('x', W - 30)
            .attr('y', Y(itemMargin1 * d.index) + 5)
            .text('使用');
          useTip
            .attr('cursor', 'pointer')
            .on('click', function(d) {
              useDataset(d.to);
            })
            .on('mouseover', function(d) {
              var self = d3.select(this);

              self.select('rect.tip_use_back').attr('fill', use_back[1]);
            })
            .on('mouseout', function(d) {
              var self = d3.select(this);
              self.select('rect.tip_use_back').attr('fill', use_back[0]);
            });
        }
      }
      //记录节点
      dataSet.state[d.to].index = d.index;
    });
  }

  render();

  function select(data) {
    backGround
      .selectAll('rect')
      .attr('opacity', opacity[0])
      .filter(function(d) {
        return d.index == data.index;
      })
      .attr('opacity', opacity[1]);
    linkNode
      .selectAll('rect')
      .attr('opacity', opacity[0])
      .filter(function(d) {
        return d.index == data.index;
      })
      .attr('opacity', opacity[1]);
    linkTitleRect
      .selectAll('rect')
      .attr('opacity', opacity[0])
      .filter(function(d) {
        return d.index == data.index;
      })
      .attr('opacity', opacity[1]);
    linkTitle
      .selectAll('text.link')
      .attr('fill', textColor[0])
      .filter(function(d) {
        return d.index == data.index;
      })
      .attr('fill', textColor[1]);
  }

  this.update = function(config) {
    if (config.title != undefined) {
      _svgtitle.html(title);
    }
    //是否居中 默认居左
    config.isCenter != undefined ? (isCenter = config.isCenter) : '';
    //左侧图的宽度，0为不设置
    config.itemW != undefined ? (itemW = config.itemW) : '';
    //是否排序 节点名称
    config.isSortNode != undefined ? (isSortNode = config.isSortNode) : '';
    //是否时间顺序
    config.isSortTime != undefined ? (isSortTime = config.isSortTime) : '';
    config.useDataset != undefined ? (useDataset = config.useDataset) : '';
    //更新宽高
    config.width ? (width = config.width) : '';
    config.height ? (height = config.height) : '';
    W = width - marginLeft - marginRight;
    H = height - marginTop - marginBottom - 20;
    _svgtitle.style('width', width + 'px');
    //更新样式
    if (config.style != undefined) {
      var style = config.style;
      style.textColor ? (textColor = style.textColor) : '';
      style.userColor ? (userColor = style.userColor) : '';
      style.color ? (color = style.color) : '';
      style.opacity ? (opacity = style.opacity) : '';
    }
    render();
  };
  function getType(type) {
    let types = {
      create: '创建',
      refer: '合并',
      use: '使用',
    };
    return types[type];
  }
  function getTag(d) {
    return '『' + d + '』';
  }
  function formatData(data) {
    var dataSet = {
      classes: [],
      data: [],
      user: [],
      state: {},
    };

    data.sort(
      (a, b) =>
        parseDate(a.time.substring(0, 23)) - parseDate(b.time.substring(0, 23)),
    );
    //数组排序
    dataSet.data = data;
    //刷选出来对应的分支类型
    var time = 'a';
    var index = -1;
    dataSet.data.forEach(function(d) {
      d['id'] = uuid4();
      d['index'] = d.time != time ? index++ : index;

      if (d.type == 'refer' && dataSet.classes.indexOf(d.from) == -1) {
        dataSet.classes.push(d.from);
        dataSet.state[d.from] = { index: -1 };
      }
      if (dataSet.classes.indexOf(d.to) == -1) {
        dataSet.classes.push(d.to);
        dataSet.state[d.to] = { index: -1 };
      }
      if (dataSet.user.indexOf(d.user) == -1) {
        dataSet.user.push(d.user);
      }
      time = d.time;
    });

    isSortNode ? dataSet.classes.sort((a, b) => a > b) : '';
    return dataSet;
  }
  //获取连线
  function GetLines(dataSet, d) {
    var data = [];
    var lineData = [];
    var orient = 0;
    var end = dataSet.classes.indexOf(d.to) * itemMargin;

    var endLength = dataSet.state[d.to].index * itemMargin1;
    var endIndex = dataSet.state[d.to].index;
    if (d.type == 'use') {
      lineData.push([end, endLength + nodeR]);
      lineData.push([end, itemMargin1 * d.index - nodeR - markerWidth]);
      orient = isSortTime ? 90 : -90;
      data.push({ line: lineData, orient: orient });
    } else if (d.type == 'refer') {
      var start = dataSet.classes.indexOf(d.from) * itemMargin;
      var startLength = dataSet.state[d.from].index * itemMargin1;

      lineData.push([start, startLength]);
      if (start <= end) {
        //左向右合并
        if (startLength > endLength) {
          //先右后上
          lineData.push([end - nodeR, startLength]);
          lineData.push([end, startLength + nodeR]);
          lineData.push([end, itemMargin1 * d.index - nodeR - markerWidth]);
          orient = isSortTime ? 90 : -90;
        } else {
          //先上后右
          lineData.push([start, itemMargin1 * d.index - nodeR]);
          lineData.push([start + nodeR, itemMargin1 * d.index]);
          lineData.push([end - nodeR - markerWidth, itemMargin1 * d.index]);
          orient = orient = isSortTime ? 0 : 0;
        }
      } else {
        //右向左合并
        if (startLength >= endLength) {
          //先左后上
          lineData.push([end + nodeR, startLength]);
          lineData.push([end, startLength + nodeR]);
          lineData.push([end, itemMargin1 * d.index - nodeR - markerWidth]);
          orient = isSortTime ? 90 : -90;
        } else {
          //先上后左
          lineData.push([start, itemMargin1 * d.index - nodeR]);
          lineData.push([start - nodeR, itemMargin1 * d.index]);
          lineData.push([end + nodeR + markerWidth, itemMargin1 * d.index]);
          orient = orient = isSortTime ? 180 : 180;
        }
      }
      data.push({ line: lineData, orient: orient });
      if (endIndex != -1 && endIndex != d.index) {
        lineData = [];
        lineData.push([end, itemMargin1 * endIndex + nodeR]);
        lineData.push([end, itemMargin1 * d.index - nodeR - markerWidth]);
        data.push({ line: lineData, orient: (orient = isSortTime ? 90 : -90) });
      }
    }

    return data;
  }
  function getTitle(dataSet, titltData) {
    let userData = { user: [], data: [] };
    //合并算法
    dataSet.data.forEach(function(v, ind) {
      if (v.index == titltData.index) {
        if (userData.user.indexOf(v.user) == -1) {
          //创建用户
          userData.user.push(v.user);
          userData.data.push({
            use: { to: [] },
            create: { to: [] },
            refer: [],
          });
          getTypeData(userData.data[userData.user.indexOf(v.user)], v);
        } else {
          getTypeData(userData.data[userData.user.indexOf(v.user)], v);
        }
      }
    });
    return userData;
  }
  //获取通类型
  function getTypeData(data, v) {
    if (v.type == 'refer') {
      let isPush = false;
      data.refer.forEach(function(dd, i) {
        if (dd.to == v.to) {
          dd.from.push(v.from);
          isPush = true;
        }
      });
      if (!isPush) {
        data.refer.push({ to: v.to, from: [v.from] });
      }
    } else {
      //创建，使用处理
      data[v.type].to.push(v.to);
    }
  }

  //添加箭头 orient是方向
  function addMarker(orient, color) {
    let uid = uuid4();
    rootNode
      .append('defs')
      .append('marker')
      .attr('id', uid)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', markerWidth)
      .attr('markerHeight', markerWidth)
      .attr('viewBox', '0 0 12 12')
      .attr('refX', '6')
      .attr('refY', '6')
      .attr('orient', orient)
      .append('path')
      .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
      .attr('fill', color);
    return uid;
  }
}
