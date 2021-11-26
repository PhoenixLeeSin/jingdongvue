<template>
  <div class="wrapper">
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
    <div class="products">
      <div class="products__title">{{ shopName }}</div>
      <div class="products__list">
        <div
          class="products__list__item"
          v-for="item in productList"
          :key="item._id"
        >
          <img :src="item.imgUrl" class="products__list__item__image" />
          <div class="products__list__item__info">
            <div class="products__list__item__info__title">{{ item.name }}</div>
            <div class="products__list__item__info__price">
              <div class="products__list__item__info__price__unit">
                <span class="products__list__item__info__price__unit__red">
                  &yen;
                </span>
                {{ item.price }} x {{ item.count }}
              </div>
              <div class="products__list__item__info__price__total">
                <span class="products__list__item__info__price__total__black">
                  &yen;
                </span>
                {{ (item.price * item.count).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price">
        实付金额
        <span class="order__price__number">¥{{ calculations.price }}</span>
      </div>
      <div class="order__submit">提交订单</div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

const useHandleBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'OrderConfirmation',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { handleBackClick } = useHandleBackEffect()
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)

    return { productList, shopName, calculations, handleBackClick }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';

.wrapper {
  position: absolute;
  background-color: #eee;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}

.top {
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    padding-top: 0.26rem;
    display: flex;
    &__back {
      display: inline-block;
      width: 0.15rem;
      height: 0.21rem;
      color: #fff;
      font-size: 0.2rem;
      margin-left: 0.19rem;
    }
    &__title {
      flex: 1;
      display: inline-block;
      font-size: 0.16rem;
      color: #fff;
      text-align: center;
      margin-right: 0.19rem;
    }
  }
  &__address {
    position: relative;
    box-sizing: border-box;
    height: 1.11rem;
    padding: 0.16rem 0.16rem;
    background-color: #fff;
    border-radius: 4px;
    margin: 0.22rem 0.18rem 0 0.18rem;
    &__title {
      font-size: 0.16rem;
      color: #333;
    }
    &__detail {
      font-size: 0.14rem;
      color: #333;
      margin: 0.14rem 0 0.06rem 0;
    }
    &__contact {
      &__name {
        font-size: 0.12rem;
        color: #666;
        margin-right: 0.05rem;
      }
    }
    &__arrow {
      position: absolute;
      right: 0.16rem;
      top: 50%;
      transform: translateY(-50%);
      // transform: translateY(-50%) rotate(180deg); 图标旋转180度
      color: #666;
      font-size: 0.16rem;
    }
  }
}
.products {
  // margin: 0.16rem 0.18rem 0.25rem;
  // padding: 0.16rem;
  background-color: #fff;
  // border-radius: 4px;
  // position: relative;
  position: absolute;
  top: 2rem;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0.55rem;
  border-radius: 4px;
  &__title {
    // position: absolute;
    // top: 0.16rem;
    // left: 0.16rem;
    margin-left: 0.16rem;
    margin-top: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: #333;
  }
  &__list {
    position: absolute;
    top: 0.38rem;
    left: 0;
    right: 0;
    bottom: 0rem;
    background-color: #0091ff;
    overflow-y: scroll;
    border-radius: 4px;
    &__item {
      box-sizing: border-box;
      padding: 0.16rem 0.16rem 0 0.16rem;
      display: flex;
      position: relative;
      height: 0.62rem;
      background-color: #fff;
      &__image {
        width: 0.46rem;
        height: 0.46rem;
      }
      &__info {
        margin-left: 0.16rem;
        flex: 1;
        line-height: 0.46rem;
        &__title {
          font-size: 0.14rem;
          color: #333;
          line-height: 0.2rem;
          @include ellipsis;
        }
        &__price {
          display: flex;
          justify-content: space-between;
          margin-top: 0.06rem;
          &__unit {
            display: inline-block;
            font-size: 0.14rem;
            color: #e93b3b;
            line-height: 0.2rem;
            height: 0.2rem;
            &__red {
              font-size: 0.12rem;
              line-height: 0.2rem;
            }
          }
          &__total {
            display: inline-block;
            font-size: 0.14rem;
            color: #000;
            line-height: 0.2rem;
            height: 0.2rem;
            text-align: right;
            &__black {
              font-size: 0.12rem;
            }
          }
        }
      }
    }
  }
}
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  border-top: 1px solid #e1e1e1;
  display: flex;
  background-color: #fff;
  &__price {
    font-size: 0.14rem;
    color: #333;
    line-height: 0.49rem;
    padding-left: 0.24rem;
    flex: 1;
    &__number {
      font-size: 0.16rem;
      line-height: 0.22rem;
    }
  }
  &__submit {
    line-height: 0.49rem;
    width: 0.98rem;
    background-color: #4fb0f9;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
  }
}
</style>
