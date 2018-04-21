<template>
  <div>
    <panel class="container">
      <div slot="title">Compiler & Judger</div>
      <div class="content markdown-body">
        <ul>
          <li v-for="lang in languages">{{lang.name}} ( {{lang.description}} )
            <pre>{{lang.config.compile.compile_command}}</pre>
          </li>
        </ul>
      </div>
    </panel>

    <panel :padding="15" class="container">
      <div slot="title">Result Explanation</div>
      <div class="content">
        <ul>
          <li><b>Pending & Juding</b> : {{$t('m.Pending_Juding')}}</li>
          <li><b>Compile Error</b> :	{{$t('m.Compile_Error')}}
      </li>
          <li><b>Accepted</b> :	{{$t('m.Accepted')}}</li>
          <li><b>Wrong Answer</b> :	{{$t('m.Wrong_Answer')}}</li>
          <li>
            <b>Runtime Error</b>
            :	{{$t('m.Runtime_Error')}}
          </li>
          <li><b>Time Limit Exceeded</b>
            :	{{$t('m.Time_Limit_Exceeded')}}
          </li>
          <li><b>Memory Limit Exceeded</b> :	{{$t('m.Memory_Limit_Exceeded')}}</li>
          <li><b>System Error</b> :	{{$t('m.System_Error')}}
          </li>
        </ul>
      </div>
    </panel>

  </div>
</template>

<script>
  import utils from '@/utils/utils'

  export default {
    data () {
      return {
        languages: []
      }
    },
    beforeRouteEnter (to, from, next) {
      utils.getLanguages().then(languages => {
        next(vm => {
          vm.languages = languages
        })
      })
    }
  }
</script>

<style scoped lang="less">
  .container {
    margin-bottom: 20px;

    .content {
      font-size: 16px;
      margin: 0 50px 20px 50px;
      > ul {
        list-style: disc;
        li {
          line-height: 2;
          .title {
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
