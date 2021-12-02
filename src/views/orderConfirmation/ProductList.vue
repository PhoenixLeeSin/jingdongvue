<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <div
          v-for="item in productList"
          :key="item._id"
          class="products__list__item"
        >
          <img :src="item.imgUrl" class="products__list__item__image" />
          <div class="products__list__item__info">
            <div class="products__list__item__info__title">
              {{ item.name }}
            </div>
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
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.products {
  margin: 0.16rem 0.18rem 0 0.18rem;
  padding: 0.16rem 0.16rem 0 0.16rem;
  background-color: $bgColor;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontColor;
  }
  &__wrapper {
    position: absolute;
    top: 2.5rem;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0.55rem;
    overflow-y: scroll;
  }
  &__list {
    &__item {
      box-sizing: border-box;
      padding: 0.16rem 0.16rem 0.1rem 0.16rem;
      display: flex;
      position: relative;
      line-height: 0.72rem;
      height: 0.72rem;
      background-color: $bgColor;
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
          color: $content-fontColor;
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
            color: $hightlight-fontColor;
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
            color: $dark-fontColor;
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
</style>
