<template>
  <div class="wrapper">
    <div class="header">我的订单</div>
    <div class="list__item" v-for="item in list" :key="item.shopId">
      <div class="list__item__top">
        <span class="list__item__top__title">{{ item.shopName }}</span>
        <span class="list__item__top__status">
          {{ item.isCanceled ? '已取消' : '已下单' }}
        </span>
      </div>
      <div class="list__item__products">
        <div class="list__item__products__images">
          <img
            :src="element.product.img"
            class="list__item__products__image"
            v-for="(element, index) in item.products"
            :key="index"
          />
        </div>

        <div class="list__item__products__info">
          <div class="list__item__products__info__price">
            ¥{{ item.totalPrice }}
          </div>
          <div class="list__item__products__info__count">
            共{{ item.totalNumber }}件
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('api/order')
    if (result?.errno === 0 && result?.data?.length) {
      console.log(result.data)
      const orderList = result.data
      orderList.forEach((item) => {
        let totalPrice = 0
        let totalNumber = 0
        item.products.forEach((product) => {
          totalNumber += product.orderSales
          totalPrice += product?.product?.price * product?.orderSales
        })
        item.totalPrice = totalPrice.toFixed(2)
        item.totalNumber = totalNumber
      })
      data.list = orderList
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: {
    Docker,
  },
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.5rem;
  background: #f7f7f7;
  .header {
    line-height: 0.44rem;
    background: $bgColor;
    font-size: 0.16rem;
    color: $content-fontColor;
    text-align: center;
    padding-top: 0.2rem;
  }
  .list__item {
    box-sizing: border-box;
    height: 1.1rem;
    margin: 0.16rem 0.18rem 0 0.18rem;
    padding: 0.16rem;
    background: $bgColor;
    border-radius: 4px;
    &__top {
      line-height: 0.22rem;
      display: flex;
      justify-content: space-between;
      &__title {
        font-size: 0.16rem;
        color: $content-fontColor;
      }
      &__status {
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $light-fontColor;
      }
    }
    &__products {
      display: flex;
      justify-content: space-between;
      padding-top: 0.16rem;
      flex-wrap: nowrap;
      height: 0.4rem;
      &__images {
        line-height: 0.4rem;
        margin-right: 0.16rem;
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        .list__item__products__image {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.12rem;
          flex-shrink: 0;
        }
      }
      &__info {
        font-size: 0.14rem;
        color: $hightlight-fontColor;
        text-align: right;
        &__count {
          font-size: 0.12rem;
          color: $content-fontColor;
          line-height: 0.14rem;
          margin-top: 0.04rem;
        }
      }
    }
  }
}
</style>
