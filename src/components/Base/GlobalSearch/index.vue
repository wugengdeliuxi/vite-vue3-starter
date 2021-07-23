<template>
  <div class="global-search">
    <div v-if="title" class="title">{{ title }}</div>
    <div class="content">
      <slot name="operate" />
      <template v-for="(item, index) in searchData">
        <el-button v-if="item.type == 'button'" :icon="item.icon" :size="item.size" :key="index">
          {{ item.title }}
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearch',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    searchData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    search() {}
  }
}
</script>

<style lang="scss">
.global-search {
  background: #fff;
  padding: 0 16px;
  margin: 16px 0 0 0;
  // box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
  font-size: 14px;
  color: #333;
  .title {
    color: #323233;
    font-size: 14px;
    padding: 20px 0 16px 0;
    font-weight: 600;
    // border-bottom: 1px solid #dbeafa;
  }
  .content {
    background: #f7f8fa;
    padding: 24px 0;
  }
}
</style>
