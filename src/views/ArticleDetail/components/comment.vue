<template>
  <!-- 评论区 -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
      offset="10"
      :immediate-check="false"
    >
      <commentItem
        v-for="article in artCommentsList"
        :key="article.com_id"
        :article="article"
        @initComment="getComments"
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
      num: 0,
      // 获取文章评论总条数
      artTotal: 0,
      // 文章评论条数列表
      artCommentsList: [],
      // 每次动态加载最后一条评论的id
      nextId: 0,
      // 所有数据的最后一条数据的id
      endId: 0
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    // 文章 -- 获取评论
    async getComments() {
      this.getArtComment.source = this.$route.query.article_id
      const {
        data: { data }
      } = await getCommentAPI(this.getArtComment)
      console.log(data)
      // 文章评论总条数
      this.artTotal = data.total_count
      // 渲染数据列表
      this.artCommentsList.push(...data.results)

      // 每次加载结果最后一条评论的id
      this.nextId = data.last_id
      this.getArtComment.offset = data.last_id
      // 所有数据的最后一个id
      // this.endId = data.end_id
    },
    // 滑动加载
    onLoad() {
      // this.getComments()
      // setTimeout(() => {
      //   // console.log(this.nextId)
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.artCommentsList.length >= this.artTotal) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
