<template>
  <div class="updata-avator">
    <img :src="picUrl" alt="" ref="image" />
    <footer>
      <span>取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvatorAPI } from '@/api'
export default {
  data() {
    return {
      url: ''
    }
  },
  props: {
    picUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传头像
    uploadAvator() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传...',
          forbidClick: true
        })
        try {
          const {
            data: {
              data: { photo }
            }
          } = await uploadAvatorAPI(blob)
          this.$emit('upload-avator', photo)
          this.$parent.$parent.isShowPhoto = false
          this.$toast.success('图片上传成功~')
        } catch (error) {
          this.$toast.fail('图片上传失败~')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.updata-avator {
  height: 100%;
  img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 60%;
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    span {
      color: #fff;
      font-size: 40px;
    }
  }
}
</style>
