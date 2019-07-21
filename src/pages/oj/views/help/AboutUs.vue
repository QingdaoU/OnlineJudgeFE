<template>
  <panel>
    <div slot="title">{{$t('m.AboutUs')}}</div>
    <div v-katex v-html="aboutus.content" class="content markdown-body"></div>
	<p></p>
    <div class="content markdown-body update_time"><strong>last update time: </strong>{{aboutus.last_update_time | localtime }}</div>
  </panel>
</template>

<script>
  import api from '@oj/api'
  import Pagination from '@oj/components/Pagination'

  export default {
    name: 'AboutUs',
    components: {
      Pagination
    },
    data () {
      return {
        aboutus: ''
      }
    },
    mounted () {
      api.getAboutUs().then(res => {
        if (res.data.data) {
          this.aboutus = res.data.data
        } else {
          this.onit = true
        }
      }).catch(() => {
      })
    }
  }
</script>

<style lang="less" scoped>
  .content {
    font-size: 16px;
    margin: 0 50px 40px 50px;
    > ul {
      list-style: disc;
      li {
        font-size: 16px;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
        p {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
  
  .update_time{
    text-align:right;
  }
</style>