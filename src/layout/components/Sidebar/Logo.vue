<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <!-- sidebar收起状态下 -->
      <router-link v-if="collapse" key="collapse" to="/" class="sidebar-logo-link">
        <svg-icon name="logo" class="sidebar-logo"></svg-icon>
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
      <router-link v-else key="expand" to="/" class="sidebar-logo-link">
        <svg-icon name="logo"></svg-icon>
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'Logo',
  components: { SvgIcon },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {
      title: '案件接入子系统'
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    display: flex;
    height: 100%;
    width: 100%;
    line-height: 50px;
    .icon {
      width: 1.8em;
      height: 1.8em;
      font-size: 18px;
      vertical-align: middle;
      margin-left: -34px;
    }
    .icon-collapse {
      margin-left: 10px;
    }
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    .svg-icon {
      width: 20px;
      height: 20px;
      line-height: 50px;
      vertical-align: middle;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #000;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
