import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () =>
      import(/* webpackChunkName: "cartList" */ '../views/shop/Shop.vue'),
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () =>
      import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue'),
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () =>
      import(
        /* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation.vue'
      ),
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () =>
      import(
        /* webpackChunkName: "orderList" */ '../views/orderList/OrderList.vue'
      ),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    beforeEnter(to, from, next) {
      // const isLogin = localStorage.isLogin
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(
        /* webpackChunkName: "register" */ '../views/register/Register.vue'
      ),
    beforeEach(to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  !isLogin && to.name !== 'Login' && to.name !== 'Register'
    ? next('Login')
    : next()
  next()
})

export default router
