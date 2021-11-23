<template>
  <div class="position">
    <i class="iconfont position__icon">&#xe62f;</i>
    北京理工大学国防科技园2号楼10层
    <i class="iconfont position_notice">&#xe601;</i>
  </div>
  <div class="search">
    <span class="iconfont">&#xe7b3;</span>
    山姆会员商店优惠商品
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="(item, index) in iconList" :key="index">
      <img class="icons__item__img" :src="item.imgUrl" alt="" />
      <p class="icons__item__desc">{{ item.title }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconList = [
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利',
      },
    ]
    return { iconList }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.position {
  padding: 0.16rem 0.16rem 0.24rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-fontColor;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position_notice {
    position: absolute;
    right: 0.18rem;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  margin-bottom: 0.12rem;
  .iconfont {
    position: relative;
    display: inline-block;
    font-size: 0.18rem;
    top: 0.01rem;
    padding: 0 0.12rem 0 0.12rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%; //防止图片加载抖动
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0.16rem auto 0;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem;
      text-align: center;
      color: $content-fontColor;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background: $content-bgColor;
}
</style>
