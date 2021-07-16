<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-icon"></div>
      <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <div class="admin-logo">
          <h1 class="name">案件接入平台</h1>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon name="user"></svg-icon>
          </span>
          <el-input
            ref="usernameRef"
            placeholder="请输入用户名"
            v-model="loginForm.username"
            autocomplete="off"
            tabindex="1"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon name="password"></svg-icon>
          </span>
          <el-input
            ref="passwordRef"
            :class="{
              'no-autofill-pwd': passwordType === 'password'
            }"
            placeholder="请输入密码"
            v-model="loginForm.password"
            type="text"
            autocomplete="off"
            tabindex="2"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 35px"
          :loading="loading"
          @click="handleLogin"
          >登 录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ElForm } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import useRouteQuery from './hooks/useRouteQuery'

type IElFormInstance = InstanceType<typeof ElForm>
export default defineComponent({
  name: 'Login',
  components: { SvgIcon },
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false) // 登录加载状态
    // form ref
    const loginFormRef = ref<IElFormInstance | null>(null)
    // form username ref
    const usernameRef = ref<HTMLInputElement | null>(null)
    // form password ref
    const passwordRef = ref<HTMLInputElement | null>(null)

    const loginState = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名！'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码！'
          },
          { min: 6, message: '请输入最少6位的密码' }
        ]
      },
      passwordType: 'password'
    })

    // 显示密码
    const showPwd = () => {
      loginState.passwordType = loginState.passwordType === 'password' ? 'text' : 'password'
    }

    // 重定向router query处理
    const { redirect, otherQuery } = useRouteQuery()
    // 登录
    const handleLogin = () => {
      ;(loginFormRef.value as IElFormInstance).validate((valid) => {
        if (valid) {
          console.log(2222)
          console.log(store)
          loading.value = true
          store
            .dispatch('user/login', loginState.loginForm)
            .then(() => {
              // 登录成功后跳转之前被访问页或首页
              router.push({
                path: redirect.value || '/',
                query: otherQuery.value
              })
            })
            .finally(() => {
              loading.value = false
            })
        } else {
          console.log('error submit!!')
        }
      })
    }

    // 自动获取焦点
    onMounted(() => {
      if (loginState.loginForm.username === '') {
        ;(usernameRef.value as HTMLInputElement).focus()
      } else if (loginState.loginForm.password === '') {
        ;(passwordRef.value as HTMLInputElement).focus()
      }
    })

    return {
      loading,
      loginFormRef,
      handleLogin,
      showPwd,
      usernameRef,
      passwordRef,
      ...toRefs(loginState)
    }
  }
})
</script>

<style lang="scss">
.login-container {
  .el-form-item {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    margin-bottom: 28px;
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 40px;
      }
    }
  }
  .no-autofill-pwd {
    // 解决自动填充问题
    .el-input__inner {
      // 模仿密码框原点
      -webkit-text-security: disc !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  .login-content {
    display: flex;
    background: #fff;
    width: 900px;
    min-width: 900px;
    max-width: 100%;
    padding: 40px;
    .login-icon {
      background-image: url('@/assets/login.png');
      background-repeat: no-repeat;
      background-size: contain;
      flex: 1;
      border-right: 1px solid #dce9ff;
    }
    .login-form {
      flex: 1;
      position: relative;
      padding: 40px 0 0 40px;
      overflow: hidden;
      box-sizing: border-box;
      .svg-container {
        padding: 0 10px;
      }
      .show-pwd {
        font-size: 16px;
        cursor: pointer;
        margin-left: 7px;
      }
      .admin-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .name {
          color: blue;
          font-weight: bold;
          font-size: 22px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
