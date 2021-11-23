<template>
  <div class="wrapper">
    <div class="wrapper__search">
      <div class="wrapper__search__back iconfont" @click="handleBackClick">
        &#xe6db;
      </div>
      <div class="wrapper__search__content">
        <span class="wrapper__search__content__icon iconfont">&#xe7b3;</span>
        <input
          class="wrapper__search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"></ShopInfo>
    <Content :shopName="item.name"></Content>
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

const useGetItemDataEffect = () => {
  const route = useRoute()
  const data = reactive({
    item: {},
  })

  const { item } = toRefs(data)
  const getItemData = async () => {
    const result = await get(`api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      //       {
      //     "_id": "1",
      //     "name": "沃尔玛",
      //     "imgUrl": "http://www.dell-lee.com/imgs/vue3/near.png",
      //     "sales": 10000,
      //     "expressLimit": 0,
      //     "expressPrice": 5,
      //     "slogan": "VIP尊享满89元减4元运费券"
      // }
      data.item = result.data
    }
  }
  return { item, getItemData }
}

const useHandleBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },

  setup() {
    const { item, getItemData } = useGetItemDataEffect()
    const { handleBackClick } = useHandleBackEffect()

    getItemData()

    return { item, getItemData, handleBackClick }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.wrapper {
  padding: 0 0.18rem;
  &__search {
    display: flex;
    box-sizing: border-box;
    line-height: 0.32rem;
    margin: 0.16rem 0.18rem 0.16rem 0;
    &__back {
      width: 0.12rem;
      height: 0.21rem;
      margin-right: 0.16rem;
      color: #b6b6b6;
      font-size: 0.26rem;
    }
    &__content {
      display: flex;
      box-sizing: border-box;
      background: $search-bgColor;
      border-radius: 0.16rem;
      line-height: 0.32rem;
      width: 100%;
      &__input {
        display: block;
        width: 100%;
        margin-left: 0.16rem;
        margin-right: 0.16rem;
        border: none;
        background: none;
        outline: none;
        color: #333;
        font-size: 0.14rem;
      }
      &__icon {
        color: $search-fontColor;
        font-size: 0.2rem;
        margin-left: 0.16rem;
      }
    }
  }
}
</style>
