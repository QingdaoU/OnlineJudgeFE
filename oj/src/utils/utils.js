import moment from 'moment'

export function backendDatetimeToISOFormat(dt) {
  return moment(dt, 'YYYY-M-DD HH:mm:ss zz').format()
}

export const STATUS = {
  '-2': {
    name: 'Compile Error',
    color: 'red'
  },
  '-1': {
    name: 'Wrong Answer',
    color: 'red'
  },
  '0': {
    name: 'Accepted',
    color: 'green'
  },
  '1': {
    name: 'Time Limit Exceeded',
    color: 'red'
  },
  '2': {
    name: 'Time Limit Exceeded',
    color: 'red'
  },
  '3': {
    name: 'Memory Limit Exceeded',
    color: 'red'
  },
  '4': {
    name: 'Runtime Error',
    color: 'red'
  },
  '5': {
    name: 'System Error',
    color: 'red'
  },
  '6': {
    name: 'Pending',
    color: 'yellow'
  },
  '7': {
    name: 'Judging',
    color: 'blue'
  },
  '8': {
    name: 'Partial Accepted',
    color: 'blue'
  },
  '9': {
    name: 'Submitting',
    color: 'yellow'
  }
}

