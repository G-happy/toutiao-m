<template>
  <div>
    <van-pull-refresh
      v-model="LoadingJudgment.refreshing"
      @refresh="getNextPageArticle"
      success-text="文章加载成功"
    >
      <van-list
        v-model="LoadingJudgment.loading"
        @load="getNextPageArticle"
        :immediate-check="false"
        offset="100"
        :finished="LoadingJudgment.finished"
        finished-text="没有更多文章了"
        :error.sync="LoadingJudgment.error"
        error-text="请求失败，点击重新加载~"
      >
        <!-- 每篇文章组件 -->
        <ArticleItem
          v-for="item in firstPageArticlesList"
          :key="item.art_id"
          :articleInfo="item"
          @click.native="toDetailFn(item.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsListAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticleList',
  // 接收 home 组件传递过来的数据
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      // 第一页文章列表
      firstPageArticlesList: [],
      // 保存时间戳
      pre_timestamp: '',
      // 加载判断
      LoadingJudgment: {
        // 每次触发load事件都会改为 true,本次加载完毕后再改为 false
        loading: false,
        // 数据加载完毕时,改为 true
        finished: false,
        // 加载错误显示错误提示,用户点击错误提示后会重新触发 load 事件
        error: false,
        // 下拉刷新
        refreshing: false
      }
    }
  },
  created() {
    this.getFirstPageArticlesList()
  },
  methods: {
    // 文章列表 - 第一次获取文章
    async getFirstPageArticlesList() {
      try {
        const {
          data: { data }
        } = await getNewsListAPI(this.id, +new Date())
        this.firstPageArticlesList = data.results
        this.pre_timestamp = data.pre_timestamp
      } catch (error) {
        this.$toast.fail('获取文章失败,请刷新~')
      }
    },
    // 文章列表 - 获取下一页数据
    async getNextPageArticle() {
      try {
        // 1.发送请求
        const {
          data: { data }
        } = await getNewsListAPI(this.id, this.pre_timestamp)

        // 2.判断数据是否加载完毕
        if (data.pre_timestamp === null) {
          this.LoadingJudgment.finished = true
        }
        // 3.存储时间戳
        this.pre_timestamp = data.pre_timestamp
        // 4.保存数据信息
        if (this.LoadingJudgment.refreshing) {
          // 下拉刷新
          this.firstPageArticlesList.unshift(...data.results)
        } else {
          // 上滑刷新
          this.firstPageArticlesList.push(...data.results)
        }
      } catch (error) {
        this.LoadingJudgment.error = true
      } finally {
        // 5.禁止多次请求
        this.LoadingJudgment.loading = false
        this.LoadingJudgment.refreshing = false
      }
    },
    // 文章详情 - 点击跳转至文章详情
    toDetailFn(id) {
      this.$router.push({
        path: `/detail?article_id=${id}`
      })
      console.log(id)
    }
  },
  components: { ArticleItem }
}
</script>

<style></style>
