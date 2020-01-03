import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-tw'

// change locale
function changeLocale (lang) {
  if (lang === 'zh-CN') {
    moment.locale('zh-cn')
  } else if (lang === 'zh-TW') {
    moment.locale('zh-tw')
  } else {
    moment.locale('en')
  }
}

// convert utc time to localtime
function utcToLocal (utcDt, format = 'YYYY-M-D  HH:mm:ss') {
  return moment.utc(utcDt).local().format(format)
}

// get duration from startTime to endTime, return like 3 days, 2 hours, one year ..
function duration (startTime, endTime) {
  let start = moment(startTime)
  let end = moment(endTime)
  let duration = moment.duration(start.diff(end, 'seconds'), 'seconds')
  return duration.humanize()
}

function secondFormat (seconds) {
  let m = moment.duration(seconds, 'seconds')
  return m.humanize()
}

export default {
  changeLocale: changeLocale,
  utcToLocal: utcToLocal,
  duration: duration,
  secondFormat: secondFormat
}
