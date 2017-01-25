<template>
  <div class="view">
    <Panel title="Create Contest">
      <el-form label-position="top" label-width="70px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Title">
              <el-input v-model="title" placeholder="Tittle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description">
              <Simditor v-model="description"></Simditor>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Start Time">
              <el-date-picker
                v-model="startTime"
                type="datetime"
                placeholder="Start Time">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="End Time">
              <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="End Time">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Password">
              <el-input v-model="password" placeholder="Contest Password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Contest Type">
              <el-radio class="radio" v-model="contestType" label="acm">ACM</el-radio>
              <el-radio class="radio" v-model="contestType" label="oi">OI</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Real Time Rank">
              <el-switch
                v-model="realTimeRank"
                on-color="#13ce66"
                off-color="#ff4949">
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
  // import api from '../../api.js'
  import Panel from '../../components/Panel.vue'
  import Simditor from '../../components/Simditor.vue'
  export default{
    components: {
      Panel,
      Simditor
    },
    data () {
      return {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        contestType: 'acm',
        password: '',
        realTimeRank: true
      }
    },
    mounted () {
    },
    methods: {
      saveContest () {
      }
    }
  }
</script>
