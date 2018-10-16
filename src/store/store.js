import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Create new Store
const store = new Vuex.Store({
  //strict: process.env.NODE_ENV !== 'production',  
  state:{
    uid:0,
    roles:['administrator'],
    //allContents page
    filtersLoading: true,
    selected : {
      type: [],
      category: [],
      topic: [],
    },
    queryNames : {
      t2258: 'product_kind',
      t2259: 'field',
      t2260: 'publication_name',
      t2261: 'exam',
      t2262: 'education_kind',
      t2264: 'academic_orientation',
      t2265: 'special',
      t2458: 'producer',
    },
    filters : {}
  },
  mutations:{
    LOGIN(state,uid){
      state.uid = uid
    },
    LOGOUT(state){
      state.uid = 0
    },
    SET_FILTERS(state, filters){
      state.filters = filters
    },
  },
  getters:{
    getUid: state => (state.uid > 0)? state.uid : false
  },
  actions:{
  }
})

export default store

