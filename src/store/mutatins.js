// 定义了vuex 数据 改变的方法 vuex数据改变 必须 放在mutations 里改变 
import * as types from './mutation-types'
const mutations = {
    [types.SET_WEXALL](state, Wexall) {
        state.Wexall = Wexall
    },
    [types.SET_ITEMID](state, ItemId) {
        state.ItemId = ItemId
    },
    [types.SET_DETAILSDATA](state, DetailsData) {
        state.DetailsData = DetailsData
    },
    [types.ISDET](state, IsDet) {
        state.IsDet = IsDet
    },
    [types.USERDATA](state, UserData) {
        state.UserData = UserData
    },
    [types.GOWEI](state, GoWei) {
        state.GoWei = GoWei
    }
}

export default mutations