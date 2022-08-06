<template>
  <div class="box">
    <!-- 公共部分 -->
    <div class="public">
      <!-- 背景图片 -->
      <div class="bgc"></div>
      <!-- 收藏/历史 -->
      <van-grid column-num="2">
        <van-grid-item text="收藏">
          <template #icon>
            <van-icon name="star-o" color="#eb5253" />
          </template>
        </van-grid-item>
        <van-grid-item icon="clock-o" text="历史">
          <template #icon>
            <van-icon name="clock-o" color="#ff9d1d" />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知/小智同学 -->
      <div class="msg">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </div>
    <!-- header --登录 -->
    <div v-if="isLogin" class="login-box">
      <!-- 用户信息 -->
      <van-row class="first-floor">
        <van-col span="5">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
        </van-col>
        <van-col span="14" class="nick">{{ userInfo.name }}</van-col>
        <van-col span="5" class="btn-box">
          <router-link to="/user">
            <van-button round class="btn">编辑资料</van-button>
          </router-link>
        </van-col>
      </van-row>
      <!-- 宫格 -->
      <div class="grid">
        <div class="item">
          <span>0</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>0</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>0</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>0</span>
          <span>头条</span>
        </div>
      </div>
      <!-- 退出 -->
      <van-button @click="logout" v-if="isLogin" class="quitLogin"
        >退出</van-button
      >
    </div>
    <!-- header --未登录 -->
    <div v-else class="logout-box">
      <span class="img">
        <i class="toutiao toutiao-shouji1"></i>
      </span>
      <router-link to="/login">
        <span class="text">登录 / 注册</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
export default {
  name: 'Profile',
  data() {
    return {
      // 用户信息列表
      userInfo: []
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          title: '标题',
          message: '弹窗内容'
        })
        .then(() => {
          // 清空 token
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        // 登录状态发送请求
        if (this.isLogin) {
          const {
            data: { data }
          } = await getUserInfoAPI()
          this.userInfo = data
        }
      } catch (error) {
        this.$toast.fail('获取用户信息失败~')
      }
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  }
}
</script>

<style scoped lang="less">
// 登录盒子
:deep(.login-box) {
  // 用户信息
  .first-floor {
    width: 100%;
    position: absolute;
    top: 100px;
    .van-col {
      height: 1.76rem;
      line-height: 1.76rem;
      padding-left: 20px;
    }
    .btn-box {
      line-height: 1.5rem;
      .btn {
        width: 1.7rem;
        height: 0.5rem;
        font-size: 0.26667rem;
        padding: 0;
      }
    }
    .nick {
      font-size: 0.4rem;
      color: #fff;
    }
  }
  // 宫格
  .grid {
    position: absolute;
    top: 3.9rem;
    width: 100%;
    display: flex;
    align-items: center;
    .item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 0.29333rem;
        margin-bottom: 0.10667rem;
        color: #fff;
      }
    }
  }
  // 退出按钮
  .quitLogin {
    width: 100%;
    height: 1.2rem;
    color: red;
  }
}
// 公共部分
.public {
  // 背景图片
  .bgc {
    width: 100%;
    height: 400px;
    background: url('@/assets/images/banner.png');
  }

  // 消息通知/小智同学
  .msg {
    margin: 10px 0 10px 0;
  }
}
// 未登录
.logout-box {
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    width: 140px;
    height: 140px;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 140px;
    .toutiao-shouji1 {
      font-size: 1.1rem;
      color: #2589ff;
    }
  }

  .text {
    font-size: 0.37333rem;
    color: #fff;
    margin-top: 0.13333rem;
  }
}
</style>
