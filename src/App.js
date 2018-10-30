import React, { Component } from 'react';
import { Button } from 'antd'

import Login from './components/Login'

import { logIn } from './network'
import { getLocalStorage } from './utils';

class App extends Component {
  state = {
    loginIsShown: false,
    isLogin: !!getLocalStorage('token'),
    userInfo: {}
  }

  login = async (params) => {
    const info = await logIn(params)
    if(!info) return
    this.setState({
      isLogin: true,
      loginIsShown: false,
      userInfo: info
    })
  }
  
  changeLoginIsShown = status => {
    this.setState({
      loginIsShown: status,
    })
  }

  handleButtonClick = () => {
    if(!this.state.isLogin) {
      this.changeLoginIsShown(true)
      return
    } else {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="1" className="main">
        <img src={require('./assets/main.jpg')} />
        <div className="buttons">
          <Button size="large" type="primary" onClick={this.handleButtonClick}>立即报名</Button>
          <Button size="large" type="primary">报名状态</Button>
        </div>
        <Login
          login={this.login}
          isShown={this.state.loginIsShown}
          changeStatus={this.changeLoginIsShown}
        />
      </div>
    );
  }
}

export default App;
