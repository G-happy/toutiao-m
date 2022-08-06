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
      ></UpdataAvator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import UpdataAvator from '@/views/User/components/UpdataAvator.vue'
import { resolveToBase64 } from '@/utils/index'
export default {
  name: 'User',
  components: { UpdataAvator },
  data() {
    return {
      userInfo: [],
      // 控制头像弹出层的展示
      isShowPhoto: false,
      showPicker: false,
      // 用户选中图片的路径
      picUrl: ''
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const {
          data: { data }
        } = await getUserInfoAPI()
        this.userInfo = data
        console.log(this.userInfo)
      } catch (error) {
        this.$toast.fail('用户信息获取失败~')
      }
    },
    // 选中头像时触发
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
    }
  },
  created() {
    this.getUserInfo()
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
