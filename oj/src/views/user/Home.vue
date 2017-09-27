<template>
  <div class="container">
    <div class="avatar-container">
      <img class="avatar" :src="profile.avatar"/>
    </div>
    <Card :padding="100">
      <div v-if="profile.user">
        <p style="margin-top: -10px">
          <span v-if="profile.user" class="emphasis">{{profile.user.username}}</span>
          <span v-if="profile.school">@{{profile.school}}</span>
        </p>
        <p v-if="profile.mood">
          {{profile.mood}}
        </p>
        <hr id="split"/>

        <div class="flex-container">
          <div class="left">
            <p>Solved</p>
            <p class="emphasis">{{profile.accepted_number}}</p>
          </div>
          <div class="middle">
            <p>Submissions</p>
            <p class="emphasis">{{profile.submission_number}}</p>
          </div>
          <div class="right">
            <p>Score</p>
            <p class="emphasis">{{profile.total_score}}</p>
          </div>
        </div>
        <div id="problems">
          <p v-if="problems.length">List of solved problems</p>
          <p v-else>The guy is so lazy that have not solved any problem yet.</p>
          <div class="btns">
            <div class="problem-btn" v-for="problemID in problems">
              <Button type="ghost" @click="goProblem(problemID)">{{problemID}}</Button>
            </div>
          </div>
        </div>
        <div id="icons">
          <a :href="profile.github">
            <Icon type="social-github-outline" size="30"></Icon>
          </a>
          <a :href="'mailto:'+ profile.user.email">
            <Icon class="icon" type="ios-email-outline" size="30"></Icon>
          </a>
          <a :href="profile.blog">
            <Icon class="icon" type="ios-world-outline" size="30"></Icon>
          </a>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import time from '@/utils/time'
  import api from '@/api'

  export default {
    data() {
      return {
        profile: {},
        problems: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let username = this.$route.query.username
        api.getUserInfo(username).then(res => {
          this.profile = res.data.data
          this.getSolvedProblems()
          let registerTime = time.utcToLocal(this.profile.user.create_time, 'YYYY-MM-D')
          console.log('The guy registered at ' + registerTime + '.')
        })
      },
      getSolvedProblems() {
        let ACMProblems = this.profile.acm_problems_status.problems || {}
        // todo oi problems
        this.problems = Object.keys(ACMProblems).filter(problem => {
          if (ACMProblems[problem] === 0) {
            return true
          }
        })
      },
      goProblem(problemID) {
        this.$router.push({name: 'problem-details', params: {problemID: problemID}})
      }
    },
    watch: {
      '$route'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @top-margin: 80px;

  .container {
    position: relative;
    width: 75%;
    margin: @top-margin auto;
    text-align: center;
    p {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .avatar-container {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      z-index: 1;
      top: -@top-margin;
      .avatar {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        box-shadow: 0 1px 1px 0;
      }
    }
    .emphasis {
      font-size: 20px;
      font-weight: 600;
    }
    #split {
      margin: 20px auto;
      width: 90%;
    }
    .flex-container {
      margin-top: 30px;
      padding: auto 20px;
      .left {
        flex: 1 1;
      }
      .middle {
        flex: 1 1;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
      }
      .right {
        flex: 1 1;
      }
    }
    #problems {
      margin-top: 40px;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 18px;
      .btns {
        margin-top: 15px;
        .problem-btn {
          display: inline-block;
          margin: 5px;
        }
      }
    }
    #icons {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      .icon {
        padding-left: 20px;
      }
    }
  }
</style>
