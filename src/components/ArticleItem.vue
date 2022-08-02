<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="label"
    >
      <template #default>
        <van-image
          width="100"
          height="100"
          :src="articleInfo.cover.images[0]"
        />
      </template>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="label"
    >
      <template #default>
        <van-image
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          width="40"
          height="40"
          :src="item"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  data() {
    return {}
  },
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
