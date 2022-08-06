<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <template #default>
        <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
        <!-- hidden,accept : 隐藏,文件类型 -->
        <!-- 用户选择了图片时触发 change 事件 -->
        <input
          type="file"
          hidden
          accept=".png,.jpg"
          ref="file"
          @change="selectPhoto"
        />
      </template>
    </van-cell>
    <!-- 头像的弹层 -->
    <van-popup
      class="userPhoto-popup"
      v-model="isShowPhoto"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 弹出层内容组件 -->
      <UpdataAvator
        :picUrl="picUrl"
        @upload-avator="userInfo.photo = $event"
        v-if="isShowPhoto"
      ></UpdataAvator>
    </van-popup>
    <!-- 昵称 -->
    <van-cell is-link title="昵称" @click="isShowNick = true">
      <template #default>
        <span>{{ userInfo.name }}</span>
      </template>
    </van-cell>
    <!-- 昵称的弹层 -->
    <van-popup
      v-model="isShowNick"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 弹出层内部表单组件 -->
      <UpdataNick :name="userInfo.name" :userObj="userObj"></UpdataNick>
    </van-popup>
    <!-- 性别 -->
    <van-cell is-link title="性别" @click="isShowGender = true">
      <template #default>
        <span>{{ gender }}</span>
      </template>
    </van-cell>
    <!-- 性别的弹层 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        show-toolbar
        title="更新性别"
        :columns="genderList"
        @cancel="isShowGender = false"
        @confirm="onConfirmGender"
      />
    </van-popup>
    <!-- 生日 -->
    <van-cell is-link title="生日" @click="isShowBirthday = true">
      <template #default>
        <span>{{ userInfo.birthday }}</span>
      </template>
    </van-cell>
    <!-- 生日的弹层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="datePackage.currentDate"
        type="date"
        title="选择年月日"
        :min-date="datePackage.minDate"
        :max-date="datePackage.maxDate"
        @cancel="isShowBirthday = false"
        @confirm="onConfirmBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI, editUserInfoAPI } from '@/api'
import UpdataAvator from '@/views/User/components/UpdataAvator.vue'
import UpdataNick from '@/views/User/components/UpdataNick.vue'
import { resolveToBase64 } from '@/utils/index'
import dayjs from 'dayjs'
export default {
  name: 'User',
  components: { UpdataAvator, UpdataNick },
  data() {
    return {
      // 获取的用户信息
      userInfo: {},
      // 控制头像弹出层的展示
      isShowPhoto: false,
      // 用户选中图片的路径
      picUrl: '',
      // 控制昵称弹层的出现
      isShowNick: false,
      // 控制修改性别的弹层
      isShowGender: false,
      // 展示生日的弹层
      isShowBirthday: false,
      // 时间选择配置
      datePackage: {
        minDate: new Date(1990, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(1999, 10, 12)
      },
      // 修改后的用户信息
      userObj: {},
      // 性别列表
      genderList: ['男', '女']
    }
  },
  methods: {
    // 头像 --获取用户信息
    async getUserInfo() {
      try {
        const {
          data: { data }
        } = await getUserInfoAPI()
        this.userInfo = data
        console.log('userInfo: ', this.userInfo)
      } catch (error) {
        this.$toast.fail('用户信息获取失败~')
      }
    },
    // 头像 --选中头像时触发
    async selectPhoto(e) {
      // 触发事件的元素(e.target/input)中有一个伪数组(files)
      // (files)里面包含着用户选中的文件对象
      const file = e.target.files[0]

      // window.URL.createObjectURL(file对象)
      // 可以将file文件对象转化为 img 标签可识别的路径
      // const url = window.URL.createObjectURL(file)
      const url = await resolveToBase64(file)
      // 保存路径
      this.picUrl = url

      e.target.value = ''

      // 展示弹出层
      this.isShowPhoto = true
    },
    // 昵称 --

    // 性别 --确认按钮
    async onConfirmGender(value) {
      // 转换
      const newGender = value === '男' ? 0 : 1
      // 发送的数据
      this.userObj.gender = newGender
      // 发送请求
      await editUserInfoAPI(this.userObj)
      this.getUserInfo()
      this.isShowGender = false
    },
    // 生日 --确认按钮
    async onConfirmBirthday(value) {
      // 格式化时间
      const time = dayjs(value).format('YYYY-MM-DD')
      this.userObj.birthday = time
      await editUserInfoAPI(this.userObj)
      this.getUserInfo()
      this.isShowBirthday = false
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    gender() {
      return this.userInfo.gender === 0 ? '男' : '女'
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
// 头像区域
:deep(.userPhoto-popup) {
  background-color: #000;
}
</style>
