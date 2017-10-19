const Settings = () => import(/* webpackChunkName: "setting" */ './Settings.vue')
const ProfileSetting = () => import(/* webpackChunkName: "setting" */ './children/ProfileSetting.vue')
const SecuritySetting = () => import(/* webpackChunkName: "setting" */ './children/SecuritySetting.vue')
const AccountSetting = () => import(/* webpackChunkName: "setting" */ './children/AccountSetting.vue')

export {Settings, ProfileSetting, SecuritySetting, AccountSetting}
