<template>
  <div class="block">
    <Carousel
      autoplay
      autoplay-speed="3000"
      dots="inside"
      trigger="hover"
      arrow="hover">
      <Carousel-item v-for="item in bannerList" :key="item">
        <div class="banner-item" :style="{ 'background-image': 'url(' + item.imgUrl + ')' }"></div>
      </Carousel-item>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  components: {},
  data () {
    return {
      bannerList: [
        {
          id: 1,
          imgUrl: '/static/img/lantern-1.jpg'
        },
        {
          id: 2,
          imgUrl: '/static/img/lantern-2.jpg'
        }
      ]
    }
  },
  mounted () {

  },
  methods: {

  },
  computed: {

  }
}
</script>

<style scoped lang="less">
  .banner-item {
    margin: 0;
    height: 400px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

</style>
