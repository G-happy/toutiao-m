<template>
  <!-- 对评论进行回复组件 -->
  <div>
    <div class="nav-top">
      <van-nav-bar
        :title="total_count + '条回复'"
        left-arrow
        @click-left="$parent.$parent.isShowReply = false"
      />
    </div>
    <!-- 内容组件 -->
    <div class="main">
      <!-- 楼主评论 -->
      <commentItem :article="article" :disabled="'disabled'"></commentItem>
      <van-cell title="全部回复" />
      <!-- 楼下评论 -->
      <van-empty description="还没有评论哦~~" v-if="isShowEmpty" />

      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :finished="finished"
        finished-text="没有更多了"
        offset="10"
      >
        <commentItem
          v-for="article in CommentList"
          :key="article.com_id"
          :article="article"
          :disabled="'disabled'"
          :id="article.com_id"
        ></commentItem>
      </van-list>
    </div>
    <!-- 底部按钮,点击输入回复内容 -->
    <div class="btn-box">
      <van-button round type="default" @click="show = true">评论</van-button>
      <!-- 弹出层 -->
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '25%' }"
        class="editComment"
      >
        <van-field
          v-model="commentValue"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button size="small" type="primary" @click="sendComment"
          >发布</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import { sendCommentAPI, getCommentAPI } from '@/api'
export default {
  name: 'ReplyToComments',
  components: { commentItem: () => import('./commentItem.vue') },
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 控制评论输入框弹层
      show: false,
      // 输入框绑定的内容
      commentValue: '',
      // 回复 -- 楼下评论
      CommentList: [],
      // 回复量
      total_count: 0,
      error: false,
      loading: false,
      finished: false,
      // 获取回复评论的配置信息
      getComObj: {
        type: 'c',
        source: 0,
        offset: '',
        limit: 4
      },
      // 控制空状态是否展示
      isShowEmpty: true
    }
  },
  created() {},
  methods: {
    // 回复 -- 获取评论  动态加载
    async onLoad() {
      try {
        // 1.处理配置信息
        this.getComObj.source = this.article.com_id
        // 2.发送请求
        const {
          data: { data }
        } = await getCommentAPI(this.getComObj)
        // 3.下一次获取评论的开始id
        this.getComObj.offset = data.last_id
        // 4.文章评论的回复量
        this.total_count = data.total_count

        // 5.保存回复列表
        this.CommentList.push(...data.results)
      } catch (error) {
        this.$toast.fail('获取评论失败~')
      } finally {
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.CommentList.length >= this.total_count) {
          this.finished = true
        }
      }
    },
    // 回复 -- 发布评论
    async sendComment() {
      try {
        const {
          data: { data }
        } = await sendCommentAPI({
          target: this.article.com_id,
          content: this.commentValue,
          art_id: this.$route.query.article_id
        })
        // 1.向评论列表中添加本次发布的数据
        this.CommentList.unshift(data.new_obj)
        // 2.清空输入框
        this.commentValue = ''
      } catch (error) {
        this.$toast.fail('发布评论失败~')
      } finally {
        this.show = false
      }
    }
  },
  updated() {
    if (this.CommentList.length !== 0) {
      this.isShowEmpty = false
    }
  }
}
</script>

<style scoped lang="less">
// 顶部
.nav-top {
  width: 100%;
  position: fixed;
  top: 0;
}
// 评论
:deep(.main) {
  margin-top: 92px;
  max-height: calc(100vh - 92px - 108px);
  overflow: auto;
  .van-cell {
    border-bottom: 0.005rem solid #eee;
  }
}
// 按钮
.btn-box {
  position: fixed;
  bottom: 0;
  width: 94%;
  padding: 10px 20px;
  background-color: #2589ff;
  button {
    width: 100%;
  }
}
// 弹出层
:deep(.editComment) {
  display: flex;
  .van-cell {
    width: 85%;
    padding-right: 10px;
    .van-cell__value {
      height: 100%;
      background-color: #eee;
      border-radius: 15px;
    }
    .van-field__body {
      .van-field__control {
        padding: 20px 20px;
      }
    }
    .van-field__word-limit {
      margin-top: 1.5rem;
      margin-right: 8px;
    }
  }
  .van-button {
    margin: 20px 0;
    height: 87%;
    width: 90px;
    border-radius: 10px;
    background-color: #2b7ccd;
    border: 0.02667rem solid #2b7ccd;
  }
}
</style>
