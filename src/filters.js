// 友好显示时间
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

// 只显示日期
export function onlyDate (time) {
  const d = new Date(time * 1000)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}
