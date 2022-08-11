<template>
  <!-- 评论区 -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <commentItem
        v-for="article in artCommentsList"
        :key="article.com_id"
        :article="article"
        :id="article.com_id"
      ></commentItem>
    </van-list>
  </div>
</template>

<script>
import commentItem from './commentItem.vue'
import { getCommentAPI } from '@/api'
export default {
  props: {},
  components: { commentItem },
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      // 获取文章评论的配置对象信息
      getArtComment: {
        type: 'a',
        source: 0,
        offset: '',
        limit: 2
      },
      // 获取文章评论总条数
      artTotal: 0,
      // 文章评论条数列表
      artCommentsList: []
    }
  },
  mounted() {},
  methods: {
    // 文章 -- 获取评论 滑动加载
    async onLoad() {
      this.getArtComment.source = this.$route.query.article_id
      try {
        const {
          data: { data }
        } = await getCommentAPI(this.getArtComment)
        // 1.判断是否还有评论数据
        if (data.end_id === 'NULL') {
          this.finished = true
        }
        // 2.新获取的评论添加到数据列表
        this.artCommentsList.push(...data.results)
        // 3.对'单次加载最后一条评论的id'重新赋值
        this.getArtComment.offset = data.last_id
        // // 4.保存评论总条数
        this.artTotal = data.total_count
      } catch (error) {
        // this.$toast.fail('获取评论失败,请刷新~')
      } finally {
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.artCommentsList.length >= this.artTotal) {
          this.finished = true
        } else {
          this.finished = false
        }
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
