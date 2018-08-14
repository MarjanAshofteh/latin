<template>
  <md-content class="author md-elevation-2">
    <div class="md-layout">
      <div class="md-layout-item md-size-15 userimage">
        <a :href="'http://ed808.com/user/'+uid" target="_blank">
          <md-avatar class="md-large">
            <img :src="picture | createlink" />
          </md-avatar>
        </a>
      </div>
      <md-content class="md-layout-item md-size-85">
        <a :href="'http://ed808.com/user/'+uid" target="_blank">
          <h4>{{name}}</h4>
        </a>
        <p>{{about_me}}</p>
      </md-content>
  </div>
  </md-content>
</template>

<script>
export default {
  name: 'author',
  props: ['uid','name','picture','about_me'],
  filters:{
    createlink: function (value) {
      if (!value) return ''
      return "http://api.ed808.com/sites/default/files/styles/200x200/public/" + value.substring(9)
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
  .author{
    @include main-center-content();
  }
  .md-layout{
    align-items: center;
  }
  .userimage{
    text-align: center;
  }
</style>
