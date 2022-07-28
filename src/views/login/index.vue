<template>
  <div>
    <!-- 顶部导航区域 -->
    <van-nav-bar title="标题" />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" class="loginForm">
      <van-field
        v-model="loginForm.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="rules.mobileRules"
      >
        <!-- 使用插槽指定输入框前面的字体图标 -->
        <template #label>
          <i class="toutiao toutiao-shouji1"></i>
        </template>
      </van-field>
      <van-field
        v-model="loginForm.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.codeRules"
      >
        <template #label>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
      </van-field>
      <div class="submitBox">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入表单校验规则
import { codeRules, mobileRules } from './rules'
import { login } from '@/api/user'
export default {
  data() {
    return {
      // 登录表单数据
      loginForm: {
        mobile: '',
        code: ''
      },
      // 校验规则
      rules: { codeRules, mobileRules }
    }
  },
  methods: {
    // 表单校验通过时调用
    async onSubmit() {
      try {
        const res = await login(this.loginForm)
        this.$toast.success('登陆成功!')
        console.log(res)
      } catch (error) {
        // 错误细分
        let message = '请重新登录'
        if (error.response.status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style scoped lang="less">
// 顶部导航区域
.van-nav-bar {
  background-color: rgb(51, 150, 252);

  // Vue 样式穿透 :deep(想要穿透的类名)
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
// 表单区域
:deep(.loginForm) {
  .van-field__label {
    flex: 1;
    .toutiao {
      font-size: 40px;
    }
  }
  .van-field__value {
    flex: 18;
  }
  .submitBox {
    margin: 32px;
  }
}
</style>
