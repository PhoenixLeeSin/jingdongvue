<template>
  <div class="content">
    <div class="content__category">
      <div
        :class="{
          content__category__item: true,
          'content__category--active': currentTab === item.tab,
        }"
        v-for="item in categories"
        :key="item.tab"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content__product">
      <div
        class="content__product__item"
        v-for="(item, index) in list"
        :key="item._id"
      >
        <img :src="item.imgUrl" alt="" class="content__product__item__image" />
        <div class="content__product__item__detail">
          <h4 class="content__product__item__detail__title">{{ item.name }}</h4>
          <p class="content__product__item__detail__sales">
            月售{{ item.sales }}件
          </p>
          <p class="content__product__item__detail__price">
            <span class="content__product__item__detail__price__yen">
              &yen;
            </span>
            {{ item.price }}
            <span class="content__product__item__detail__price__origin">
              &yen;{{ item.oldPrice }}
            </span>
          </p>
        </div>
        <div class="content__product__item__number">
          <span
            class="content__product__item__number__minus iconfont"
            @click="
              () => {
                changeCartItem(shopId, item._id, item, -1, shopName)
              }
            "
          >
            &#xe66d;
          </span>
          {{ getProductCartCount(shopId, item._id) }}
          <span
            class="iconfont content__product__item__number__plus"
            @click="
              () => {
                changeCartItem(shopId, item._id, item, 1, shopName)
              }
            "
          >
            &#xe781;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'

const categories = [
  {
    name: '全部商品',
    tab: 'all',
  },
  {
    name: '秒杀',
    tab: 'seckill',
  },
  {
    name: '新鲜水果',
    tab: 'fruit',
  },
]

// Tab 切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab,
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => {
    getContentData()
  })
  const { list } = toRefs(content)
  return { list }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }

  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }

  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }

  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { changeCartItem, cartList, getProductCartCount } = useCartEffect()

    return {
      categories,
      currentTab,
      handleTabClick,
      list,
      shopId,
      changeCartItem,
      cartList,
      getProductCartCount,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  &__category {
    width: 0.76rem;
    height: 100%;
    overflow-y: scroll;
    background: $search-bgColor;
    &__item {
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.14rem;
      color: $content-fontColor;
    }
    &--active {
      background: $bgColor;
    }
  }
  &__product {
    flex: 1;
    overflow-y: scroll;
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 1px solid $search-bgColor;
      &__image {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }
      &__detail {
        overflow: hidden;
        &__title {
          margin: 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: $content-fontColor;
          @include ellipsis;
        }
        &__sales {
          line-height: 0.16rem;
          font-size: 0.12rem;
          color: $content-fontColor;
          margin: 0.06rem 0;
        }
        &__price {
          margin: 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: $hightlight-fontColor;
          &__yen {
            font-size: 0.12rem;
          }
          &__origin {
            // display: inline-block;
            margin-left: 0.06rem;
            position: relative;
            font-size: 0.12rem;
            transform: scale(0.5, 0.5);
            transform-origin: center center;
            color: $light-fontColor;
            line-height: 0.2rem;
            text-decoration: line-through;
          }
        }
      }
      &__number {
        position: absolute;
        bottom: 0.12rem;
        right: 0;
        font-size: 0.14rem;
        &__minus {
          font-size: 0.18rem;
          color: $medium-fontColor;
          margin-right: 0.1rem;
        }
        &__plus {
          color: $btn-bgColor;
          margin-left: 0.1rem;
          font-size: 0.18rem;
        }
      }
    }
  }
}
</style>
