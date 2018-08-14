<template>
  <div>
    <div class="md-layout" style="align-items: flex-start; padding: 0 0 30px 15px;">
        <filters class="md-layout-item md-size-20" style="padding: 0 15px;"/>
        <contents class="md-card md-theme-default md-layout-item md-size-80"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import contents from '@/components/allContents/contentsList'
import filters from '@/components/allContents/filters'

export default {
  name: 'home',
  props: ['name'],
  components: {
    contents,
    filters
  },
}
</script>

<style lang="scss">
    .inner{
        max-width: 1100px;
        margin: auto;
    }
</style>

