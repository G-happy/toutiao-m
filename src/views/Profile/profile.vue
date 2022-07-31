<template>
  <div>
    <!-- header 区域 -->
    <div>
      <!-- header --登录 -->
      <div v-if="isLogin">登录盒子</div>
      <!-- header --未登录 -->
      <div v-else>未登录</div>
    </div>

    <!-- main 区域 -->
    <div>收藏区域</div>

    <!-- button 区域 -->
    <van-button type="danger" @click="logout" v-if="isLogin" class="quitLogin"
      >退出</van-button
    >
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '标题',
          message: '弹窗内容'
        })
        .then(() => {
          // on confirm
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  }
}
</script>

<style scoped lang="less">
// 退出按钮
.quitLogin {
  width: 60%;
  height: 0.9rem;
  border-radius: 0.45rem;
}
</style>
