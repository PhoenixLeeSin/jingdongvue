<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleBackClick">
        &#xe6db;
      </div>
      <div class="top__header__title">确认订单</div>
    </div>
    <div class="top__address">
      <div class="top__address__title">收货地址</div>
      <div class="top__address__detail">北京理工大学国防科技园2号楼10层</div>
      <div class="top__address__contact">
        <span class="top__address__contact__name">瑶妹（先生）</span>
        <span class="top__address__contact__name">18911024266</span>
      </div>
      <div class="top__address__arrow iconfont">&#xe665;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
const useHandleBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'TopArea',
  setup() {
    const { handleBackClick } = useHandleBackEffect()
    return { handleBackClick }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.top {
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    padding-top: 0.11rem;
    display: flex;
    &__back {
      display: inline-block;
      width: 0.15rem;
      height: 0.21rem;
      color: $bgColor;
      font-size: 0.2rem;
      margin-left: 0.19rem;
    }
    &__title {
      flex: 1;
      display: inline-block;
      font-size: 0.16rem;
      color: $bgColor;
      text-align: center;
      margin-right: 0.19rem;
    }
  }
  &__address {
    position: relative;
    box-sizing: border-box;
    height: 1.11rem;
    padding: 0.16rem 0.16rem 0 0.16rem;
    background-color: $bgColor;
    border-radius: 4px;
    margin: 0.22rem 0.18rem 0 0.18rem;
    &__title {
      font-size: 0.16rem;
      color: $content-fontColor;
    }
    &__detail {
      font-size: 0.14rem;
      color: $content-fontColor;
      margin: 0.14rem 0 0.06rem 0;
    }
    &__contact {
      &__name {
        font-size: 0.12rem;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
    }
    &__arrow {
      position: absolute;
      right: 0.16rem;
      top: 50%;
      transform: translateY(-50%);
      // transform: translateY(-50%) rotate(180deg); 图标旋转180度
      color: $medium-fontColor;
      font-size: 0.16rem;
    }
  }
}
</style>
