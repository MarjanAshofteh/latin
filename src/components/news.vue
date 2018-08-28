<template>
  <md-content class="news md-elevation-2" v-if="showornot">
    <div class="loading" v-if="$store.state.news_loading">
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
    
  </md-content>
</template>

<script>

export default {
  name: 'news',
  data(){
    return{
      news:[],
      close:false
    }
  },
  mounted(){
    console.log('mounted')
    this.$store.watch(s =>{
      this.close=false
      this.getnews()
    })
  },
  beforeUpdate(){
    //console.log('before update')
  },
  updated(){
    //console.log('updatedddddddddddddddddd')
  },
  beforeDestroy(){
    //console.log('before destrooooooooooy')
  },
  computed:{
    showornot(){
      //this.news!=false && 
      if(this.close==false)
        return true
      else
        return false
    }
  },
  methods:{
    getnews(){
      this.print=false
      fetch('http://api.ed808.com/latin/latin_news/'+ this.$store.state.newsnid +'?hash=21567cb05bd1fa6fa9d20ea55b4f26b6f90446f7726bc305dbc2c9f7c2fcf054')
        .then(response => response.json())
        .then((data) => {
          this.news = data.latin_news
          this.$store.commit('SET_NEWS_LOADING');
      })
    },
    clear_news(){
        this.close=true
        this.$store.commit('SET_NEWS', 0);
    } 
  },
  filters: {
    converturl: function(value){
        if (!value) return '';
        var thestart = 'http://api.ed808.com/sites/default/files/styles/808/public';
        var theend = value.substr(8);
        return thestart + theend;
    }
  }
}
</script>

<style lang="scss">
.loading {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: #fff;
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

