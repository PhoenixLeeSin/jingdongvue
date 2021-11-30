<template>
  <div class="order">
    <div class="order__price">
      实付金额
      <span class="order__price__number">¥{{ calculations.price }}</span>
    </div>
    <div class="order__submit" @click="handleSubmitClick">提交订单</div>
  </div>
  <div class="mask" v-show="show" @click="cancelOrderClick">
    <div class="mask__content">
      <div class="mask__content__title">确认要离开收银台？</div>
      <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btns">
        <div
          class="mask__content__btns__left"
          @click="() => confirmOrderClick(false)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btns__right"
          @click="() => confirmOrderClick(true)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { post } from '../../utils/request'
const useSubmitEffect = (shopId, shopName, productList) => {
  const show = ref(false)
  const store = useStore()
  const router = useRouter()

  const handleSubmitClick = () => {
    show.value = !show.value
  }

  const confirmOrderClick = async (confirm) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    console.log(products)
    try {
      const result = await post('/api/order', {
        addressId: '1',
        shopId: parseInt(shopId, 10),
        shopName: shopName.value,
        idCanceled: confirm,
        products: products,
      })
      if (result?.errno === 0) {
        console.log(result)
        show.value = false
        store.commit('clearCartData', { shopId })
        router.push({ name: 'Home' })
      }
    } catch (e) {}
  }

  return { show, handleSubmitClick, confirmOrderClick }
}

export default {
  name: 'Order',
  setup() {
    const route = useRoute()

    const shopId = route.params.id
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { show, handleSubmitClick, confirmOrderClick } = useSubmitEffect(
      shopId,
      shopName,
      productList
    )
    return {
      calculations,
      shopName,
      productList,
      show,
      handleSubmitClick,
      confirmOrderClick,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  border-top: 1px solid #e1e1e1;
  display: flex;
  background-color: $bgColor;
  &__price {
    font-size: 0.14rem;
    color: $content-fontColor;
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
    color: $bgColor;
    font-size: 0.14rem;
    text-align: center;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  &__content {
    position: absolute;
    width: 80%;
    top: 50%;
    transform: translateY(-50%);
    margin: auto 0.37rem auto 0.37rem;
    padding: 0.24rem 0;
    background: #ffffff;
    border-radius: 4px;
    z-index: 2;
    &__title {
      font-size: 0.18rem;
      color: $content-fontColor;
      line-height: 0.25rem;
      text-align: center;
    }
    &__desc {
      font-size: 0.14rem;
      color: $medium-fontColor;
      line-height: 0.2rem;
      text-align: center;
      margin: 0.08rem 0 0.24rem 0;
    }
    &__btns {
      display: flex;
      justify-content: space-between;
      padding: 0 0.59rem;
      &__left {
        display: inline-block;
        border: 1px solid #4fb0f9;
        border-radius: 0.16rem;
        width: 0.8rem;
        line-height: 0.32rem;
        color: #4fb0f9;
        font-size: 0.14rem;
        margin-right: 0.24rem;
        text-align: center;
      }
      &__right {
        display: inline-block;
        background: #4fb0f9;
        border: 1px solid #4fb0f9;
        border-radius: 0.16rem;
        font-size: 0.14rem;
        color: #ffffff;
        width: 0.8rem;
        line-height: 0.32rem;
        text-align: center;
      }
    }
  }
}
</style>
