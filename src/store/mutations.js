import * as types from './mutation-types'
const mutations = {
  [types.SET_SHOWSIDE_STATE](state, flag) {
    state.showSide = flag
  },
}
export default mutations