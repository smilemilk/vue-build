import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'admin/system/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout(token, operateId) {
  return request({
    url: 'admin/system/logout',
    method: 'post',
    data: {
      token,
      operateId
    }
  })
}
