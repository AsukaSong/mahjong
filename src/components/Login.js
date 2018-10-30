import React from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item

class Login extends React.Component {
  handleOk = () => {
    this.props.form.validateFields(null, {}, (err, vals) => {
      if(err) return
      this.props.login(vals)
    })
  }

  handleKeyDown = e => {
    if(e.key === 'Enter') {
      this.handleOk()
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.isShown}
        title="使用CC98账号登陆"
        onCancel={() => this.props.changeStatus(false)}
        onOk={this.handleOk}
        okText="登陆"
        cancelText="返回"
      >
        <Form>
          <FormItem labelCol={{span: 3, offset: 12}} label="用户名">
            {this.props.form.getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入用户名' }
              ]
            })(<Input autoComplete="off" onKeyDown={this.handleKeyDown} />)}
          </FormItem>
          <FormItem labelCol={{span: 3, offset: 12}} label="密码">
            {this.props.form.getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' }
              ]
            })(<Input type="password" autoComplete="off" onKeyDown={this.handleKeyDown} />)}
          </FormItem>
          <p style={{ margin: 0 }}>忘记帐号或密码请发送学号+姓名到contact@cc98.org</p>
          <p style={{ margin: 0 }}>注明“找回帐号密码”</p>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Login)
