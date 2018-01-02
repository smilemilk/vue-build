<template>
  <div class="sys-sidebar">
    <!--<div class="sys-logo">后台管理系统</div>-->
    <!-- <div><svg-icon class="sys-logo" icon-class="password"></svg-icon></div> -->
    <router-link to="/" class="sys-logo">
      <svg-icon class="icon-home" icon-class="home"></svg-icon>
      <span>后台管理系统</span>
    </router-link>
    <scroll-bar>
      <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
        <sidebar-item :routes="permission_routers"></sidebar-item>
      </el-menu>
    </scroll-bar>
    <!-- <scroll-bar>
      <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
