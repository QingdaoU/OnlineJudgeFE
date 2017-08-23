import moment from 'moment'

// convert utc time to localtime
function utcToLocal(utcDt, format = 'YYYY-M-D  HH:mm:ss') {
  return moment.utc(utcDt).local().format(format)
}

// get duration from startTime to endTime, return like 3 days, 2 hours, one year ..
function duration(startTime, endTime) {
  let start = moment(startTime)
  let end = moment(endTime)
  return moment.duration(start.diff(end, 'seconds'), 'seconds').humanize()
}

export default {
  utcToLocal: utcToLocal,
  duration: duration
}
