<template>
  <div style="padding-top: 15px;">
      {{tid}},{{tname}}
    <div class="md-layout" style="align-items: flex-start; padding: 0 0 30px 15px;">
        <filters class="md-layout-item md-size-20" style="padding: 0px 15px 0 0;"/>
        <NodeList :filterEnabled="true" class="md-card md-theme-default md-layout-item md-size-80"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import NodeList from '@/components/allContents/NodeList'
import filters from '@/components/allContents/filters'

export default {
    name: 'tags',
    data(){
      return {
        tid: this.$route.params.tid,
        tname: this.$route.params.tname,
        loading:true,
        errors:'',
        showError:false
      }
    },
  components: {
    NodeList,
    filters
  },
}
</script>

<style lang="scss">

</style>
