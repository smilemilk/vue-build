<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{username}}</div>
    <div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div class="dashboard-text">
      <el-button v-if="btnCompetence(101010)" >添加</el-button>
      <el-button v-if="btnCompetence(101000)">删除</el-button>
    </div>
  </div>
</template>

<script>
import { jsCookie } from '@/utils/auth';
import competence from '@/utils/competence';

export default {
  name: 'home',
  data() {
    return {
      username: jsCookie.get('username'),
      roles: JSON.parse(jsCookie.get('roles'))
    }
  },
  computed: {
    btnCompetence: () => {
      return competence;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
