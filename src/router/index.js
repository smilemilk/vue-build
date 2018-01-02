import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'home',
      component: _import('home/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/single',
    component: Layout,
    name: 'single',
    meta: {
      role: ['101000'],
      title: '测试'
    },
    redirect: '/single/index',
    children: [
      { path: '', component: _import('single/without'), name: 'without', meta: { icon: 'form', title: '单级导航', role: ['101000'] }},
      { path: 'within/:id', component: _import('single/within'), name: 'within', meta: { title: '子页', role: ['101000'] }, hidden: true }
    ]
    // children: [
    //   {
    //     path: '/single/index',
    //     component: _import('single/index'),
    //     name: 'index',
    //     // meta: { icon: 'form', title: '单级导航', role: ['101000'] },
    //     children: [
    //       { path: '/', component: _import('single/without'), name: 'without', meta: { icon: 'form', title: '单级导航', role: ['101000'] }},
    //       { path: 'within/2', component: _import('single/within'), name: 'within', meta: { title: '子页', role: ['101000'] }, hidden: true }
    //     ]
    //   }]
  },
  {
    path: '/multilevel',
    component: Layout,
    redirect: '/multilevel/two/1',
    name: 'multilevel',
    meta: {
      title: '多级导航',
      icon: 'example',
      role: ['100000', '100200', '100300'] // 页面需要的权限
    },
    children: [
      { path: 'one/index',
        component: _import('multilevel/one/index'),
        name: 'one',
        meta: { title: '二级导航', icon: 'oneMenu', role: ['100000'] }},
      {
        path: '/multilevel/two',
        component: _import('multilevel/two/index'),
        redirect: '/multilevel/two/1',
        name: '三级导航',
        meta: {
          title: '三级导航',
          icon: 'twoMenu',
          role: ['100200', '100300']
        },
        children: [
          { path: '1', component: _import('multilevel/two/1'), name: '1', meta: { title: '三级导航1', role: ['100200'] }},
          { path: '2', component: _import('multilevel/two/2'), name: '2', meta: { title: '三级导航2', role: ['100300'] }}
        ]
      }]
  },
  { path: '*', redirect: '/404', hidden: true }
];

