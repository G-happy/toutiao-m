<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-form validate-first>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="nickname"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        show-word-limit
      />
    </van-form>
  </div>
</template>

<script>
import { editUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      // 用户昵称
      nickname: this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    userObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 昵称 --点击取消按钮
    onClickLeft() {
      // 数据回显
      this.nickname = this.name
      // 关闭弹窗
      // this.$parent.$parent.isShowNick = false
      this.$emit('changeIsShowNick')
    },
    // 昵称 --点击确认按钮
    async onClickRight() {
      if (this.nickname === this.name) {
        this.$emit('changeIsShowNick')
        return
      }
      // this.$parent.$parent.userObj.name = this.nickname
      this.$emit('nickName', this.nickname)

      await editUserInfoAPI(this.userObj)

      // this.$parent.$parent.getUserInfo()
      this.$emit('initUserInfo')

      // 关闭弹窗
      // this.$parent.$parent.isShowNick = false
      this.$emit('changeIsShowNick')
    }
  }
}
</script>

<style></style>
