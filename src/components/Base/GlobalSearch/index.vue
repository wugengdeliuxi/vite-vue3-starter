<template>
  <div class="global-search">
    <div v-if="isTitle" class="title"><h4>查询条件</h4></div>
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
    isTitle: {
      type: Boolean,
      default: false
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
  margin: 16px 0;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
  font-size: 14px;
  color: #333;
  .title {
    border-bottom: 1px solid #dbeafa;
  }
  .content {
    padding: 24px 0;
  }
}
</style>
