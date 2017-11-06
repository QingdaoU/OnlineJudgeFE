function keyMirror (obj) {
  if (obj instanceof Object) {
    var _obj = Object.assign({}, obj)
    var _keyArray = Object.keys(obj)
    _keyArray.forEach(key => {
      _obj[key] = key
    })
    return _obj
  }
}

export default keyMirror({
  'CHANGE_PROFILE': null,
  'CHANGE_MODAL_STATUS': null,
  'UPDATE_WEBSITE_CONF': null,

  'NOW': null,
  'CHANGE_CONTEST': null,
  'CHANGE_CONTEST_PROBLEMS': null,
  'CHANGE_CONTEST_MENU_VISIBLE': null,
  'CHANGE_CONTEST_CHART_VISIBLE': null,
  'CONTEST_ACCESS': null,
  'CLEAR_CONTEST': null
})
