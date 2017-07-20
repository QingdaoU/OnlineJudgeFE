<template>
<!-- <div class="">
  <img :src=profile.avatar alt="">
  <div class="">
    {{ profile.time_zone }}
  </div>
</div> -->
<el-row :gutter="20" class="container">
  <el-col :span="3">
    <div class="grid-content bg-purple-light"></div>
  </el-col>
  <el-col :span="4" class="profile-left">
    <div class="avatar-info">
      <img :src=profile.avatar alt="">
    </div>
    <h3>{{ profile.user.real_name }}</h3>
    <h5>(@{{ profile.user.username }})</h5>
    <div class="mood">
      {{ profile.mood }}
    </div>
    <div class="details">
      <div>{{ profile.school }}</div>
      <div>{{ profile.major }}</div>
      <div><a :href="profile.blog" target="_blank">{{ profile.blog }}</a></div>
      <div>{{ profile.user.email }}</div>
    </div>
  </el-col>
  <el-col :span="14">
    <div class="submission">
      <h4>最近提交</h4>
      <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="num" label="#" width="50">
        </el-table-column>
        <el-table-column prop="user" label="用户" width="150">
        </el-table-column>
        <el-table-column prop="title" label="题目名称" width="200">
        </el-table-column>
        <el-table-column prop="sub_time" label="提交时间" width="200">
        </el-table-column>
        <el-table-column porp="language" label="语言" width="80">
        </el-table-column>
        <el-table-column prop="result" label="结果">
        </el-table-column>

      </el-table>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="grid-content bg-purple-light"></div>
  </el-col>
</el-row>
</template>

<script>
import api from '../../api.js'

export default {
  data() {
    return {
      profile: {
        school: '',
        major: '',
        blog: '',
        mood: '',
        user: {
          username: '',
          real_name: '',
          email: ''
        }
      },
      tableData2: [{
        num: '1',
        user: 'Kuonji Chiaki',
        title: 'LRU Cache',
        sub_time: '2016年4月10日 19:51',
        language: 'C++',
        result: 'Accepted'
      }, {
        num: '2',
        user: 'Kuonji Chiaki',
        title: 'LRU Cache',
        sub_time: '2016年4月10日 19:51',
        language: 'C++',
        result: 'Wrong Answer'
      }, {
        num: '3',
        user: 'Kuonji Chiaki',
        title: 'LRU Cache',
        sub_time: '2016年4月10日 19:51',
        language: 'C++',
        result: 'Accepted'
      }, {
        num: '4',
        user: 'Kuonji Chiaki',
        title: 'LC and Prime',
        sub_time: '2016年4月10日 19:51',
        language: 'C++',
        result: 'Waiting'
      }, {
        num: '5',
        user: 'Kuonji Chiaki',
        title: 'LC and Prime',
        sub_time: '2016年4月10日 19:51',
        language: 'C++',
        result: 'Accepted'
      }]
    }
  },
  created() {
    this.getUserInfo(this.$route.params.userId)
  },
  methods: {
    getUserInfo(username) {
      api.getUserInfo(username).then(res => {
        console.log(res.data.data)
        this.profile = res.data.data
      })
    },
    tableRowClassName(row, index) {
      if (row.result === 'Accepted') {
        return 'accepted-row'
      } else if (row.result === 'Waiting') {
        return 'waiting-row'
      } else if (row.result === 'Wrong Answer') {
        return 'wrong-row'
      }
      return ''
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  margin-top: 30px;
}

.profile-left h3 {
  font-size: 1.5em;
  line-height: 1em;
  margin-bottom: 10px;
}

.profile-left h5 {
  color: #979faf;
  font-size: 1.125em;
  line-height: 1.33em;
  margin: 0 0 10px;
}

.profile-left .mood {
  margin: 20px 0;
}

.profile-left .details {
  border-top: 1px #e1e4e8 solid !important;
  padding-top: 10px;
}

.profile-left .details>div {
  margin-top: 5px;
}

.avatar-info {
  border-radius: 5px;
}

.avatar-info img {
  height: 230px;
  width: 230px;
}

.el-table .accepted-row td:nth-child(6){
  background: #dff0d8;
}

.el-table .waiting-row td:nth-child(6){
  background: #c9e5f5;
}

.el-table .wrong-row td:nth-child(6){
  background: #f2dede;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 636px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
