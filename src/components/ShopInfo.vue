<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" class="shop__img" />
    <div
      :class="{
        shop__content: true,
        'shop__content--bordered': hideBorder ? false : true,
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tags__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tags__tag">
          起送: ¥{{ item.expressLimit }}
        </span>
        <span class="shop__content__tags__tag">
          基础运费: ¥{{ item.expressPrice }}
        </span>
      </div>
      <p class="shop__content__highlight">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder'],
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';
.shop {
  display: flex;
  padding: 0rem 0 0.12rem 0;
  &__img {
    height: 0.56rem;
    width: 0.56rem;
  }
  &__content {
    flex: 1;
    margin-left: 0.16rem;
    &--bordered {
      border-bottom: 1px solid $content-bgColor;
    }
    &__title {
      font-size: 0.16rem;
      color: $content-fontColor;
      margin-bottom: 0.08rem;
    }
    &__tags {
      margin-bottom: 0.08rem;
      &__tag {
        font-size: 0.13rem;
        margin-right: 0.16rem;
        color: $content-fontColor;
      }
    }
    &__highlight {
      font-size: 0.13rem;
      color: $hightlight-fontColor;
    }
  }
}
</style>
