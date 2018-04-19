import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Create new Store
const store = new Vuex.Store({
    //strict: process.env.NODE_ENV !== 'production',  
    state:{
        newsnid: 0
    },
    mutations:{
        SET_NEWS(state,newnid){
            state.newsnid = newnid
        },
        INCREMENT(state) {
            state.test++
        }
    },
    getters:{
        //evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
        getMynid: state => state.newsnid
    },
    actions:{

    }
})
// module.exports = store
export default store

