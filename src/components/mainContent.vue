
<template>
  <div>
    <md-content>
      <h1>{{title}}</h1>
      <img :src="picture | createlink" :alt="title">
      <br>
      <br>
      <article v-html="body"></article>
      <div class="refrence" v-for="(refrence , index) in references" :key="index">
        <a :href="refrence" target="_blank" rel="nofollow"><h4>Refrence</h4></a>
        <span v-if="index > 0">,</span>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'mainContent',
  props: ['title','body','picture','references'],
  filters: {
    createlink: function (value) {
        if (!value) return ''
        return "http://api.ed808.com/sites/default/files/" + value.substring(9)
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin main-center-content(){
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
  }
  h1{
    padding: 40px 0 20px 0;
  }
  .md-elevation-1{
    padding: 25px 10px;
  }
  article{
    @include main-center-content();
    font-size: 21px;
    line-height: 33px;
    font-family: Merriweather;
    letter-spacing: 0.3px;
  }
  .refrence{
    @include main-center-content();
  }
</style>
