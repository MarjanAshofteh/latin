<template>
  <div class="md-layout container tags">

    <div class="loading" v-if="loading.page" style="width: 100%;">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    
    <md-card class="title md-layout-item md-size-100 pad-15">

        <breadcrumb :links="[{url:'/tag/'+ tid +'/'+ name, title: 'Tag: '+ name}]"></breadcrumb>
        
        <md-card-content>
            <div class="top_header md-layout-item md-size-100">
                <h1>{{name}}</h1>

                <md-button class="follow" :class="bookmarked? 'bookmarked': ''" @click="follow()">
                    <md-progress-spinner 
                        :md-diameter="15" 
                        :md-stroke="2" 
                        v-if="loading.bookmark"
                        class="md-primary"
                        md-mode="indeterminate">
                    </md-progress-spinner>
                    {{bookmarked? 'Following': 'Follow'}}
                </md-button>
            </div>
            <p v-if="image != ''" style="border-top: 1px solid #eee;width: calc(100% + 30px);margin-left: -15px;"></p>
            <div>
                <img :src="image | createlink" v-if="image != ''" style="display: block;margin: auto;padding: 15px;">
                <article class="md-layout-item md-size-100"
                    v-html="convertDomain(description)"
                ></article>
            </div>
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
import { cookie } from '@/components/mixins/cookie.js'

export default {
    name: 'tags',
    mixins:[cookie],
    components: {
        NodeList,
        breadcrumb
    },
    data(){
      return {
        tid: this.$route.params.tid,
        name: this.$route.params.tname,
        image: '',
        description: '',
        loading: {page: true, bookmark: false},
        errors:'',
        showError:false,
        bookmarked: false
      }
    },
    mounted(){
        axios.get('http://api.ed808.com/latin/tag/'+ this.tid + '/contents')
        .then((data) => data.data)
        .then((data) => {
            this.name = data.name
            this.description = data.description
            this.image = data.tag_image != null ? data.tag_image : ''
            this.bookmarked = data.user_bookmark
            if(this.name != this.replaceUrlSpace(this.$route.params.tname, true)){
                this.$router.replace({path:`/tag/${this.tid}/${this.replaceUrlSpace(this.name)}`})
            }
            this.loading.page = false
        })
    },
    methods:{
      convertDomain(value){ 
        String.prototype.replaceAll = function(search, replacement) {
          var target = this;
          return target.replace(new RegExp(search, 'g'), replacement);
        };
        return value != null ? value.replaceAll('href="http://api.ed808.com', 'href="http://ed808.com')
        .replaceAll('="/sites', '="http://api.ed808.com/sites')
        .replaceAll('="/node', '="http://ed808.com/node') : ''
      },
      replaceUrlSpace(value, reverse){
        if(reverse == undefined) reverse = false
        String.prototype.replaceAll = function(search, replacement) {
          return this.replace(new RegExp(search, 'g'), replacement)
        };
        return value != null ? (reverse==false ? value.replaceAll(' ', '-'): value.replaceAll('-', ' ')) : ''
      },
      follow(){
        this.loading.bookmark = true
        if(this.getCookie("token") != null){
            axios.defaults.crossDomain = true;
            axios.defaults.withCredentials  = true;
            axios.post('http://api.ed808.com/latin/flag',
            {
                entity_id : this.tid,
                action : "flag",
                type : "taxonomy"
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-Token' : this.getCookie("token")
                }
            })
            .then((data) => data.data)
            .then((data) => {
                this.loading.bookmark = false
            })
        } else{
            this.loading.bookmark = false
        }
      }
    },
    filters: {
      createlink: function (value) {
        return value != null? "http://api.ed808.com/sites/default/files/" + value.substring(9) : ''
      },
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
.top_header {
    display: flex;
	justify-content: space-between;
	align-items: center;
    .tags &{
        h1:before {
            content: "#";
            margin: 0 10px 0 0;
            font-weight: normal;
        }
    }
    .follow {
        width: 120px;
        border: 1px solid #2196F3;
        border-radius: 30px;
        color: #2196f3 !important;
        height: 44px;
        cursor: pointer;
        transition: all 0.2s;
        &.bookmarked {
            color: #aaa;
            border-color: #aaa;
        }
        .md-progress-spinner{
            vertical-align: middle;
            position: absolute;
            left: -25px;
            circle {
                stroke: #2196F3 !important;
            }
        }
    }
}
</style>

