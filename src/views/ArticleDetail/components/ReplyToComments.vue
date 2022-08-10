<template>
  <div>
    <div class="nav-top">
      <van-nav-bar title="n条回复" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="main">
      <commentItem2></commentItem2>
      <van-cell title="全部回复" />
      <van-list>
        <commentItem2></commentItem2>
        <commentItem2></commentItem2>
        <commentItem2></commentItem2>
        <commentItem2></commentItem2>
      </van-list>
    </div>
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
export default {
  name: 'ReplyToComments',
  components: { commentItem2: () => import('./commentItem2.0.vue') },
  data() {
    return {
      // 控制评论输入框弹层
      show: false,
      // 输入框绑定的内容
      commentValue: ''
    }
  },
  methods: {
    onClickLeft() {
      // 关闭弹窗
      this.$parent.$parent.isShowReply = false
    },
    // 对用户发布评论
    sendComment() {}
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
