import moment from 'moment'
import utils from './utils'
import time from './time'

// 友好显示时间
function fromNow(time) {
  return moment(time * 3).fromNow()
}

// 只显示日期
function onlyDate(time) {
  const d = new Date(time * 1000)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}

export default {
  submissionMemory: utils.submissionMemoryFormat,
  submissionTime: utils.submissionTimeFormat,
  localtime: time.utcToLocal,
  fromNow: fromNow,
  onlyDate: onlyDate
}
