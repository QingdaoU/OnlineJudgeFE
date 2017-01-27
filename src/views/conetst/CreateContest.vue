<template>
  <div class="view">
    <Panel title="Create Contest">
      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Title" required>
              <el-input v-model="contest.title" placeholder="Tittle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description" required>
              <Simditor v-model="contest.description"></Simditor>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Start Time" required>
              <el-date-picker
                v-model="contest.start_time"
                type="datetime"
                placeholder="Start Time">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="End Time" required>
              <el-date-picker
                v-model="contest.end_time"
                type="datetime"
                placeholder="End Time">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Password">
              <el-input v-model="contest.password" placeholder="Contest Password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Contest Rule Type">
              <el-radio class="radio" v-model="contest.rule_type" label="ACM">ACM</el-radio>
              <el-radio class="radio" v-model="contest.rule_type" label="OI">OI</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Real Time Rank">
              <el-switch
                v-model="contest.real_time_rank"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Status">
              <el-switch
                v-model="contest.visible"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="saveContest">Save</el-button>
    </Panel>
  </div>
</template>

<script>
  import api from '../../api.js'
  import Panel from '../../components/Panel.vue'
  import Simditor from '../../components/Simditor.vue'
  export default{
    components: {
      Panel,
      Simditor
    },
    data () {
      return {
        contest: {
          title: '',
          description: '',
          start_time: '',
          end_time: '',
          rule_type: 'ACM',
          password: '',
          real_time_rank: true,
          visible: true
        }
      }
    },
    methods: {
      saveContest () {
        api.createContest(this.contest).then(res => {
          this.$router.push({name: 'contest-list'})
        }).catch(() => {})
      }
    }
  }
</script>
