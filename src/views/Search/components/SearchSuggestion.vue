<template>
  <div>
    <van-cell icon="search" v-for="(item, index) in highLightSugg" :key="index">
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestAPI } from '@/api'
// 下载 lodash 按需导入 debounce
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggentList: [],
      timer: null
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  // 监听 keywords 变化,发送搜搜建议请求
  watch: {
    keywords: {
      // 立即监听(解决输入一个字符时,不发送请求的问题)
      immediate: true,
      handler() {
        this.getSearchSuggestList()
      }
    }
  },
  methods: {
    // 获取搜索建议列表
    // 对发送请求进行防抖处理
    getSearchSuggestList: debounce(async function () {
      try {
        const {
          data: {
            data: { options }
          }
        } = await getSearchSuggestAPI(this.keywords)
        // 搜索结果为空时,过滤掉数据中的null值
        this.suggentList = options.filter((item) => Boolean(item))
      } catch (error) {
        this.$toast.fail('获取搜索建议失败~')
      }
    }, 500)
  },
  computed: {
    highLightSugg() {
      // 不区分大小写全局匹配 keywords
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggentList.map((item) =>
        item.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
