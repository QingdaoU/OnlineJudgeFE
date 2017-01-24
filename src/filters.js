// 友好显示时间
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return ~~(between / 60) + '分钟前'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' 小时前'
  } else {
    return ~~(between / 86400) + ' 天前'
  }
}

// 只显示日期
export function onlyDate (time) {
  const d = new Date(time * 1000)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}
