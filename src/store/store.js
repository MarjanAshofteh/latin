import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Create new Store
const store = new Vuex.Store({
    //strict: process.env.NODE_ENV !== 'production',  
    state:{
        newsnid: 0,
        news_loading : true,
        isLogedIn : false,
        uid:0,
        src:'',
        username:''
    },
    mutations:{
        SET_NEWS(state,newnid){
            state.newsnid = newnid
            state.news_loading = true            
        },
        SET_NEWS_LOADING(state){
            state.news_loading = false
        },
        ISLOGIN(state,uid){
            state.isLogedIn = true
            state.uid = uid
        },
        LOGEDOUT(state){
            state.isLogedIn = false
            state.uid = 0
        },
        NAV_BAR(state,src,username){
            state.src = src
            state.username = username
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

