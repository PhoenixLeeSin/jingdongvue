<template>
  <div class="nearby">
    <div class="nearby__title">附近店铺</div>
    <router-link
      v-for="(item, index) in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item"></ShopInfo>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('api/shop/hot-list')
    if (result.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()

    return { nearbyList, getNearbyList }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.nearby {
  box-sizing: border-box;
  &__title {
    padding: 0.16rem 0 0.14rem 0;
    font-size: 0.18rem;
    color: $content-fontColor;
    font-weight: 500;
  }
  a {
    text-decoration: none;
  }
}
</style>
