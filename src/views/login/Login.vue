<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__image"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名/手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__register-link" @click="handleRegisterClick">
      立即注册
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage"></Toast>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
  })
  const { username, password } = toRefs(data)

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: username.value,
        password: password.value,
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (error) {
      showToast('请求失败')
    }
  }

  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }

  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    return {
      handleLogin,
      handleRegisterClick,
      show,
      toastMessage,
      username,
      password,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__image {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    box-sizing: border-box;
    margin: 0 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    &__content {
      box-sizing: border-box;
      width: 100%;
      line-height: 0.48rem;
      border: none;
      outline: none;
      background: none;
      padding: 0 0.16rem;
      font-size: 0.16rem;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__login-button {
    margin: 0.16rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    text-align: center;
    color: $bgColor;
    font-size: 0.16rem;
  }
  &__register-link {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
}
</style>
