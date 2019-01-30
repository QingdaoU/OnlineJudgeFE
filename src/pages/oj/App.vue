<template>
  <div id="app">
    <NavBar></NavBar>
	<vue-canvas-nest :config="{color:'0,117,169', count: 200, opacity: 0.7, pointColor: '0,0,0', zIndex: -2}" :el="'.content-app'"></vue-canvas-nest>
    <div class="content-app theme1">
      <transition name="fadeInUp" mode="out-in">
        <router-view></router-view>
      </transition>
      <div class="footer">
        <p v-html="website.website_footer"></p>
        <p>Powered by <a href="https://github.com/QingdaoU/OnlineJudge">OnlineJudge</a>
          <span v-if="version">&nbsp; Version: {{ version }}</span>
        </p>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import NavBar from '@oj/components/NavBar.vue'
  import vueCanvasNest from 'vue-canvas-nest'

  export default {
    name: 'app',
    components: {
      NavBar, vueCanvasNest
    },
    data () {
      return {
        version: process.env.VERSION
      }
    },
    created () {
      try {
        document.body.removeChild(document.getElementById('app-loader'))
      } catch (e) {
      }
    },
    mounted () {
      this.getWebsiteConfig()
    },
    methods: {
      ...mapActions(['getWebsiteConfig', 'changeDomTitle'])
    },
    computed: {
      ...mapState(['website'])
    },
    watch: {
      'website' () {
        this.changeDomTitle()
      },
      '$route' () {
        this.changeDomTitle()
      }
    }
  }
</script>

<style lang="less">

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    background-color: transparent;
    &:active, &:hover {
      outline-width: 0;
    }
  }


  .content-app {
    margin-top: 80px;
    padding: 0 2%;
  }

  .footer {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    font-size: small;
  }

  .fadeInUp-enter-active {
    animation: fadeInUp .8s;
  }

  .theme(@background: #eee, @ivu-btn-info: #2db7f5, @color: #2d8cf0, @word1: #2d8cf0, @word2: #57a3f3, @element: rgb(87, 163, 243)){
	html {
        background-color: @background;
    }
	
	element.style {
        color: @element;
    }

    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active{
        color: @color;
        border-bottom: 2px solid @color;
    }
	
	.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected, .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected:hover {
        color: #fff;
    }
	
	.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected, .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected:hover {
        background: @color;
    }

    .ivu-btn-info {
        background-color: @ivu-btn-info;
        border-color: @ivu-btn-info;
    }

    .ivu-page-item-active {
        background-color: @color;
		border-color: @color
    }

	.ivu-page-item:hover {
        border-color: @color;
    }
	
	.announcements-container li .flex-container .title a.entry[data-v-5fab8d1a]:hover {
        color: @color;
        border-bottom: 1px solid @color;
    }
	
	.ivu-btn-info:hover {
        background-color: @word2;
        border-color: @word2;
    } 
  }
  .theme1{  //胖次蓝
    .theme();
  }
  .theme2{  //少女粉
    .theme(rgba(245, 143, 152, 0.35), #f58f98, #f58f98, #f58f98, #d93a49, #f58f98);
  }
  .theme3{  //基佬紫
    .theme(rgba(63, 81, 181, 0.25), #3F51B5, #673AB7, #3F51B5, #673AB7, #3F51B5);
  }

</style>
