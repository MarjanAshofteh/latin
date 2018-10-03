<template>
  <div class="md-layout container tags">

    <div class="loading" v-if="loading" style="width: 100%;">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    
    <md-card class="title md-layout-item md-size-100 pad-15">
        <breadcrumb :links="[{url:'/tags/'+ tid +'/'+ name, title: 'tag: '+ name}]"></breadcrumb>
        <md-card-content>
            <div class="top_header md-layout-item md-size-100">
                <h1>{{name}}</h1>
            </div>
            <article class="md-layout-item md-size-100"
                v-html="convertDomain(description)"
            ></article>
        </md-card-content>
    </md-card>

    <div class="md-size-100 md-layout-item">
        <NodeList :filterEnabled="false" :router="'allContents'" :tag="tid" class="md-card md-theme-default md-layout-item md-size-80"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import NodeList from '@/components/allContents/NodeList'
import breadcrumb from '@/components/fields/breadcrumb'

export default {
    name: 'tags',
    components: {
        NodeList,
        breadcrumb
    },
    data(){
      return {
        tid: this.$route.params.tid,
        name: this.$route.params.tname,
        description: '',
        loading:true,
        errors:'',
        showError:false,
      }
    },
    mounted(){
        axios.get('http://api.ed808.com/latin/tag/'+ this.tid + '/contents')
        .then((data) => data.data)
        .then((data) => {
            this.name = data.name
            this.description = data.description
            this.loading = false
        })
    },
    methods:{
      convertDomain(value){ 
        String.prototype.replaceAll = function(search, replacement) {
          var target = this;
          return target.replace(new RegExp(search, 'g'), replacement);
        };
        return value.replaceAll('href="http://api.ed808.com', 'href="http://ed808.com')
        .replaceAll('="/sites', '="http://api.ed808.com/sites')
        .replaceAll('="/node', '="http://ed808.com/node')
      }
    }
}
</script>

<style lang="scss">
.pad-15{
    padding: 15px;
}
.container.tags {
    text-align: left;
    > .md-size-100{
        margin: 15px auto !important;
        max-width: calc(100% - 30px);
        min-width: inherit;
    }
}
.tags .title .md-card-content{
    border-top: solid #eee;
    border-width: 1px 0;
}
.tags .md-headline{
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

