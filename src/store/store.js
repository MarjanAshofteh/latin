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
        username:'',

        //allContents page
        filtersLoading: true,
        selected : {
            t2258: [],
            t2259: [],
            t2260: [],
            t2261: [],
            t2262: [],
            t2264: [],
            t2265: [],
            t2458: [],
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

