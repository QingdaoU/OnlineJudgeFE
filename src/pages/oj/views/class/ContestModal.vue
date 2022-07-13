<template>
  <Modal v-model="visibleModal" class="large" :width="650" @on-cancel="closeModal()">
    <div slot="header" class="modal-title">Add Contest</div>
    <Input v-model="labelSearch" placeholder="Search by title" @input="handleInputSearch($event)" style="margin-bottom: 10px"></Input>
    <div v-if="!contests.length" style="text-align: center">No data match</div>
    <Form v-else ref="formContest" :model="formContest">
      <FormItem>
        <CheckboxGroup v-model="formContest.contest_ids">
          <Checkbox 
            v-for="contest in contests" 
            :key="contest.id" 
            :label="contest.id"
            >
            <div class="contest">
              <img src="@/assets/Cup.png" alt="cup" class="trophy">
              <div class="content">
                <div class="title">
                  {{contest.title}}
                </div>
                <div class="detail">
                  <span class="start-time">
                    <Icon type="calendar" color="#3091f2"></Icon>
                    {{contest.start_time | localtime('YYYY-M-D HH:mm') }}
                  </span>
                  <span class="duration">
                    <Icon type="android-time" color="#3091f2"></Icon>
                    {{getDuration(contest.start_time, contest.end_time)}}
                  </span>
                  <Button size="small" shape="circle">
                    {{contest.rule_type}}
                  </Button>
                </div>
              </div>
              <div class="status">
                <Tag type="dot" :color="CONTEST_STATUS_REVERSE[contest.status].color">{{$t('m.' + CONTEST_STATUS_REVERSE[contest.status].name.replace(/ /g, "_"))}}</Tag>
              </div>
            </div>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
    <div class="footer">
      <Button
        type="primary"
        @click="handleUpdateContest()"
        class="btn" long
        :loading="btnLoading">
        {{btnLabel}}
      </Button>
    </div>
    <div slot="footer" style="display: none"></div>
  </Modal>
</template>

<script>
  import time from '@/utils/time'
  import { CONTEST_STATUS_REVERSE, randomColor } from '@/utils/constants'
  import { FormMixin } from '@oj/components/mixins'
  import api from '@oj/api'

  export default {
    name: 'MemberModal',
    mixins: [FormMixin],
    components: {
    },
    props: {
      visibleModal: {
        type: Boolean,
        default: false
      },
      activeClassroom: {}
    },
    mounted () {
    },
    data () {
      return {
        btnLabel: 'Add',
        btnLoading: false,
        contests: [],
        formContest: {
          contest_ids: []
        },
        timeoutId: null,
        labelSearch: null,
        CONTEST_STATUS_REVERSE: CONTEST_STATUS_REVERSE
      }
    },
    methods: {
      closeModal (shouldUpdate) {
        this.$emit('visibleModalChange', {status: false, shouldUpdate})
        this.resetForm()
      },
      handleUpdateContest () {
        this.btnLoading = true
        console.log(this.formContest)
        api.mappingContest(
          this.activeClassroom.id,
          this.formContest
        ).then(resp => {
          this.btnLoading = false
          if (!resp.error) {
            this.closeModal(true)
          }
        })
      },
      resetForm () {
        this.formContest = {...this.formContest, contest_ids: []}
        this.labelSearch = null
      },
      getRandomColor (input) {
        return randomColor(input)
      },
      handleInputSearch (valueSearch) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          api.getCanMappingContests(this.activeClassroom.id, valueSearch).then(resp => {
            this.contests = resp.data.data
          })
        }, 700)
      },
      getDuration (startTime, endTime) {
        return time.duration(startTime, endTime)
      }
    },
    watch: {
      'visibleModal' (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          api.getCanMappingContests(this.activeClassroom.id).then(resp => {
            console.log('dataaaa', resp)
            this.contests = resp.data.data
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-form  {
    max-height: 70vh;
    overflow-y: auto;
    .ivu-checkbox-group-item {
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 10px;
      padding-right: 10px;
      margin-top: 20px;

      .contest {
        display: flex;
        margin-left: 20px;
        align-items: center;
        width: 100%;
        .trophy {
          height: 50px;
          margin-right: 10px;
        }
        .content {
          display: flex;
          flex-direction: column;
          flex: 1;
          .title {
            font-size: 17px;
          }
          .detail {
            .start-time, .duration, button {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

</style>
