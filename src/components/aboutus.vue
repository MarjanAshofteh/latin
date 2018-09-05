
<template>
  <div class="aboutus">
    <div class="top-pic">
      <img :src="pic | createlink" width="100%" height="241">
      <h1>about us</h1>
    </div>
    <div class="inner">
      <div class="atext" v-html="text">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'aboutus',
    data(){
      return{
        text:'',
        pic:''
      }
    },
    mounted(){
      axios.get('http://api.ed808.com/latin/page?args=about_us',
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((data) => {
        this.text = data.data.body
        this.pic = data.data.image
      })
      .catch(e => {

      });
    },
    filters:{
      createlink: function (value) {
        if (!value) return ''
        return "http://ed808.com/api/sites/default/files/" + value.substring(9)
      }
    }
  }
</script>

<style scoped lang="scss">
  .atext{
    margin: 50px 0;
    text-align:left;
  }
  
  .inner{
    padding: 0 36px;
  }
  .top-pic{
    height: 241px;
    position: relative;
    margin-top: 90px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: '';
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background-color: #0000005e;
      z-index: 1;
    }
    img{
      min-width: 100%;
      min-height: 100%;
      max-width: none;
      width: auto;
      position: absolute;
      z-index: 0;
    }
    h1{
      text-shadow: 0px -1px 5px #000000, 0 -1px 0px #000000;
      color: white;
      position: relative;
      font-size: 35px;
      z-index: 2;
    }
  }
</style>
