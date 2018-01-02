<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'|| index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else-if="index === 0" :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        <span v-else class="breadcrumb-desc">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'Home') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    &:hover {
      color: #303133 !important;
    }
    position: fixed;
    right: 0;
    left: 220px;
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    padding-left: 10px;
    background: #ffffff;
    transition: 0.28s;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
    /*.el-breadcrumb__item {*/
      /*&:not(:last-child) {*/
        /*color: #303133 !important;*/
        /*&:hover {*/
          /*color: #303133 !important;*/
        /*}*/
        /*.el-breadcrumb__inner {*/
          /*&:hover {*/
            /*color: #303133 !important;*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
    .breadcrumb-desc {
      &:hover {
        color: #303133;
        cursor: text;
      }
    }
  }
  .hideSidebar .app-breadcrumb.el-breadcrumb {
    left: 36px;
    transition: 0.28s;
  }
</style>
