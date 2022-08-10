<template>
  <div>
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      offset="100"
      :immediate-check="false"
    >
      <commentItem
        v-for="(article, index) in artCommentsList"
        :key="index"
        :article="article"
      ></commentItem>
      <!-- <commentItem></commentItem> -->
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
      // 获取文章评论的配置对象信息
      getArtComment: {
        type: 'a',
        source: 0,
        offset: '',
        limit: ''
      },
      // 获取文章评论总条数
      artTotal: 0,
      // 文章评论条数列表
      artCommentsList: []
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    // 获取文章评论
    async getComments() {
      this.getArtComment.source = this.$route.query.article_id
      const {
        data: { data }
      } = await getCommentAPI(this.getArtComment)
      // 文章评论总条数
      this.artTotal = data.total_count
      this.artCommentsList = data.results
      console.log(data)
    },
    // 滑动加载
    onLoad() {
      console.log('滑动加载')
    }
  }
}
</script>

<style scoped lang="less"></style>
