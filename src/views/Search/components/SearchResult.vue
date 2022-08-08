<template>
  <div class="searchRes">
    <van-list
      v-model="loading"
      :error.sync="error"
      loading-text="加载中..."
      error-text="加载失败,点击重新加载~"
      finished-text="人家也是有底线的~~"
      offset="100"
      @load="onLoad"
      :finished="finished"
      :immediate-check="false"
    >
      <van-cell
        v-for="item in searchResList"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  name: 'SearchResult',
  data() {
    return {
      // 请求信息配置
      query: {
        page: 1,
        per_page: 15,
        q: ''
      },
      // 搜索结果总条数
      total: 0,
      // 搜索结果列表
      searchResList: [],
      error: false,
      loading: false,
      finished: false
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created() {
    this.getSearchResult()
  },
  mounted() {},
  methods: {
    // 获取搜索结果
    async getSearchResult() {
      try {
        this.query.q = this.keywords
        const {
          data: { data }
        } = await getSearchResultAPI(this.query)
        this.total = data.total_count
        this.searchResList.push(...data.results)
      } catch (error) {
        this.$toast.fail('搜索信息失败,请重新搜索~')
      }
    },
    // 滚动加载
    async onLoad() {
      try {
        this.query.page++
        await this.getSearchResult()
        // 数据全部加载完成
        if (this.searchResList.length >= this.total) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        // 加载状态结束
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
