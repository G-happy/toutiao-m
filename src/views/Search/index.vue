<template>
  <div>
    <!-- 搜索框 -->
    <form action="/" class="formBar">
      <van-search
        class="search"
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/搜索建议/搜索结果 -->
    <!-- component 动态渲染多个组件中的某个,is='' 指定渲染哪个组件 -->
    <component
      :is="componentsName"
      :keywords="keywords"
      class="main"
    ></component>
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
      isShowSearchRes: false,
      // 本地存储历史搜索记录
      arr: JSON.parse(localStorage.getItem('keywordsList')) || []
    }
  },
  created() {
    this.$bus.$on('res', (item) => {
      this.keywords = item
      this.isShowSearchRes = true
      this.tidySearchHistory(item)
    })
  },
  methods: {
    // 确认搜索
    onSearch() {
      if (this.keywords !== '') {
        this.isShowSearchRes = true
      }
      const item = this.keywords
      this.tidySearchHistory(item)
    },
    // 处理搜索历史记录,本地存储
    tidySearchHistory(item) {
      this.arr.unshift(item)
      // 去重
      this.arr = [...new Set(this.arr)]
      // 本地存储历史搜索记录
      localStorage.setItem('keywordsList', JSON.stringify(this.arr))
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
:deep(.formBar) {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
}
:deep(.main) {
  margin-top: 108px !important;

  .van-list {
    max-height: calc(100vh - 108px);
    overflow: auto;
  }
}

// 动画
</style>
