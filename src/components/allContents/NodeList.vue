<template>
    <div class="contents md-elevation-1" style="padding: 0 15px;">
      <div 
        class="md-layout" 
        style="flex: 1 1 100%;	align-items: center;">
        <span 
          class="md-layout-item" 
          style="flex: 0 260px; margin-left: auto;order: 1;	font-size: 13px;" 
          v-if="count > 0">
          {{pager_count}}
          <md-icon style="margin-right: 8px;font-size: 20px !important;">widgets</md-icon>
          </span>
        <md-field 
          class="md-layout-item" 
          style="max-width: 500px;"
          md-clearable 
          @md-clear="getContents()"
          md-layout="box">
          <label>Search</label>
          <md-input class="reset-input"
            v-model.lazy="searchInput" 
            @keyup.native.enter="getContents()"></md-input>
          <md-icon>search</md-icon>
        </md-field>
      </div>

      <div v-show="Object.keys(chips).length > 0" class="chips-container">
        <md-chip 
          class="" 
          md-deletable 
          v-for="(value, key) in chips" :key="key" 
          @md-delete="chips_delete(key)"
        >
          {{value}}
        </md-chip>
      </div>
      
      <md-divider></md-divider>

      <md-empty-state v-if="count < 1" style="	margin: 30px auto;"
        md-rounded
        md-icon="search"
        md-label="No item found"
        md-description="Change your filters to search for other items.">
      </md-empty-state>

      <div class="md-layout" style="position: relative;	margin: 0 -1%;">
        <div class="loading" v-if="loading">
          <md-progress-spinner 
            :md-diameter="100" 
            :md-stroke="5" 
            md-mode="indeterminate" 
            style="position: fixed;top: calc(50% - 50px);">
          </md-progress-spinner>
        </div>

        <NodeTeaser v-for="content in contents" :key="content.nid"
        :title="content.title" 
        :pic="content.picture"
        :nid="content.nid"
        :date="content.created"
        :type="content.types"/>
      </div>
      
      <div class="pager-container">
        <md-button class="md-icon-button" @click="set_pager('first')" v-if="pager.length > 1 && page > 1"><md-icon>first_page</md-icon></md-button>
        <md-button class="md-icon-button" @click="set_pager('prev')"  v-if="pager.length > 1 && page > 1"><md-icon>chevron_left</md-icon></md-button>
        <md-button class="md-icon-button" v-for="i in pager" :key="i" 
        v-if="(page > 5 && i < page + 5 && i > page - 5) || (page < 5 && i < 9)" 
        :class="pager_classes(i)"
        @click="set_pager(i)">
          {{i}}
        </md-button>
        <md-button class="md-icon-button" @click="set_pager('next')" v-if="pager.length > 1 && page < pager.length"><md-icon>chevron_right</md-icon></md-button>
        <md-button class="md-icon-button" @click="set_pager('last')" v-if="pager.length > 1 && page < pager.length"><md-icon>last_page</md-icon></md-button>
      </div>
    </div>
</template>

<script>
import NodeTeaser from '@/components/allContents/NodeTeaser'
import Vue from 'vue';

