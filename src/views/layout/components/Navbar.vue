<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <el-dropdown class="user-container">
      <div class="user-wrapper">
        <span>{{username}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            修改密码
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { jsCookie } from '@/utils/auth';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      username: jsCookie.get('username')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  right: 0;
  left: 220px;
  height: 50px;
  line-height: 50px;
  transition: 0.28s;
  border-radius: 0px !important;
  z-index: 2000;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .user-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    font-size: 16px;
    &:hover {
      padding-left: 10px;
      box-sizing: border-box;
      border-bottom:4px solid #304156;
    }
    .user-wrapper {
      cursor: pointer;
      margin-top: 0;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        font-size: 12px;
      }
    }
  }
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>

