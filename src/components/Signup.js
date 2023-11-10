import React from 'react';
import { Modal, Form, Input, Avatar } from 'antd';
const FormItem = Form.Item

class Login extends React.Component {
  handleOk = () => {
    this.props.form.validateFields(null, {}, (err, vals) => {
      if (err) return
      this.props.signup(vals)
    })
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleOk()
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.isShown}
        title="报名"
        onCancel={() => this.props.changeStatus(false)}
        onOk={this.handleOk}
        okText="提交"
        cancelText="返回"
        getContainer={() => document.getElementById('modal')}
        confirmLoading={this.props.isSignuping}
      >
        <Form>
          <FormItem label="雀魂昵称">
            {this.props.form.getFieldDecorator('MajsoulUserName', {
              rules: [
                { required: true, message: '请输入雀魂昵称' },
                { max: 20, message: '最多20个字符' }
              ]
            })(<Input autoComplete="off" onKeyDown={this.handleKeyDown} />)}
          </FormItem>
          <FormItem label="雀魂数字ID">
            {this.props.form.getFieldDecorator('MajsoulUserID', {
              rules: [
                { required: true, message: '请输入雀魂数字ID' },
                { max: 20, message: '最多20个字符' }
              ]
            })(<Input autoComplete="off" onKeyDown={this.handleKeyDown} />)}
          </FormItem>
          <FormItem label="QQ">
            {this.props.form.getFieldDecorator('QQ', {
              rules: [
                { required: true, message: '请输入QQ' },
                { max: 20, message: '最多20个字符' }
              ]
            })(<Input autoComplete="off" onKeyDown={this.handleKeyDown} />)}
          </FormItem>
          <FormItem label="手机号码">
            {this.props.form.getFieldDecorator('Phone', {
              rules: [
                { required: true, message: '请输入手机号码' },
                { max: 20, message: '最多20个字符' }
              ]
            })(<Input autoComplete="off" onKeyDown={this.handleKeyDown} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Login)
