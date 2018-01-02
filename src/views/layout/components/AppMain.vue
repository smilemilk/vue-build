<template>
  <section class="app-main">
    <breadcrumb></breadcrumb>
    <transition name="fade" mode="out-in">
      <div class="app-container">
        <!-- <router-view :key="key"></router-view> -->
        <router-view></router-view>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
