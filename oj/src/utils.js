import moment from 'moment'

export function backendDatetimeToISOFormat(dt) {
  return moment(dt, 'YYYY-M-DD HH:mm:ss zz').format()
}

export const STATUS = {
  '-2': 'Compile Error',
  '-1': 'Wrong Answer',
  '0': 'Accepted',
  '1': 'Time Limit Exceeded',
  '2': 'Time Limit Exceeded',
  '3': 'Memory Limit Exceeded',
  '4': 'Runtime Error',
  '5': 'System Error',
  '6': 'Pending',
  '7': 'Judging',
  '8': 'Partial Accepted',
  '9': 'Submitting'
}
