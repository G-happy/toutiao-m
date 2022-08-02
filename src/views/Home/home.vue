<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">默认按钮</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航区域 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id">
        <ArticlesList :id="item.id"></ArticlesList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1"></span>
    </van-tabs>
  </div>
</template>

<script>
import { channelsAPI } from '@/api'
import ArticlesList from './components/ArticlesList.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      channelsList: []
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    // 获取导航条频道信息
    async getChannels() {
      try {
        const { data } = await channelsAPI()
        this.channelsList = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取频道失败,请刷新')
      }
    }
  },
  components: { ArticlesList }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;
  .search-btn {
    width: 7.4rem;
    height: 0.85333rem;
    background-color: #5babfb;
    color: #fff;

    &.van-button--default {
      border: 0.02667rem solid #5babfb;
    }
    .van-icon {
      color: #fff;
    }
  }
  .van-nav-bar__title {
    max-width: unset;
  }
}
// 导航区域
:deep(.van-tab__pane) {
  min-height: calc(100vh - 92px - 88px - 100px);
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 92px;
  right: 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 88px - 100px);
  // padding-bottom: 100px;
  overflow: auto;
}
:deep(.van-tabs) {
  height: calc(100vh - 92px - 88px - 100px);
}
</style>
