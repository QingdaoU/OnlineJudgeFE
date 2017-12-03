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
  'NOW_ADD_1S': null,
  'CHANGE_CONTEST': null,
  'CHANGE_CONTEST_PROBLEMS': null,
  'CHANGE_CONTEST_ITEM_VISIBLE': null,
  'CHANGE_RANK_FORCE_UPDATE': null,
  'CHANGE_CONTEST_RANK_LIMIT': null,
  'CONTEST_ACCESS': null,
  'CLEAR_CONTEST': null
})
