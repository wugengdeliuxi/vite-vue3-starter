<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper">
      <img :src="avatar" class="user-avatar" @error="loadError" />
      <i class="el-icon-caret-bottom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="username">
          <span style="display: block" :style="{ fontWeight: 500 }">用户名：{{ username }}</span>
        </el-dropdown-item>
        <!-- <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item> <i class="el-icon-setting" />设置</el-dropdown-item>
        </router-link> -->
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import defaultAvatar from '@/assets/avatar.jpg'
import { defineComponent, getCurrentInstance, computed, ref } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const { proxy } = getCurrentInstance()!
    const logout = () => {
      store.dispatch('user/logout').then(() => {
        ;(proxy as any).$message.success('退出登录')
        window.location.reload()
      })
    }

    const userAvatar = ref('')
    const userInfo = computed(() => store.state.user.userInfo)
    const avatar = computed(() => userAvatar.value || userInfo.value?.avatar || defaultAvatar)
    const username = computed(() => userInfo.value?.username || '')

    // onMounted(() => {
    //   // 获取用户信息
    //   store.dispatch('user/getUserInfo')
    // })

    // 头像加载失败处理函数
    const loadError = () => {
      console.error('头像加载失败')
      userAvatar.value = defaultAvatar
    }

    return {
      loadError,
      logout,
      avatar,
      username
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;
  .avatar-wrapper {
    margin-top: 5px;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