export default {
  name: 'NodeList',
  props: ['filterEnabled'],
  data () {
    return {
      contents:[],
      searchInput:'',
      stock: false,
      count: 0,
      chips: {},
      page: 1,
      pager: [],
      loading: true,
    }
  },
  mounted() {
    var query = this.$route.query
    var selected = this.$store.state.selected
    Object.keys(query).map((key)=>{
      switch(key){
        case 'search': 
          this.searchInput = query[key]
          break
        case 'stock': 
          this.stock = true
          break
        case 'page': 
          this.page = query[key]
          break
        default : 
          selected[key] = query[key].split(",")
          break
      }
    })
    //after handling url queries its time to filter contents
    this.getContents()
    
    this.$store.watch(
      (state) => {return state.selected}, 
      () => { this.getContents()}, 
      { deep: true} 
    )
    this.$store.watch(
      (state) => {return state.filters},
      () => {this.update_chips()},
      { deep: true} 
    )
  },
  methods:{
    getContents(){
      this.set_loading()
      var selected = this.$store.state.selected
      var filters = this.$store.state.filters
      var url = ""
      var query = {}
      var chipps = {}

      //handling filters checkboxes
      var first_query = true
      Object.keys(selected).map(function(Key) {
        var val = selected[Key];
        if(val.length){
          var selectedTid = ""
          var first = true
          val.forEach(tid => {
            selectedTid += (first)? tid : "," + tid
            first = false
            chipps[tid] = filters[tid]
          })

          url += ((!first_query)? "&" : "") + "parameter[" + Key + "]=" + selectedTid
          query[Key] = selectedTid
          first_query = false
        }
      });
      this.chips = chipps
      
      //handling search
      if(this.searchInput != ''){
        url += '&parameter[search]=' + this.searchInput
        query.search = this.searchInput        
        this.chips['search'] = this.searchInput
      }else{
        delete this.chips.search
      }
      
      //handling pager
      if(this.page > 1){
        url += '&parameter[page]=' + (this.page - 1)
        query.page = this.page
      }

      //submitting changes
      if(this.filterEnabled)
        this.$router.replace({ name: "allContents", query : query })
      fetch('http://api.ed808.com/latin/latin_contents?'+ url)
        .then(response => response.json())
        .then((data) => {
          //set page in url query to the last possible page if it is bigger than content count
          if(Math.ceil(data.count / 30) < this.page && this.page > 1){
            this.page = Math.ceil(data.count / 30)
            this.page = this.page == 0 ? 1 : this.page
            this.getContents()
          }

          this.contents = data.contents
          this.count = data.count
          this.update_pager()
          setTimeout(() => {this.loading = false}, 300)
        })
    },
    set_loading(){
      this.loading = true
    },
    chips_delete(i){//callback for delete button in chips
      delete this.chips[i]
      switch(i){
        case 'stock':
          this.stock = false
          this.getContents()
        break
        case 'search':
          this.searchInput = ''
          this.getContents()
        break
        default:
          var obj = this.$store.state.selected
          Object.keys(obj).map(function(Key) { // searching in store to delete from
            var val = obj[Key]
            if(val.indexOf(i) >= 0){
              obj[Key].splice(val.indexOf(i), 1)
            }
          })
        break
      }
    },
    update_chips(){
      var filters = this.$store.state.filters
      Object.keys(this.chips).map((Key) => {
        if(Key != 'search' && Key != 'stock')
          this.chips[Key] = filters[Key]
      });      
    },
    update_pager(){
      var i = 1
      this.pager = []
      if(this.count > 30){
        this.pager.push(i)
        while(i*30 < this.count){
          this.pager.push(i+1)
          i++
        }
      }
    },
    pager_classes(i){
      return {active: i == this.page}
    },
    set_pager(i){
      switch(i){
        case 'first':
          this.page = 1
          break
        case 'prev': 
          this.page--
          break
        case 'next': 
          this.page++
          break
        case 'last': 
          this.page = Math.ceil(this.count / 30)
          break
        default : 
          this.page = i
          break
      }
      this.getContents()
    },
  },
  components: {
    NodeTeaser
  },
  computed: {
    pager_count: function(){
      var start = (this.page - 1) * 30 + 1
      var till = (this.count - start > 29)? start + 29 : this.count
      return 'Showing ' + start +' - '+ till + ' From '+ this.count +' Contents'
    },
  },
}
</script>

<style lang="scss">
.md-layout-item.contents{
    @media (max-width: 1280px) {
    min-width: 75%;
	  max-width: 75%;
	  flex: 0 1 75%;
  }
}
.contents .loading {
	position: absolute;
	z-index: 3;
	background: rgba(255, 255, 255, 0.6);
	width: 100%;
	right: 0;
	top: 0;
	height: 100%;
  text-align: center;
}
.md-headline{
  margin-bottom: 40px;
}
div.md-field .md-input-action {
	background: #fff;
	z-index: 6;
	height: 30px;
	width: 30px;
	min-width: 30px;
  box-shadow: none;
	color: #333 !important;
}
.chips-container {
  text-align: left;
  margin-bottom: 15px;
  .md-chip {
    font-size: 11px;
	  line-height: 30px;
	  background: transparent !important;
    border: 1px solid #bbb;
    &:not(.md-disabled):hover {
    	background: #ddd !important;
    	color: rgba(0, 0, 0, 0.87) !important;
    }
    svg {
    	fill: #555 !important;
    }
  }
  button {
  	box-shadow: none;
  }
}
.pager-container{
  margin: 30px;
  text-align: center;
  button {
  	float: none;
	  background: transparent;
	  box-shadow: none;
	  color: rgba(0, 0, 0, 0.87) !important;
    &.active {
      background: #fff !important;
      border: 1px solid #9C27B0;
      box-shadow: none !important;
      color: #9C27B0 !important;
    }
  }
}
.reset-input {
	margin: 0 !important;
	box-shadow: none !important;
}
</style>


