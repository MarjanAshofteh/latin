<template>
  <div style="padding-top: 15px;">
    <div class="md-layout" style="align-items: flex-start; padding: 0 0 30px 15px;">
        <filters class="md-layout-item md-size-20" style="padding: 0px 15px 0 0;"/>
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
<<<<<<< HEAD
.inner{
  max-width: 1100px;
  margin: auto;
}
header#header{
  box-shadow: 0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12) !important;
  .inner {
    max-width: none;
    padding: 0 15px;
  }
}
=======
    .inner{
        max-width: 1100px;
        margin: auto;
    }
    header#header{
      box-shadow: 0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12) !important;
    }
>>>>>>> 728118bb9497a54270df9fbe4c2f123f15d9608a
</style>

