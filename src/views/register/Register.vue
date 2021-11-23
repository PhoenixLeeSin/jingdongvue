<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__image"
    />
    <div class="wrapper__content">
      <input
        class="wrapper__content__input"
        type="text"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__content">
      <input
        class="wrapper__content__input"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__content">
      <input
        class="wrapper__content__input"
        type="password"
        placeholder="确认密码"
        v-model="confirmPassword"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__content-login" @click="handleLogin">
      已有账户去登陆
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage"></Toast>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', confirmPassword: '' })
  const { username, password, confirmPassword } = toRefs(data)

  const handleRegister = async () => {
    try {
      if (password.value !== confirmPassword.value) {
        showToast('两次密码不一致')
        return
      }
      const result = await post('1/api/user/register', {
        username: username.value,
        password: password.value,
      })
      if (result.errno === 0) {
        router.push({ name: 'Home' })
      } else {
        showToast('注册失败')
      }
    } catch (error) {
      showToast('请求失败')
    }
  }

  return { username, password, confirmPassword, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push({ name: 'Login' })
  }

  return { handleLogin }
}

export default {
  name: 'Register',
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, confirmPassword, handleRegister } =
      useRegisterEffect(showToast)
    const { handleLogin } = useLoginEffect()

    return {
      handleLogin,
      handleRegister,
      username,
      password,
      confirmPassword,
      show,
      toastMessage,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  &__image {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__content {
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    font-size: 0.16rem;
    color: $content-notice-fontColor;
    line-height: 0.48rem;
    &__input {
      box-sizing: border-box;
      width: 100%;
      line-height: 0.48rem;
      outline: none;
      background: none;
      border: none;
      padding: 0 0.16rem;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__register-button {
    margin: 0.16rem 0.4rem 0.16rem 0.4rem;
    background: #0091ff;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    font-size: 0.16rem;
    color: #fff;
    text-align: center;
    line-height: 0.48rem;
  }
  &__content-login {
    text-align: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 400;
  }
}
</style>
