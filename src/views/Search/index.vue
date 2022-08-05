<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$toast.fail('已取消')"
        @focus="onFocus"
      />
    </form>
    <!-- 搜索历史/搜索建议/搜索结果 -->
    <!-- component 动态渲染多个组件中的某个,is='' 指定渲染哪个组件 -->
    <component :is="componentsName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowSearchRes: false
    }
  },
  methods: {
    // 确认搜索
    onSearch() {
      if (this.keywords !== '') {
        this.isShowSearchRes = true
      }
    },
    // 输入框聚焦
    async onFocus() {
      // 聚焦时,只能选择渲染1 / 3 组件
      this.isShowSearchRes = false
    }
  },
  components: { SearchHistory, SearchSuggestion, SearchResult },
  computed: {
    componentsName() {
      if (this.keywords === '') {
        // 1.搜索框内容为空
        return 'SearchHistory'
      }
      if (this.isShowSearchRes) {
        // 2.确认搜索
        return 'SearchResult'
      }
      //   3
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
:deep(.search) {
  [role='button'] {
    color: #fff;
  }
}
</style>
