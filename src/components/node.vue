
<template>
  <div class="aboutus">
      <div class="top-pic">
        <h1>about us</h1>
      </div>
      <div class="inner">
          {{nid}}
          <div class="atext">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'node',
    data(){
        return {
            nid: this.$route.params.nid,
        }
    },
    //http://civil808.com/latin/latin_news/19310?hash=21567cb05bd1fa6fa9d20ea55b4f26b6f90446f7726bc305dbc2c9f7c2fcf054
}
</script>

<style scoped>

</style>
