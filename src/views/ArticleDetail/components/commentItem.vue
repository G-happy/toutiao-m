<template>
  <!-- 评论文章的用户模块 -->
  <div>
    <div class="userComment">
      <!-- 左侧头像 -->
      <div class="avator">
        <img :src="article.aut_photo" alt="" />
      </div>
      <!-- 右侧内容 -->
      <div class="right-box">
        <!-- 用户名称和点赞 -->
        <div class="right-top">
          <p>{{ article.aut_name }}</p>
          <span>
            <!-- 未点赞 -->
            <van-icon
              name="good-job-o"
              @click="isLikeFn('赞')"
              v-show="!article.is_liking"
            >
              {{ article.like_count }}</van-icon
            >
            <!-- 已点赞 -->
            <van-icon
              name="good-job"
              color="orange"
              @click="isLikeFn('.')"
              v-show="article.is_liking"
            >
              {{ article.like_count }}
            </van-icon>
          </span>
        </div>
        <!-- 评论内容 -->
        <div class="content">
          <p>
            {{ article.content }}
          </p>
        </div>
        <!-- 发布时间和回复 -->
        <div class="right-bottom">
          <span class="time">{{ article.pubdate }}</span>
          <button @click="isShowReply = true" :disabled="disabled">
            回复 {{ article.reply_count }}
          </button>
          <!-- 回复的弹出层 -->
          <van-popup
            v-model="isShowReply"
            position="bottom"
            :style="{ height: '100%' }"
          >
            <!-- 内容组件 -->
            <ReplyToComments :article="article"></ReplyToComments>
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyToComments from './ReplyToComments.vue'
import { likingsAPI, noLikeingAPI } from '@/api'
export default {
  name: 'commentItem',
  components: { ReplyToComments },
  props: {
    article: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: String
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      // 控制回复弹层出现
      isShowReply: false,
      // 是否点赞
      isZan: ''
    }
  },
  created() {},
  methods: {
    // 文章/回复 -- 点赞 / 取消点赞
    async isLikeFn(str) {
      let newArr = this.$parent.$parent.artCommentsList
      if (newArr === undefined) {
        newArr = this.$parent.$parent.CommentList
      }
      try {
        if (str === '赞') {
          // 点赞
          await likingsAPI(this.article.com_id)
          newArr.forEach((item) => {
            console.log(item.com_id)
            console.log(this.id)
            if (item.com_id === this.id) {
              item.is_liking = true
              item.like_count++
            }
          })
        } else {
          // 取消点赞
          await noLikeingAPI(this.article.com_id)
          newArr.forEach((item) => {
            if (item.com_id === this.id) {
              item.is_liking = false
              item.like_count--
            }
          })
        }
      } catch (error) {
        this.$toast.fail('获取评论失败,无法点赞或取消~')
      }
    }
  }
}
</script>

<style scoped lang="less">
.userComment {
  display: flex;
  width: 90%;
  padding: 20px 32px;
  border-bottom: 1px solid #eee;
  // 左侧头像
  .avator {
    width: 72px;
    height: 72px;
    border: 1px solid #eee;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  // 右侧内容
  .right-box {
    width: 620px;
    padding-left: 20px;
    // 用户名称和点赞
    .right-top {
      display: flex;
      justify-content: space-between;
      height: 48px;
      line-height: 48px;
      p {
        height: 48px;
        font-size: 0.34667rem;
        margin: 0;
      }
      span {
        height: 48px;
        font-size: 0.34667rem;
      }
    }
    // 评论内容
    .content {
      p {
        font-size: 0.34667rem;
      }
    }
    // 发布时间和回复
    .right-bottom {
      .time {
        font-size: 0.34667rem;
        margin-right: 30px;
      }
      button {
        width: 1.8rem;
        height: 0.64rem;
        font-size: 0.28rem;
        color: #222;
        border-radius: 26.64rem;
        background-color: #fff;
        border: 0.02667rem solid #ebedf0;
      }
    }
  }
}
</style>
