<template>
  <div style="padding-top: 15px;">
    <div class="md-layout" style="align-items: flex-start; padding: 0 0 30px 15px;">
        <filters class="md-layout-item md-size-20" style="padding: 0 15px;"/>
        <NodeList class="md-card md-theme-default md-layout-item md-size-80"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import NodeList from '@/components/allContents/NodeList'
import filters from '@/components/allContents/filters'

export default {
  name: 'allContents',
  components: {
    NodeList,
    filters
  },
}
</script>

<style lang="scss">
    .inner{
        max-width: 1100px;
        margin: auto;
    }
    header#header{
      box-shadow: 0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12) !important;
    }
</style>

