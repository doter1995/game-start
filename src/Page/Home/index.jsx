import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import './index.scss';

export default class index extends Component {
  render() {
    const configLayout = {
      sm: { span: 8 },
      lg: { span: 4 },
    };
    return (
      <Row gutter={16} className="index_grid">
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
        <Col {...configLayout}>
          <Card cover={<img src="/images/index/track.png" />} bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    );
  }
}
