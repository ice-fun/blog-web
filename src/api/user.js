import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/stnl/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/stnl/admin/account/checkTokenStatus',
    method: 'post'
  })
}

// 修改密码时获取验证码
export function verifyCodeFunc(data) {
  return request({
    url: '/stnl/admin/account/verifyCode',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/getUserList'
  })
}

export function addUser(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/addUser'
  })
}

export function modifyUser(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/editUserById'
  })
}

export function delUser(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/deleteUserById'
  })
}

export function freezeOrActiveUserById(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/freezeOrActiveUserById'
  })
}

export function resetPasswordById(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/resetPasswordById'
  })
}

export function editPassword(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/editPassword'
  })
}

export function drainerAll() {
  return request({
    method: 'post',
    url: '/stnl/admin/user/drainerAll'
  })
}

export function drainers(data) {
  return request({
    method: 'post',
    data,
    url: '/stnl/admin/user/drainers'
  })
}
