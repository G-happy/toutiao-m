<template>
  <div>
    <!-- 顶部 -->
    <van-cell title="搜索历史" v-if="show">
      <template #default>
        <van-icon name="delete-o" @click="show = false" />
      </template>
    </van-cell>
    <van-cell title="搜索历史" class="sh" v-else>
      <span class="item" @click="delAllSearchHistory">全部删除</span>
      <span class="item" @click="show = true">完成</span>
    </van-cell>

    <!-- 搜索结果 -->
    <van-cell
      :title="item"
      v-for="(item, index) in historyList"
      :key="index"
      @click="toSearchRes(item)"
    >
      <template #default>
        <!-- 阻止事件冒泡 -->
        <van-icon name="close" v-show="!show" @click.stop="_del(index)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
// import { getSearchResultAPI } from '@/api'
export default {
  data() {
    return {
      show: true,
      historyList: []
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    // 获取本地记录
    getHistory() {
      this.historyList = JSON.parse(localStorage.getItem('keywordsList'))
    },
    // 全部删除
    delAllSearchHistory() {
      localStorage.removeItem('keywordsList')
      this.getHistory()
    },
    // 删除单个
    _del(index) {
      const newArr = JSON.parse(localStorage.getItem('keywordsList')).filter(
        (_, ind) => {
          return index !== ind
        }
      )
      localStorage.setItem('keywordsList', JSON.stringify(newArr))
      this.getHistory()
    },
    // 点击搜索历史,展示搜索结果
    toSearchRes(item) {
      this.$bus.$emit('res', item)
      // console.log(item)
    }
  }
}
</script>

<style scoped lang="less">
.sh {
  .item {
    margin: 0 10px;
  }
}
.van-icon-close {
  padding: 10px;
}
</style>
