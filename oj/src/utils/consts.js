export const JUDGE_STATUS = {
  '-2': {
    name: 'Compile Error',
    color: 'yellow',
    type: 'warning'
  },
  '-1': {
    name: 'Wrong Answer',
    color: 'red',
    type: 'error'
  },
  '0': {
    name: 'Accepted',
    color: 'green',
    type: 'success'
  },
  '1': {
    name: 'Time Limit Exceeded',
    color: 'red',
    type: 'error'
  },
  '2': {
    name: 'Time Limit Exceeded',
    color: 'red',
    type: 'error'
  },
  '3': {
    name: 'Memory Limit Exceeded',
    color: 'red',
    type: 'error'
  },
  '4': {
    name: 'Runtime Error',
    color: 'red',
    type: 'error'
  },
  '5': {
    name: 'System Error',
    color: 'red',
    type: 'error'
  },
  '6': {
    name: 'Pending',
    color: 'yellow',
    type: 'error'
  },
  '7': {
    name: 'Judging',
    color: 'blue',
    type: 'info'
  },
  '8': {
    name: 'Partial Accepted',
    color: 'blue',
    type: 'info'
  },
  '9': {
    name: 'Submitting',
    color: 'yellow',
    type: 'warning'
  }
}

export const CONTEST_STATUS = {
  '1': {
    name: 'Not Started',
    color: 'yellow'
  },
  '0': {
    name: 'Underway',
    color: 'green'
  },
  '-1': {
    name: 'Ended',
    color: 'red'
  }
}
