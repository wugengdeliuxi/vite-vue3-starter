<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: 'ScrollPanel'
}
</script>

<style lang="scss">
.scroll-wrapper {
  position: relative;
  width: 100%;
  white-space: nowrap;
}
</style>
