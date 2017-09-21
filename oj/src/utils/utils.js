import api from '../api'
import storage from './storage'
import {STORAGE_KEY} from './consts'

function submissionMemoryFormat(memory) {
  if (memory === undefined) return '--'
  // 1048576 = 1024 * 1024
  let t = parseInt(memory) / 1048576
  return String(t.toFixed(0)) + 'MB'
}

function submissionTimeFormat(time) {
  if (time === undefined) return '--'
  return time + 'MS'
}

function getACRate(acCount, totalCount) {
  let rate = totalCount === 0 ? 0.00 : (acCount / totalCount * 100).toFixed(2)
  return String(rate) + '%'
}

// 优先从本地读取contest,若不存在则从服务端获取
function loadContest(contestID) {
  let key = STORAGE_KEY.contest + contestID
  let contest = storage.get(key)
  if (contest) {
    return contest
  }
  api.getContest(contestID).then(res => {
    storage.set(key, res.data.data)
    return res.data.data
  })
}

// 去掉值为空的项，返回object
function filterEmptyValue(object) {
  let query = {}
  Object.keys(object).forEach(key => {
    if (object[key]) {
      query[key] = object[key]
    }
  })
  return query
}
export default {
  submissionMemoryFormat: submissionMemoryFormat,
  submissionTimeFormat: submissionTimeFormat,
  getACRate: getACRate,
  loadContest: loadContest,
  filterEmptyValue: filterEmptyValue
}

