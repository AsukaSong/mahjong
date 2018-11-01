import React from 'react';
import { Modal, Row, Col } from 'antd'

const rowStyle = {
  marginBottom: 20,
}

const colStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
}

export default ({userName, isShown, changeStatus, isVerified, majsoulUserName, time, qq, phone}) =>  (
  <Modal
    visible={isShown}
    title="我的报名状态"
    onCancel={() => changeStatus(false)}
    footer={null}
    getContainer={() => document.getElementById('modal')}
  >
    <Row style={rowStyle}>
      <Col style={colStyle} span={7}>CC98用户名：</Col>
      <Col span={1} />
      <Col span={16}>{userName}</Col>
    </Row>
    <Row style={rowStyle}>
      <Col style={colStyle} span={7}>雀魂昵称：</Col>
      <Col span={1} />
      <Col span={16}>{majsoulUserName}</Col>
    </Row>
    <Row style={rowStyle}>
      <Col style={colStyle} span={7}>报名时间：</Col>
      <Col span={1} />
      <Col span={16}>{(new Date(time)).toLocaleString()}</Col>
    </Row>
    <Row style={rowStyle}>
      <Col style={colStyle} span={7}>QQ：</Col>
      <Col span={1} />
      <Col span={16}>{qq}</Col>
    </Row>
    <Row style={rowStyle}>
      <Col style={colStyle} span={7}>手机号码：</Col>
      <Col span={1} />
      <Col span={16}>{phone}</Col>
    </Row>
    <Row style={rowStyle}>
      <Col style={colStyle} span={7}>状态：</Col>
      <Col span={1} />
      <Col span={16}>{isVerified === null ? '未审核' : isVerified ? '已通过' : '未通过'}</Col>
    </Row>
  </Modal>
)
