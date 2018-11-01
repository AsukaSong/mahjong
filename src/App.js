import React, { Component } from 'react';
import { Button, message, Avatar, Table, Modal } from 'antd'
import 'fullpage.js/vendors/scrolloverflow'
import ReactFullpage from '@fullpage/react-fullpage';
import dayjs from 'dayjs'

import Login from './components/Login'
import Signup from './components/Signup'
import Detail from './components/SignupStatus'

import config from './config.in.json'
import text from './detail'

import { logIn, signup, getGlobalStatus, getMyStatus } from './network'

import { getLocalStorage, removeLocalStorage, setLocalStorage } from './utils';

class App extends Component {
  state = {
    loginIsShown: false,
    isLogin: !!getLocalStorage('token'),
    islogining: false,
    userInfo: !!getLocalStorage('token') ? getLocalStorage('userinfo') || {} : {},
    globalData: {
      verifiedCount: 0,
      verifiedUsers: [],
      verifyingCount: 1,
    },
    myData: {},
    signupIsShown: false,
    issignuping: false,
    detailIsShown: false,
    infoIsShown: false,
    frombutton: false,
  }

  columns = [
    {
      title: '',
      dataIndex: 'portraitUrl',
      render: item => <Avatar src={item} />,
      width: 80,
      align: 'center',
    },
    {
      title: '序号',
      dataIndex: 'userId',
      render: (_, __, index) => index + 1,
      width: 80,
      align: 'center'
    },
    {
      title: 'CC98用户名',
      dataIndex: 'userName',
      width: 200,
      align: 'center',
      render: text => <span title={text}>{text}</span>
    },
    {
      title: '雀魂昵称',
      dataIndex: 'majsoulUserName',
      width: 200,
      align: 'center',
      render: text => <span title={text}>{text}</span>
    },
    {
      title: '报名时间',
      dataIndex: 'time',
      render: item => dayjs(item).format('YYYY年MM月DD日 HH:mm:ss'),
      width: 240,
      align: 'center',
    }
  ]

  login = async (params) => {
    if(this.state.islogining) return
    this.setState({ islogining: true })
    const info = await logIn(params)
    if(!info) {
      this.setState({
        islogining: false
      })
      return
    }
    this.setState({
      isLogin: true,
      loginIsShown: false,
      userInfo: info,
      islogining: false,
    })

    this.getMyStatus()
  }

  logout = () => {
    this.setState({
      isLogin: false,
      userinfo: {},
      myData: {},
    })

    removeLocalStorage('token')
    removeLocalStorage('userinfo')
  }

  signup = async (vals) => {
    this.setState({ issignuping: true })
    await signup(vals)
    this.setState({ issignuping: false, signupIsShown: false })
    this.getGolbalData()
  }
  
  changeLoginIsShown = status => {
    this.setState({
      loginIsShown: status,
    })
  }

  changeSignupIsShown = status => {
    this.setState({
      signupIsShown: status,
    })
  }

  changeDetailIsShown = status => {
    this.setState({
      detailIsShown: status,
    })
  }

  changeInfoIsShown = status => {
    this.setState({
      infoIsShown: status,
    })
  }

  handleButtonClick = () => {
    if(!this.state.isLogin) {
      message.info('请先登录')
      this.changeLoginIsShown(true)
    } else if(this.state.myData.majsoulUserName) {
      this.changeDetailIsShown(true)
    } else if(!getLocalStorage('detail')) {
      this.setState({ frombutton: true })
      this.changeInfoIsShown(true)
    } else {
      this.changeSignupIsShown(true)
    }
  }

  getGolbalData = async () => {
    const globalData = await getGlobalStatus()
    if(globalData) {
      this.setState({
        globalData,
      })
    }
  }

  getMyStatus = async () => {
    const myData = await getMyStatus()
    if(myData) {
      this.setState({
        myData,
      })
    }
  }

  componentDidMount() {
    if(window.location.hash === '#info') {
      window.location.href = '#main'
    }

    if(this.state.isLogin) this.getMyStatus()
    this.getGolbalData()
  }

  render() {
    return (
      <>
        <div className="top">
          <a className="title">CC98雀魂日麻大赛·2018</a>
          <div>
            {!this.state.isLogin ? (
              <a onClick={() => this.changeLoginIsShown(true)}>点我登录</a>
            ): (
              <>
                <Avatar src={this.state.userInfo.portraitUrl} />
                <a href="#">{this.state.userInfo.name}</a>
                <a onClick={this.logout}>注销</a>
              </>
            )}
          </div>
        </div>
        <ReactFullpage
          ref={it => this.page = it}
          anchors={['main', 'info']}
          licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
          lazyLoading={false}
          normalScrollElements={'#normal, #modal'}
          scrollBar
          fitToSectionDelay={200}
          navigation
          render={(state, fullpage_api) => (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div className="main first">
                  <img src={config.img1} />
                  <div className="buttons">
                    {/* <span style={{ marginBottom: 10, alignSelf: 'flex-end', cursor: 'pointer' }}>报名须知<Icon type="question-circle" theme="outlined" /></span> */}
                    <Button size="large" type="primary" onClick={this.handleButtonClick}>{this.state.myData.majsoulUserName ? '我的报名' : '立即报名'}</Button>
                    <Button onClick={() => this.changeInfoIsShown(true)} size="large">报名须知</Button>
                    <Button onClick={() => window.location.hash="#info"} size="large">参赛人员</Button>
                  </div>
                  <Login
                    login={this.login}
                    isShown={this.state.loginIsShown}
                    changeStatus={this.changeLoginIsShown}
                    islogining={this.state.islogining}
                  />
                  <Signup
                    signup={this.signup}
                    isShown={this.state.signupIsShown}
                    changeStatus={this.changeSignupIsShown}
                    isSignuping={this.state.issignuping}
                  />
                  <Detail
                    isShown={this.state.detailIsShown}
                    changeStatus={this.changeDetailIsShown}
                    {...this.state.myData}
                  />
                  <Modal
                    visible={this.state.infoIsShown}
                    getContainer={() => document.getElementById('modal')}
                    title='CC98雀魂日麻大赛·2018'
                    footer={<Button type="primary" onClick={() => {
                      this.changeInfoIsShown(false)
                      if(!getLocalStorage('detail') && this.state.isLogin && this.state.frombutton) {
                        this.changeSignupIsShown(true)
                        this.setState({
                          frombutton: false
                        })
                      }
                      setLocalStorage('detail', 'detail')
                    }}>我知道了！</Button>}
                    width='60%'
                    closable={false}
                    className="detail_modal"
                  >
                    {text.map(item =><span className={item.length < 10 ? 'detail_title' : ''}>{item}</span>)}
                  </Modal>
                </div>
              </div>
              <div className="section">
                <div className="main second">
                  <img src={config.img2} />
                  <div className="table">
                    <p className="info">当前报名情况：通过审核{this.state.globalData.verifiedCount}人，正在审核{this.state.globalData.verifyingCount}人</p>
                    <p className="info">以下为通过审核成功报名的用户</p>
                    <div id="normal" style={{ borderRadius: 5 }}>
                      <Table
                        ref={it => this.table = it}
                        dataSource={this.state.globalData.verifiedUsers}
                        columns={this.columns}
                        pagination={false}
                        scroll={{ y: 400 }}
                        rowKey="userId"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ReactFullpage.Wrapper>
          )}
        />
      </>
    );
  }
}

export default App;
