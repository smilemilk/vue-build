import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { jsCookie } from '@/utils/auth';

var isFlag = false;
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = jsCookie.get('token');
  // const hasOperateId = jsCookie.get('operatorId');
  const hasRoles = jsCookie.getJson('roles');

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (hasRoles.length === 0) { // 没有权限
        store.dispatch('FedLogOut').then(() => {
          Message.error('验证失败,请重新登录');
          next({ path: '/login' });
          NProgress.done();
        });
      } else { // 有权限
        if (!isFlag) {
          store.dispatch('GenerateRoutes', hasRoles).then(() => {
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由
            isFlag = true;
            next({ ...to, replace: true });
          })
        } else {
          next();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
