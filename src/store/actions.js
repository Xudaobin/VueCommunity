import { http } from '@/assets/api/http'

export default {
  getList ({ commit, state }, data) {
    return http.get(`/topics?limit=${data.limit}&page=${data.page}&tab=${data.tab}`).then(res => res)
  }
}