import moment from 'moment'

export default {
  backendDatetimeFormat(dt) {
    return moment(dt).format('YYYY-M-D  HH:mm:ss')
  },
  dateTimeDuration(startTime, endTime) {
    let start = moment(startTime)
    let end = moment(endTime)
    return moment.duration(start.diff(end, 'seconds'), 'seconds').humanize()
  },
  backendMemoryFormat(memory) {
    if (memory === undefined) return '--'
    // 1048576 = 1024 * 1024
    let t = parseInt(memory) / 1048576
    return String(t.toFixed(0)) + 'MB'
  },
  backendTimeFormat(time) {
    if (time === undefined) return '--'
    return time + 'MS'
  },
  getACRate(acCount, totalCount) {
    let rate = totalCount === 0 ? 0.00 : (acCount / totalCount * 100).toFixed(2)
    return String(rate) + '%'
  }
}

