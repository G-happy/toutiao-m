<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route @change="onChange">
      <van-tabbar-item
        :to="item.to"
        v-for="(item, index) in tabbarData"
        :key="index"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"></span>
          <span>{{ item.text }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      tabbarData: [
        { to: '/ ', icon: 'toutiao-shouye1', text: '首页' },
        { to: '/video', icon: 'toutiao-shipin', text: '视频' },
        { to: '/qa', icon: 'toutiao-wenda', text: '问答' },
        { to: '/profile', icon: 'toutiao-wode', text: '我的' }
      ]
    }
  },
  methods: {
    onChange(active) {
      console.log(active)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  font-size: 0.35rem;
  .toutiao {
    font-size: 0.5rem;
  }
}
</style>
