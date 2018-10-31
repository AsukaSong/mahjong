import config from './config.json'
import { setLocalStorage, getLocalStorage } from './utils'

import { message } from 'antd'

function encodeParams(params) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')
}

/**
 * 登录
 */
export async function logIn({ username, password }) {
  /**
   * 请求的正文部分
   * 密码模式需要 5个参数
   * 其中 client_id 和 client_secret 来自申请的应用，grant_type 值为 "password"
   */
  const requestBody = {
    client_id: '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
    client_secret: '8b53f727-08e2-4509-8857-e34bf92b27f2',
    grant_type: 'password',
    username,
    password,
    scope: 'cc98-api openid offline_access',
  }

  try {
    const response = await fetch(config.oauth, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: encodeParams(requestBody),
    })

    if(!response.ok) throw new Error('用户名或密码错误')

    const data = await response.json()

    const token = data.token_type + ' ' + data.access_token

    const res = await fetch(config.api + '/me', {
      headers: new Headers({
        Authorization: token
      })
    })

    const info = await res.json()
    if (info.lockState === 1 || info.lockState === 2) {
      throw new Error('账号已锁定');
  }

    message.success('登陆成功')
    setLocalStorage('token', token, data.expires_in)
    setLocalStorage('userinfo', info)

    return info
  } catch(e) {
    message.error(e.message)
  }
}

export async function signup(vals) {
  try {
    const res = await fetch(config.api + '/enroll/majsoul2018/register', {
      method: 'POST',
      headers: new Headers({
        Authorization: getLocalStorage('token'),
        'Content-type': 'application/json'
      }),
      body: JSON.stringify(vals),
    })
    console.log(res)

    if(!res.ok) throw new Error(await res.text())
    message.success('报名成功')
  } catch(e) {
    if(e.message === 'already_registered') {
      message.error('你已经报名过了')
      return
    }
    message.error(e.message)
  }
}

export async function getMyStatus() {
  try {
    const res = await fetch(config.api + '/enroll/majsoul2018/me', {
      headers: new Headers({
        Authorization: getLocalStorage('token'),
      }),
    })

    if(!res.ok) throw new Error(res.statusText)
    if(res.status === 204) return null

    const data = await res.json()
    return data
  } catch(e) {
    message.error(e.message)
  }
}

export async function getGlobalStatus() {
  try {
    const res = await fetch(config.api + '/enroll/majsoul2018/global')

    if(!res.ok) throw new Error(res.statusText)

    const data = await res.json()
    return data
  } catch(e) {
    message.error(e.message)
  }
}
