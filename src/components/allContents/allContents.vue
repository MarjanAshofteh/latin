<template>
  <div style="padding-top: 15px;">
    <div class="md-layout" style="align-items: flex-start; padding: 0 0 30px 15px;">
        <filters class="md-layout-item md-size-20" style="padding: 0px 15px 0 0;"/>
        <NodeList :filterEnabled="true" :router="'allContents'" class="md-card md-theme-default md-layout-item md-size-80"/>
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
  metaInfo(){
    return{
      title: 'All content',
      meta: [
        // OpenGraph data (Most widely used)
        {
          'property': 'og:title',
          'content': this.title,
          'template': '%s - ed808',
          'vmid': 'og:title'
        },
        {property: 'og:url', content: 'http://ed808.com/contents', vmid: 'og:url'},
        {
          'name': 'twitter:title',
          'content': this.title,
          'template': '%s - ed808',
          'vmid': 'twitter:title'
        },
        // Google / Schema.org markup:
        {
          'itemprop': 'name',
          'content': this.title,
          'template': '%s - ed808',
          'vmid': 'name'
        },
      ],
      links: [
        {rel: 'canonical', href: 'http://ed808.com/contents'}
      ]
    }
  }
}
</script>

<style lang="scss">

</style>

