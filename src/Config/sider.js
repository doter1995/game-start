export default {
  d3: [
    {
      title: '实战组件',
      links: [
        {
          link: 'D3Map',
          title: 'D3地图',
          description:
            '使用d3.geo实现基础地图绘制，使用定时器修改属性实现动态效果',
        },
        {
          link: 'gitChain/demo',
          title: 'gitChain',
          description:
            '使用d3进行svg的绘制，定制化开发的gitChain，封装了部分按钮事件以及上下排序等等。',
        },
        {
          link: 'lineChart',
          title: 'lineChart',
          description:
            '使用d3进行svg的绘制，定制化开发，添加部分特殊标记，以及动态增加数据，封装了部分常用功能。',
        },
        {
          link: 'workflow',
          title: 'workflow',
          description:
            '使用d3进行svg的绘制，定制化开发，添加部分特殊标记，以及动态增加数据，封装了部分常用功能。',
        },
        {
          link: 'MQVisWidget0',
          title: 'MQVisWidget0',
          description:
            '使用d3进行svg的绘制，定制化开发，修改d3.zoom库，从而实现XY轴即可独立缩放也可同时缩放。shirft/alt+滚轮来控制是否独立缩放XY',
        },
        {
          link: 'MQVisWidget1',
          title: 'MQVisWidget1',
          description: '功能同上。',
        },
        {
          link: 'dashBoard',
          title: 'dashBoard',
          description: '使用d3进行svg的绘制，仪表盘。',
        },
        {
          link: 'timeLine',
          title: 'timeLine',
          description: '使用d3进行svg的绘制，时间轴，只能缩放x轴。',
        },
        {
          link: 'widget',
          title: 'widget',
          description: '使用d3进行svg的绘制，自定义绘制X轴',
        },
        {
          link: 'svgLineGradientTest',
          title: '线条渐变形',
          description:
            '使用d3进行svg的绘制，通过插值器及svg渐变实现根据数据渐变现实线条',
        },
      ],
    },
    {
      title: '基础布局',
      links: [
        {
          link: 'charts/pies',
          title: 'pies',
        },
        {
          link: 'charts/tree',
          title: 'tree',
        },
        {
          link: 'charts/treeMap',
          title: 'treeMap',
        },
        {
          link: 'charts/partition',
          title: 'partition分区图',
        },
        {
          link: 'charts/pack',
          title: 'pack 包',
        },
        {
          link: 'charts/histogram',
          title: 'histogram 直方图',
        },
        {
          link: 'charts/stack',
          title: 'stack 堆栈图',
        },
        {
          link: 'charts/force',
          title: 'force 力向导图',
        },
        {
          link: 'charts/force.html',
          title: '力向导图v3',
        },
        {
          link: 'charts/brush',
          title: '刷子',
        },
        {
          link: 'charts/geo',
          title: '地理',
        },
      ],
    },
  ],
  three: [
    {
      title: '基础布局',
      links: [
        {
          link: 'backGround',
          title: '跳动的球',
          description:
            '通过shader将给定图片通过读取颜色，判断是否透明，以及取色，从而实现圆形。并提供大小换算。从而实现类似sprite的效果。营造出类3d效果。同时通过对歌曲的音频解析，将其实时频谱传入shader实现跳动。',
        },
        {
          link: 'bone',
          title: 'bone',
          description: '简单的骨骼动画',
        },
        {
          link: 'fonts',
          title: 'fonts',
          description: '简单的渲染3d文字',
        },
        {
          link: 'simplyGlobal',
          title: 'simplyGlobal',
          description: '基础版地球仪',
        },
        {
          link: 'normalGlobal',
          title: 'normalGlobal',
          description: '扩展版地球仪,通过经纬度转3D坐标，将其串联成线',
        },
        {
          link: 'lol',
          title: 'lol英雄渲染',
          description: '渲染3d模型，加入雾化效果',
        },
        {
          link: 'physi',
          title: '重力坠落',
          description: '使用physijs扩展three，实现重力坠落模拟',
        },
        {
          link: 'shader',
          title: 'shader',
          description: '通过将3d模型使用shader处理',
        },
        {
          link: 'threeTest',
          title: '实战3d数据展示',
          description:
            '使用3的构建工具构建简单3d模型后，进行场景编排。数据展示采用实时3d空间点转屏幕空间后，检测空间距离排序div浮动框',
        },
        {
          link: 'OverallView',
          title: '全景图',
          description: '将全景图处理为6面正方体，相机定位至中心，实现全景',
        },
      ],
    },
  ],
};
