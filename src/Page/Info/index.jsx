import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
export default class index extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <Card hoverable cover={<img src="/images/info/info2.jpg" />}>
              <Card.Meta
                title="张卫东"
                description="不懂音乐的我，时而不靠谱、时而不着调！"
              />
            </Card>
          </Col>
          <Col>aaa</Col>
        </Row>
      </div>
    );
  }
}
