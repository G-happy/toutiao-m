<template>
  <div>
    <!-- 顶部导航区域 -->
    <van-nav-bar title="登录" />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" class="loginForm" ref="loginForm">
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
        <!-- 使用插槽指定输入框后面的验证码按钮 -->
        <template #button>
          <!--  native-type="button" 阻止点击验证码按钮时提交表单 -->
          <van-button
            type="default"
            class="codeBtn"
            size="mini"
            round
            v-if="isShow"
            native-type="button"
            @click="getCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isShow = !isShow"
          />
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
import { loginAPI, getCodeAPI } from '@/api'

export default {
  data() {
    return {
      // 登录表单数据
      loginForm: {
        mobile: '',
        code: ''
      },
      // 校验规则
      rules: { codeRules, mobileRules },
      // 验证码按钮是否显示
      isShow: true
    }
  },
  methods: {
    // 加载等待
    loading() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登陆中...'
      })
    },

    // 表单校验通过时调用
    async onSubmit() {
      this.loading()
      try {
        const {
          data: { data }
        } = await loginAPI(this.loginForm)
        // 将 token 保存到 Vuex 中
        this.$store.commit('SET_TOKEN', data)
        this.$router.push('/profile')

        // 页面跳转
        this.$toast.success('登陆成功!')
      } catch (error) {
        // 错误细分
        let message = '请重新登录'
        if (error.response.status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 获取验证码
    getCode() {
      // 1.验证手机号
      this.$refs.loginForm
        .validate('mobile')
        .then(async () => {
          this.loading()
          try {
            // 2.发送请求
            await getCodeAPI(this.loginForm.mobile)
            this.$toast.success('获取验证码成功')
            // 显示倒计时
            this.isShow = !this.isShow
          } catch (error) {
            // let message = '手机号码不正确'
            // if (error.response.status === 429) {
            //   message = error.response.data.message
            // }
            return this.$toast.fail(error.response.data.message)
          }
        })
        .catch((err) => err)
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
// 验证码按钮
.codeBtn {
  background-color: #eeeeee;
  color: #a9929b;
  padding: 0 0.2rem;
}
</style>
