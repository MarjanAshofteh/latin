<template>
  <md-content class="news md-elevation-2">
    <div class="md-title">{{news.title}}</div>
    <div class="md-body-2" v-html="news.body_value"></div>
  </md-content>
</template>

<script>


export default {
  name: 'news',
  data(){
    return{
      news:[]
    }
  },
  mounted(){
    this.$store.watch(s =>{
      this.getnews()
    })
  },
  methods:{
    getnews(){
      this.print=false
      fetch('http://civil808.com/latin/latin_news/'+ this.$store.state.newsnid +'?hash=21567cb05bd1fa6fa9d20ea55b4f26b6f90446f7726bc305dbc2c9f7c2fcf054')
        .then(response => response.json())
        .then((data) => {
          this.news = data.news
      })
    }
  }
}
</script>

<style>
.md-content.news{
  width: 76%;
  margin: auto;
  padding: 25px 25px;
  text-align:left;
  background-color: white; 
}
.news .md-title{
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
</style>

