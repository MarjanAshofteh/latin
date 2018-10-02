<template>
  <div class="md-layout md-content" style="text-align: left;">
    <div class="loading" v-if="loading">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    
    <md-card class="md-layout-item md-size-95 pad-15" style="margin: 15px auto;"><md-card-content>
        <div class="top_header md-layout-item md-size-100 pad-15">
            <h1>{{name}}</h1>
        </div>
        <article class="md-layout-item md-size-100 pad-15"
            v-html="description"
        ></article></md-card-content>
    </md-card>

    <div class="md-layout-item md-size-100 pad-15 md-layout">
        <div class="md-headline md-layout-item md-size-100" style="padding: 35px 25px 15px 25px;">
            <h5>Articles</h5>
        </div>
        <NodeTeaser v-for="content in articles" :key="content.nid"
            :title="content.title" 
            :pic="content.picture"
            :nid="content.nid"
            :date="content.created"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NodeList from '@/components/allContents/NodeList'
import filters from '@/components/allContents/filters'
import NodeTeaser from '@/components/allContents/NodeTeaser'

export default {
    name: 'tags',
    data(){
      return {
        tid: this.$route.params.tid,
        name: this.$route.params.tname,
        loading:true,
        description: '',
        errors:'',
        showError:false,
        articles: [],
      }
    },
    mounted(){
        axios.get('http://api.ed808.com/latin/tag/'+ this.tid + '/contents')
        .then((data) => data.data)
        .then((data) => {
            console.log(data)
            this.name = data.tag.name
            this.description = data.tag.description
            this.articles = data.contents.article

            this.loading = false
        })
    },
    components: {
        NodeList,
        filters,
        NodeTeaser
    },
}
</script>

<style lang="scss">
.pad-15{
    padding: 15px;
}
.md-headline{
	padding: 35px 0;
	margin: 0 !important;
	position: relative;
  text-align: left;
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    background: #ddd;
    position: absolute;
    top: 53px;
  }
  h5{
    margin: 0;
    font-weight: normal;
    display: inline-block;
    background: #fafafa;
    z-index: 1;
    position: relative;
    padding-right: 15px;
  }
}
</style>

