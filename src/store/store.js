import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Create new Store
const store = new Vuex.Store({
    //strict: process.env.NODE_ENV !== 'production',  
    state:{
        isLogedIn : false,
        uid:0,
        src:'',
        username:'',

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
        },
        SET_FILTERS(state, filters){
            state.filters = filters
        },
    },
    getters:{
        getFilters: state => state.selected,
    },
    actions:{

    }
})

export default store

