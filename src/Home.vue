<template>
  <div id="home">
    <el-container>

      <base-header :active-index="activeIndex" />

      <router-view class="me-container" />

      <base-footer v-show="footerShow" />

    </el-container>

  </div>

</template>

<script>
import BaseFooter from '@/components/BaseFooter'
import BaseHeader from '@/views/BaseHeader'

export default {
  name: 'Home',
  components: {
    'base-header': BaseHeader,
    'base-footer': BaseFooter
  },
  data() {
    return {
      activeIndex: '/',
      footerShow: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.activeIndex = to.path
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path == '/') {
      this.footerShow = true
    } else {
      this.footerShow = false
    }
    this.activeIndex = to.path
    next()
  }
}
</script>

<style>

  .me-container {
    margin: 100px auto 140px;
  }
</style>
