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
          <li><b>Pending & Juding</b> : You solution will be judged soon, please wait for result</li>
          <li><b>Compile Error</b> :	Failed to compile your source code. Click on the link to see compiler's output.
      </li>
          <li><b>Accepted</b> :	Congratulations. Your solution is correct.</li>
          <li><b>Wrong Answer</b> :	Your program's output doesn't match judger's answer.</li>
          <li>
            <b>Runtime Error</b>
            :	Your program terminated abnormally. Possible reasons are: segment fault, divided by zero or exited with code other than 0.
          </li>
          <li><b>Time Limit Exceeded</b>
            :	The CPU time your program used has exceeded limit. Java has a triple time limit.
          </li>
          <li><b>Memory Limit Exceeded</b> :	The memory your program actually used has exceeded limit.</li>
          <li><b>System Error</b> :	Oops, something has gone wrong with the judger. Please report this to administrator.
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
