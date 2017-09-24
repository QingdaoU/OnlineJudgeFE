import types from './types'

export default {
  [types.UPDATE_WEBSITE_CONF](state, payload) {
    state.website = payload.websiteConfig
  },
  [types.CHANGE_MODAL_STATUS](state, {mode, visible}) {
    if (mode !== undefined) {
      state.modalStatus.mode = mode
    }
    if (visible !== undefined) {
      state.modalStatus.visible = visible
    }
  }
}
