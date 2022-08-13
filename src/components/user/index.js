// 引入
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import User from './views/User.vue'

// 整合searchStore
const UserStore = {
  state,
  getters,
  actions,
  mutations,
}

// 导出
export { UserStore, User }
