<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button size="small" @click="isEdit = !isEdit">{{ text }}</van-button>
    </van-cell>
    <!-- 我的频道 --网格区域 -->
    <van-grid gutter="0.2rem" class="myPindao">
      <van-grid-item
        v-for="(item, index) in channelsList"
        :key="item.id"
        :text="item.name"
        :class="[{ native: item.name === '推荐' }]"
        :icon="isEdit && item.name !== '推荐' ? 'close' : ''"
        @click="changeActive(index, item)"
      >
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" />
    <!-- 推荐频道 --网格区域 -->
    <van-grid gutter="0.2rem" direction="horizontal" column-num="3">
      <van-grid-item
        icon="plus"
        v-for="item in newChannelList"
        :key="item.id"
        :text="item.name"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { allChannelsAPI } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannelList: []
    }
  },
  props: {
    channelsList: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannelList()
  },
  methods: {
    editChannel() {},
    async getAllChannelList() {
      const {
        data: { data }
      } = await allChannelsAPI().catch((err) => err)
      this.allChannelList = data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') {
          return
        }
        this.$emit('del-channel', item.id)
        //
      } else {
        this.$emit('close')
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    text() {
      return this.isEdit ? '完成' : '编辑'
    },
    newChannelList() {
      // return this.allChannelList.filter(
      //   (fItem) => !this.channelsList.find((sItem) => fItem.id === sItem.id)
      // )
      let newArr = this.allChannelList
      this.channelsList.forEach((fItem) => {
        newArr = newArr.filter((sItem) => sItem.id !== fItem.id)
      })
      return newArr
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  margin-top: 1.333333rem;
  :deep(.van-button--default) {
    border: 0.02667rem solid #ebedf0;
    color: orange;
    height: 0.6rem;
    padding: 0 0.21333rem;
    font-size: 0.2rem;
    border-radius: 0.3rem;
    border: 1px solid orange;
  }
}
// 公共样式
:deep(.van-grid-item__content) {
  background-color: #eee;
}
:deep(.van-grid-item__icon) {
  font-size: 0.5rem;
  color: rgb(0, 255, 0);
}
// 我的频道
:deep(.myPindao) {
  position: relative;
  .van-grid-item {
    height: 100px;
  }
  .van-grid-item__icon {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(30%, -30%);
    color: red;
  }
  .van-grid-item__icon + .van-grid-item__text {
    margin-top: 0;
  }
}
:deep(.native) {
  .van-grid-item__text {
    color: #ed225d;
  }
}
</style>
