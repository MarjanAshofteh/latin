<template>
  <router-link 
    :to="'/tags/'+ tid +'/'+ name" 
    target="_blank" 
    :title="name">
    <md-button class="md-raised">{{name}}</md-button>
  </router-link>
</template>

<script>
export default {
  name: 'tag',
  props: ['name', 'tid'],
}
</script>

<style lang="scss" scoped>
</style>
