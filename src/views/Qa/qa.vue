<template>
  <div>
    <button @click="ss">点击</button>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  methods: {
    ss() {
      ImagePreview(['https://img01.yzcdn.cn/vant/apple-1.jpg'])
    }
  }
}
</script>

<style></style>
