import moment from 'moment'

export function backendDatetimeToISOFormat (dt) {
  return moment(dt, 'YYYY-M-DD HH:mm:ss zz').format()
}
