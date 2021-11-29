<template>
  <div class="order">
    <div class="order__price">
      实付金额
      <span class="order__price__number">¥{{ calculations.price }}</span>
    </div>
    <div class="order__submit">提交订单</div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { calculations } = useCommonCartEffect(shopId)
    return { calculations }
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
</style>
