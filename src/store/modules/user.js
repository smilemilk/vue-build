import { login, logout } from '@/api/login';
import { jsCookie } from '@/utils/auth';

const user = {
  state: {
    token: '',
    operatorId: '',
    username: '',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OPERATORID: (state, operatorId) => {
      state.operatorId = operatorId
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // 模拟token，接口不通，写的假数据
      // jsCookie.set('token', '14f869ef7e1e467bc7200ed2f46f0a80');
      // jsCookie.set('operatorId', response.operatorId);
      // jsCookie.set('name', 'admin');
      // jsCookie.set('username', 'admin');
      // jsCookie.set('roles', ['1000000', '100000', '100200', '100300', '101000']); // 模拟假的权限码
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password).then(response => {
          jsCookie.set('token', response.token || '');
          jsCookie.set('operatorId', response.operatorId || '');
          jsCookie.set('name', response.operatorInfo.name || '');
          jsCookie.set('username', response.operatorInfo.username || '');
          // 模拟的权限id
          const roleIdArr = ['100000', '100200', '100300', '101000']; // 导航路由权限
          const roleButtonIdArr = ['101010', '101020', '101030']; // 按钮路由权限
          jsCookie.set('roles', response.role || roleIdArr || []);
          jsCookie.set('rolesButton', response.role || roleButtonIdArr || []);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.role)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(JSON.stringify(state.token, state.operatorId)).then(() => {
          jsCookie.remove('token');
          jsCookie.remove('operatorId');
          jsCookie.remove('name');
          jsCookie.remove('username');
          jsCookie.remove('roles');
          jsCookie.remove('rolesButton');
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出 (无权限)
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        jsCookie.remove('token');
        jsCookie.remove('operatorId');
        jsCookie.remove('name');
        jsCookie.remove('username');
        jsCookie.remove('roles');
        jsCookie.remove('rolesButton');
        resolve()
      })
    }
  }
}

export default user;
