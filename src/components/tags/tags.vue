<template>
  <div class="md-layout container tags">

    <div class="loading" v-if="loading.page" style="width: 100%;">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    
    <md-card class="title md-layout-item md-size-100">

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
            <p v-if="image != ''" class="seperator"></p>
            <div>
                <img :src="image | createlink" v-if="image != ''" style="display: block;margin: auto;padding: 15px;">
                <article class="md-layout-item md-size-100"
                    v-if="description != ''"
                    v-html="convertDomain(description)"
                    :class="(windowWidth < 600 && collapse) ? 'mobile':''"
                ></article>
                <md-button 
                    v-if="windowWidth < 600 && description != ''"
                    @click="collapse = !collapse" 
                    v-html="collapse? 'More':'Less'" 
                    class="show-more"
                    :class="collapse? 'More':'Less'"></md-button>
            </div>
        </md-card-content>
    </md-card>

    <div class="md-size-100 md-layout-item">
        <NodeList 
            :filterEnabled="false" 
            :router="'allContents'" 
            :tag="tid" 
            class="md-card md-theme-default md-layout-item md-size-80 md-medium-size-100"
            />
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
        bookmarked: false,
        windowWidth: 0,
        collapse: true
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
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth
            });
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
                action : this.bookmarked? "unflag": "flag",
                type : "taxonomy"
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-Token' : this.getCookie("token")
                }
            })
            .then((data) => {
                this.loading.bookmark = false
                this.bookmarked = !this.bookmarked
            })
        } else{
            this.loading.bookmark = false
            this.$router.push({ name: 'login', query: { callback: `/tag/${this.tid}/${this.replaceUrlSpace(this.name)}` }})
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
@import "../../assets/vars.scss";

.tags {
    text-align: left;
    > .md-size-100{
        margin: 15px auto !important;
        max-width: calc(100% - 30px);
        min-width: inherit;
        &.md-card{padding: 15px !important;}
        @media #{$x840}{
            padding: 0px;
            margin: 0 !important;
            max-width: 100% !important;
            box-shadow: none;
        }
    }
    .title .md-card-content{
        border-top: solid #eee;
        border-width: 1px 0;
        @media #{$x840}{padding: 0;}
        .seperator{
            border-top: 1px solid rgb(238, 238, 238);
            margin-top: 0;
            @media #{$m840}{
                width: calc(100% + 30px);
                margin-left: -15px;
                margin-top: 15px;
            }
        }
    }
    .md-headline{
        padding: 35px 0;
        margin: 0 !important;
        position: relative;
        text-align: left;
        @include before("", inherit, '', #ddd);
        &:before {@include absolute(100%, 1px, 53px);}
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
}
article {
	padding: 15px;
	font-size: 1.1em;
    line-height: 1.75em;
    transition: all .5s ease;
	max-height: 1000vh;
    overflow: hidden;
    &.mobile {
        max-height: 50vh;
    }
}
.show-more {
	margin: -20px 0 0 0;
	background: linear-gradient(rgba(255, 255, 255, 0.5), white 50%);
    height: 70px;
    @include absolute(100%,'','',0,0);
    &.Less{
        margin-top: 0;
        height: 50px;
        position: relative;
    }
}
.top_header {
    @include flex('',center,space-between);
    min-height: 100px;
    .tags &{
        h1{
            line-height: 1.75em;
            margin: 0;
            &:before {
                content: "#";
                margin: 0 10px 0 0;
                font-weight: normal;
            }
            @media #{$x600}{font-size: 1.5em;}
        }
    }
    .follow {
        width: 110px;
        border: 1px solid currentColor;
        border-radius: 30px;
        color: #2196f3 !important;
        height: 44px;
        cursor: pointer;
        transition: all 0.2s;
        @media #{$x600}{
            margin: 0;
            width: 80px;
            height: 38px;
        }
        &.bookmarked {
            color: #555 !important;
            border-color: #aaa;
        }
        .md-progress-spinner{
            vertical-align: middle;
            position: absolute;
            left: -25px;
            circle {stroke: #2196F3 !important;}
        }
    }
}
.tags .md-layout-item.contents{
    margin: 0px auto 50px !important;
    @media #{$x1024}{
        min-width: 100%;
        max-width: 100%;
        -webkit-box-flex: 1;
        flex: 1 1 100%;
    }
    @media #{$x840}{
        margin-bottom: 0 !important;
        background: #fcfcfc;
        padding: 0 !important;
        > .md-layout{margin: 0 !important;}
        .control-box {
            padding: 25px;
            background: #f5f5f5;
            hr {display: none;}
        }
        .content-teaser{
            width: 94%;
            flex: 0 1 92%;
            margin: 4% auto;
            position: relative;
            .md-card {
                box-shadow: none !important;
                background: transparent !important;
            }
            &:not(:last-child):after {
                content: "";
                background: #ccc;
                @include absolute(45%, 1px, '','',-4vw);
            }
            .content-subheader {
                font-size: 16px;
                opacity: 0.7;
                @media #{$x400}{
                    font-size: 12px;
	                margin: 0;
                }
            }
        }
        .md-ripple {display: flex;}
        .md-card-media {
            width: 26%;
            &:before {padding-top: 67%;}
            img {width: 100% !important;}
        }
        .md-card-header {
            width: 74%;
            padding: 0 1% 0 5% !important;
            margin: 0 !important;
            @include flex(column-reverse, '', space-between);
            @media #{$x400}{
                .md-title.content-title {
                    font-size: 15px !important;
                    line-height: 1.75em;
                    max-height: 3.5em !important;
                    margin-bottom: 5px;
                }
            }
        }
    }
}
@media #{$x400}{
.md-card-content img, article {
	padding: 0 !important;
}
}
</style>

