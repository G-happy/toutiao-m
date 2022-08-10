<template>
  <!-- 对评论进行回复组件 -->
  <div>
    <div class="nav-top">
      <van-nav-bar
        :title="CommentList.length + '条回复'"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 内容组件 -->
    <div class="main">
      <!-- 楼主评论 -->
      <commentItem :article="article" :disabled="'disabled'"></commentItem>
      <van-cell title="全部回复" />
      <!-- 楼下评论 -->
      <van-list>
        <commentItem
          v-for="article in CommentList"
          :key="article.com_id"
          :article="article"
          :disabled="'disabled'"
          @initComment="ss"
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
      CommentList: []
    }
  },
  created() {
    this.getSecondComment()
  },
  methods: {
    onClickLeft() {
      // 关闭弹窗
      this.$parent.$parent.isShowReply = false
    },
    // 回复 -- 获取评论
    async getSecondComment() {
      const {
        data: {
          data: { results }
        }
      } = await getCommentAPI({
        type: 'c',
        source: this.article.com_id,
        offset: '',
        limit: ''
      })
      this.CommentList = results
    },
    // 回复 -- 发布评论
    async sendComment() {
      // console.log(this.$route.query.article_id)
      await sendCommentAPI({
        target: this.article.com_id,
        content: this.commentValue,
        art_id: this.$route.query.article_id
      })
      this.show = false
      this.commentValue = ''
      this.getSecondComment()
    },
    ss() {
      this.getSecondComment()
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
