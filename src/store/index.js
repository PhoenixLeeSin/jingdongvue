import { createStore } from 'vuex'

// {
//   "1"  ==> shopId   : {
//     "productList" : {
//       "1"  === > productId : {
//         "_id" : "1",
//         "check" : true,
//         "count" : 1,
//         "imgUrl" : "http://www.dell-lee.com/imgs/vue3/tomato.png",
//         "name" : "番茄 250g / 份",
//         "oldPrice" : 39.6,
//         "price" : 33.6,
//         "sales" : 10
//       },
//       "2"  === > productId : {
//         "_id" : "2",
//         "check" : true,
//         "count" : 1,
//         "imgUrl" : "http://www.dell-lee.com/imgs/vue3/cherry.png",
//         "name" : "车厘子 500g / 份",
//         "oldPrice" : 119.6,
//         "price" : 99.6,
//         "sales" : 10
//       }
//     },
//     "shopName" : "沃尔玛"  ====> shopName
//   },
//   "2" ==> shopId  : {
//     "productList" : {
//       "1"  === > productId : {
//         "_id" : "1",
//         "check" : true,
//         "count" : 1,
//         "imgUrl" : "http://www.dell-lee.com/imgs/vue3/tomato.png",
//         "name" : "番茄 250g / 份",
//         "oldPrice" : 39.6,
//         "price" : 33.6,
//         "sales" : 10
//       }
//     },
//     "shopName" : "沃尔玛" ====> shopName
//   }
// }

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  // if (!localStorage.cartList) {
  return JSON.parse(localStorage.cartList)
  // } else {
  //   return {}
  // }
}

export default createStore({
  state: {
    cartList: getLocalCartList(),
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + payload.num
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
  },
  actions: {},
  modules: {},
})
