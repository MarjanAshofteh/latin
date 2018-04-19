<template>
    <div class="newsdetail">
<br>
<br>
<div>{{news}}</div><br>
</div>
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
          this.news = data
      })
    }
  }
}
</script>

<style>
.newsdetail{
  width: 80%;
  background-color:#eee;
  margin: auto;
}
</style>

