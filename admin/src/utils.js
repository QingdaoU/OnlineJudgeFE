import moment from 'moment'

export function backendDatetimeToISOFormat (dt) {
  return moment(dt).format()
}
