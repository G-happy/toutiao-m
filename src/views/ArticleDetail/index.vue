<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      class="top-navbar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main-wrap">
      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ acticleDetail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            width="50px"
            height="50px"
            :src="acticleDetail.aut_photo"
          />
          <div slot="title" class="user-name">{{ acticleDetail.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ acticleDetail.pubdate }}
          </div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-show="!acticleDetail.is_followed"
            @click="FocusOn('关注')"
            >关注</van-button
          >
          <van-button
            class="follow-btn"
            round
            size="small"
            v-show="acticleDetail.is_followed"
            @click="FocusOn('..')"
            >已关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="acticleDetail.content"
          ref="contentRef"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区 -->
        <comment></comment>
      </div>
      <!-- /加载完成-文章详情 -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = true"
        >写评论</van-button
      >
      <!-- 评论弹出层 -->
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
      <!-- 回复 -->
      <van-icon name="comment-o" badge="123" color="#777" />
      <!-- 未收藏 -->
      <van-icon
        color="#777"
        name="star-o"
        @click="collectArtFn('收藏')"
        v-show="!acticleDetail.is_collected"
      />
      <!-- 已收藏 -->
      <van-icon
        color="orange"
        name="star"
        @click="collectArtFn('..')"
        v-show="acticleDetail.is_collected"
      />
      <!-- 未点赞 -->
      <van-icon
        color="#777"
        name="good-job-o"
        v-show="!showAttitude"
        @click="articleAttFn('点赞')"
      />
      <!-- 已点赞 -->
      <van-icon
        color="orange"
        name="good-job"
        v-show="showAttitude"
        @click="articleAttFn('..')"
      />
      <!-- 转发 -->
      <van-icon name="share-o" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
import comment from './components/comment.vue'
import { ImagePreview } from 'vant'
import {
  getArticleDetailAPI,
  focusOnUserAPI,
  cancelFocusUserAPI,
  collectArticleAPI,
  cancleCollectArticleAPI,
  articleLikeAPI,
  cancleArticleLikeAPI,
  sendCommentAPI
} from '@/api'
import '@/assets/css/github-markdown.css'
export default {
  components: { comment },
  name: 'articleDetail',
  data() {
    return {
      acticleDetail: {},
      // 是否点赞
      showAttitude: '',
      // 文章id
      art_id: '',
      // 控制评论输入框弹层
      show: false,
      // 输入框绑定的内容
      commentValue: '',
      // 文章评论信息配置对象
      artComment: {
        target: '',
        content: '',
        art_id: 0
      }
    }
  },
  mounted() {
    this.getArticleDetail()
  },
  methods: {
    // 初始化文章详情
    async getArticleDetail() {
      this.art_id = this.$route.query.article_id
      try {
        const {
          data: { data }
        } = await getArticleDetailAPI(this.art_id)
        this.acticleDetail = data
        // 处理点赞的数据
        if (this.acticleDetail.attitude === 1) {
          this.showAttitude = true
        } else {
          this.showAttitude = false
        }
        // 文章 id
        this.art_id = data.art_id
        setTimeout(() => {
          this.previewImg()
        }, 10)
      } catch (error) {
        this.$toast.fail('获取文章失败,请刷新~~')
      }
    },
    // 图片预览
    previewImg() {
      // 获取所有的 img 标签
      const contentEl = this.$refs.contentRef
      const allImg = contentEl.querySelectorAll('img')
      const images = []
      allImg.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 关注 / 取消关注
    async FocusOn(str) {
      try {
        if (str === '关注') {
          await focusOnUserAPI(this.acticleDetail.aut_id)
        } else {
          await cancelFocusUserAPI(this.acticleDetail.aut_id)
        }
      } catch (error) {
        this.$toast.fail('获取信息失败,请刷新页面~')
      } finally {
        this.getArticleDetail()
      }
    },
    // 收藏 / 取消收藏
    async collectArtFn(str) {
      try {
        if (str === '收藏') {
          await collectArticleAPI(this.art_id)
        } else {
          await cancleCollectArticleAPI(this.art_id)
        }
      } catch (error) {
        this.$toast.fail('收藏失败,请刷新~')
      } finally {
        this.getArticleDetail()
      }
    },
    // 点赞 / 取消点赞
    async articleAttFn(str) {
      try {
        if (str === '点赞') {
          await articleLikeAPI(this.art_id)
        } else {
          cancleArticleLikeAPI(this.art_id)
        }
      } catch (error) {
        this.$toast.fail('获取信息失败,请刷新~')
      } finally {
        this.getArticleDetail()
      }
    },
    // 发布评论
    async sendComment() {
      this.artComment.target = this.art_id
      this.artComment.content = this.commentValue
      await sendCommentAPI(this.artComment)
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
// 顶部导航条
:deep(.top-navbar) {
  background-color: #3296fa;
  position: fixed;
  width: 100%;
  top: 0;
  .van-nav-bar__left {
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
// 内容
:deep(.main-wrap) {
  width: 100%;
  max-height: calc(100vh - 92px - 88px);
  margin-top: 1.25rem;
  overflow: auto;
  .article-detail {
    // 标题
    .article-title {
      font-size: 0.53333rem;
      padding-left: 60px;
    }
    // 用户信息
    .user-info {
      // 头像
      .avatar {
        width: 100px;
        height: 100px;
        margin-right: 50px;
      }
    }
    .article-content {
      h2 {
        font-weight: 600;
        line-height: 1.25;
        font-size: 0.4rem;
      }
    }
  }
}
// 底部
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}
// 评论
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
