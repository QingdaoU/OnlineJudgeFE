export const JUDGE_STATUS = {
  '-2': {
    name: 'Compile Error',
    short: 'm.Short_Compile_Error',
    color: 'yellow',
    type: 'warning'
  },
  '-1': {
    name: 'Wrong Answer',
    short: 'm.Short_Wrong_Answer',
    color: 'red',
    type: 'error'
  },
  '0': {
    name: 'Accepted',
    short: 'm.Short_Accepted',
    color: 'green',
    type: 'success'
  },
  '1': {
    name: 'Time Limit Exceeded',
    short: 'm.Short_Time_Limit_Exceeded',
    color: 'red',
    type: 'error'
  },
  '2': {
    name: 'Time Limit Exceeded',
    short: 'm.Short_Time_Limit_Exceeded',
    color: 'red',
    type: 'error'
  },
  '3': {
    name: 'Memory Limit Exceeded',
    short: 'm.Short_Memory_Limit_Exceeded',
    color: 'red',
    type: 'error'
  },
  '4': {
    name: 'Runtime Error',
    short: 'm.Short_Runtime_Error',
    color: 'red',
    type: 'error'
  },
  '5': {
    name: 'System Error',
    short: 'm.Short_System_Error',
    color: 'red',
    type: 'error'
  },
  '6': {
    name: 'Pending',
    color: 'yellow',
    type: 'warning'
  },
  '7': {
    name: 'Judging',
    color: 'blue',
    type: 'info'
  },
  '8': {
    name: 'Partial Accepted',
    short: 'm.Short_Partial_Accepted',
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
  'NOT_START': '1',
  'UNDERWAY': '0',
  'ENDED': '-1'
}

export const CONTEST_STATUS_REVERSE = {
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

export const RULE_TYPE = {
  ACM: 'ACM',
  OI: 'OI'
}

export const CONTEST_TYPE = {
  PUBLIC: 'Public',
  PRIVATE: 'Password Protected'
}

export const USER_TYPE = {
  REGULAR_USER: 'Regular User',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin'
}

export const PROBLEM_PERMISSION = {
  NONE: 'None',
  OWN: 'Own',
  ALL: 'All'
}

export const STORAGE_KEY = {
  AUTHED: 'authed',
  PROBLEM_CODE: 'problemCode',
  languages: 'languages'
}

export function buildProblemCodeKey (problemID, contestID = null) {
  if (contestID) {
    return `${STORAGE_KEY.PROBLEM_CODE}_${contestID}_${problemID}`
  }
  return `${STORAGE_KEY.PROBLEM_CODE}_NaN_${problemID}`
}

export const GOOGLE_ANALYTICS_ID = 'UA-111499601-1'
