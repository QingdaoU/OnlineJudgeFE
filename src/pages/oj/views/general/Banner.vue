<template>
  <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in bannerList" :key="item">
      <div class="banner-item" :style="{ 'background-image': 'url(' + item.imgUrl + ')' }"></div>
    </el-carousel-item>
  </el-carousel>
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
        },
        {
          id: 3,
          imgUrl: '/static/img/modem-1.jpg'
        },
        {
          id: 4,
          imgUrl: '/static/img/lantern-4.jpg'
        },
        {
          id: 5,
          imgUrl: '/static/img/lantern-5.jpg'
        },
        {
          id: 6,
          imgUrl: '/static/img/modem-2.jpg'
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

<style>
  /* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  } */
  
  .banner-item {
    margin: 0;
    height: 300px;
    border-radius: 15px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>