import moment from 'moment'

export default {
  backendDatetimeFormat(dt) {
    return moment(dt).format('YYYY-M-D  HH:mm:ss')
  }
}

