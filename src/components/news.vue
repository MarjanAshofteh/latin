<template>
  <md-content class="news md-elevation-2">
    
    <div class="event loading" v-if="loading">
      <md-progress-bar md-mode="indeterminate"></md-progress-bar>
    </div>
    
    <md-button @click="clear_news()" class="md-icon-button myclose">
        <md-icon>close</md-icon>
      </md-button>
    <div class="md-title">{{news.title}}</div>
    
    <div class="md-layout md-gutter" v-if="'uri' in news">
      <div class="md-layout-item">
        <img v-bind:src="news.uri | converturl " />
      </div>
      <div class="md-body-2 md-layout-item md-size-100" v-html="news.body_value"></div>
    </div>
    <div class="md-layout md-gutter" v-else>
      <div class="md-body-2 md-layout-item md-size-100 " v-html="news.body_value"></div>
    </div>
    
    <router-link :to="'/node/' + nid">
      <md-button class="md-raised" style="margin: 0 0 0 auto;display: block;">read more</md-button>
    </router-link>
  </md-content>
</template>

<script>

export default {
  name: 'news',
  props: ['nid'],
  data(){
    return{
      news:[],
      loading: true
    }
  },
  mounted(){
    this.getNews()
  },
  watch: {
    nid: function(){
      this.getNews()
    }
  },
  methods:{
    getNews(){
      if(this.nid != 0){
        this.loading = true
        fetch('http://api.ed808.com/latin/latin_news/'+ this.nid +'?hash=21567cb05bd1fa6fa9d20ea55b4f26b6f90446f7726bc305dbc2c9f7c2fcf054')
          .then(response => response.json())
          .then((data) => {
            this.news = data.latin_news
            this.loading = false
        })
      }
    },
    clear_news(){
      this.$emit('clearNid');
    } 
  },
  filters: {
    converturl: function(value){
      if (!value) return ''
      return "http://api.ed808.com/sites/default/files/" + value.substring(9)
    }
  }
}
</script>

<style lang="scss">
.event.loading {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
  background: rgba(255, 255, 255, 0.5);
}
:root{
    --md-theme-default-primary: #673AB7;
}
.md-progress-spinner {
	position: absolute;
}
.md-content.news{
  width: calc(100% - 72px);
	margin: 0 36px;
	padding: 25px 25px;
	text-align: left;
	position: relative;
  .md-title{
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 9px;
  }
  .myclose{
    position: absolute;
    top:10px;
    right:5px;
    .md-icon{
      color:#92278f;
    }
  }
}
</style>

