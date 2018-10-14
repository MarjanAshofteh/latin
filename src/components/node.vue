
<template>
  <div :class="'main-container node_type_' + types[0]">
    <div class="loading" v-if="loading">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    <!--<a 
      :href="'http://api.ed808.com/node/' + nid + '/edit'" 
      target="_blank"
      >
      <md-icon class="md-size-2x edit_link">edit</md-icon>
    </a>-->
    <div class="top_header">
      <h1 
        v-if="node_content.hasOwnProperty('title')">{{node_content.title}}
      </h1>
      <div 
        class="date_and_category" 
        v-if="!types.includes('event')">
        <span 
          v-if="node_content.hasOwnProperty('created')"
        >
          {{node_content.created}}
        </span>
        <router-link 
          v-if="node_content.hasOwnProperty('topic') && (node_content.topic.length != 0)" 
          :to="'/contents?topic='+ node_content.topic[0].tid" 
          target="_blank" :title="node_content.topic[0].name">
          {{node_content.topic[0].name}}
        </router-link>
      </div>
      <eventData v-if="types.includes('event')"
        :date="node_content.event_time"
        :time="node_content.time_and_duration"
        :organizer="node_content.company"
        :place="node_content.event_place"
        :webinar_covered="node_content.ifwebinar"
        :registration_link="node_content.registration_link"
      />
    </div>
    <md-content class="node_body">
      <!--<div 
      v-if="types.includes('podcast') && node_content.hasOwnProperty('files') && (node_content.files.length != 0)" id="audio-demos-vuejs">
        <wavesurferPlayer 
          layout="modal"
          :src="node_content.files[0] | createlink"
          >
        </wavesurferPlayer>
      </div>-->

      <embedVideo 
        v-if="types.includes('video') && node_content.hasOwnProperty('video_link') && (node_content.video_link != null)"
        :url="node_content.video_link"
      />
      <img 
        v-if="node_content.hasOwnProperty('image') && (node_content.image != null)" 
        :src="createlink(node_content.image)" 
        :alt="node_content.title"
      >
      <article 
        v-if="node_content.hasOwnProperty('body_value') && (node_content.body_value != null)" 
        v-html="convertDomain(node_content.body_value)"
      ></article>
      <div 
        v-if="node_content.hasOwnProperty('references') && (node_content.references.length != 0)" 
        class="reference" 
        v-for="(reference , index) in node_content.references" 
        :key="index"
      >
        <h3>Reference: </h3>
        <a 
          :href="reference" 
          target="_blank" 
          rel="nofollow"
        >
          {{reference}}
        </a>
        <span v-if="index > 0">,</span>
      </div>
    </md-content>
    <div 
      class="tags" 
      v-if="node_content.hasOwnProperty('tags') && (node_content.tags.length != 0)"
      >
      <tag 
        v-for="(tag , index) in node_content.tags" 
        :key="index" 
        :name="tag.name"
        :tid="tag.tid"
      />
    </div>
    <!--<author
      :uid="author.uid"
      :name="author.full_name"
      :picture="author.picture"
      :about_me="author.about_me"
    />-->
    <md-snackbar 
      class="error" 
      :md-active.sync="showError"
    >
      {{ errors }}
    </md-snackbar>
  </div>
</template>

<script>
  import eventData from '@/components/fields/eventData'
  import author from '@/components/fields/author'
  import tag from '@/components/fields/tag'
  import axios from 'axios'
  export default {
    name: 'node',
    data(){
      return {
        nid: this.$route.params.nid,
        node_content:{},
        author:{},
        loading:true,
        types:[],
        errors:'',
        showError:false
      }
    },
    components: {
      eventData,
      author,
      tag,
      embedVideo: () => import('@/components/fields/embedVideo')
    },
    mounted(){
      axios.get('http://api.ed808.com/latin/latin_contents/'+ this.nid + '?parameter[hash]=f275ebb87f408796b11f651b929293edf639554efb9e014c53c8b8d8e0f9db45',
      {
        headers:{
        'Content-type': 'application/json'
        }
      })
      .then((data) => {
        this.node_content = data.data.content
        this.author = data.data.author
      })
      .then((data) => {
        this.loading = false
        this.type()
      })
      .catch(e => {
        if(e.hasOwnProperty('response') && e.response.hasOwnProperty('statusText')){
          this.errors = e.response.statusText
          this.showError = true
          this.$router.push('/')
        }  
      });
    },
    methods:{
      type(){
        this.types = []
        if(this.node_content.hasOwnProperty('type') && (this.node_content.type.length != 0)){
          this.node_content.type.forEach(element => {
            if(element.tid == 4058)
              this.types.push('event')
            if(element.tid == 3938)
              this.types.push('podcast')
            if(element.tid == 3941)
              this.types.push('video')
          });
        }
      },
      convertDomain(value){
        //this work but its performance is slow
        /* return value.split('="/sites').join('="http://api.ed808.com/sites') */ 
        String.prototype.replaceAll = function(search, replacement) {
          var target = this;
          return target.replace(new RegExp(search, 'g'), replacement);
        };
        return value.replaceAll('href="http://api.ed808.com', 'href="http://ed808.com')
        .replaceAll('="/sites', '="http://api.ed808.com/sites')
        .replaceAll('="/node', '="http://ed808.com/node')
      },
      createlink: function (value) {
        if (!value) return ''
        return "http://api.ed808.com/sites/default/files/" + value.substring(9)
      }
    },
    metaInfo(){
      return{
        title: this.node_content.title,
        meta: [
          {name: 'description', content: this.node_content.meta_description, vmid: 'description'},

          // OpenGraph data (Most widely used)
          {
            'property': 'og:title',
            'content': this.node_content.title,
            'template': '%s - ed808',
            'vmid': 'og:title'
          },
          {property: 'og:type', content: 'article', vmid: 'og:type'},
          {property: 'og:url', content: 'http://ed808.com/node/' + this.$route.params.nid, vmid: 'og:url'},
          {property: 'og:image', content: this.createlink(this.node_content.image), vmid: 'og:image'},
          {property: 'og:description', content: this.node_content.meta_description, vmid: 'og:description'},

          // Twitter card
          {
            'name': 'twitter:title',
            'content': this.node_content.title,
            'template': '%s - ed808',
            'vmid': 'twitter:title'
          },
          {name: 'twitter:description', content: this.node_content.meta_description, vmid: 'twitter:description'},
          {name: 'twitter:image:src', content: this.createlink(this.node_content.image), vmid: 'twitter:image:src'},

          // Google / Schema.org markup:
          {
            'itemprop': 'name',
            'content': this.node_content.title,
            'template': '%s - ed808',
            'vmid': 'name'
          },
          {itemprop: 'description', content: this.node_content.meta_description, vmid: 'description'},
          {itemprop: 'image', content: this.createlink(this.node_content.image), vmid: 'image'}
        ],
        links: [
          {rel: 'canonical', href:'http://ed808.com/node/' + this.$route.params.nid}
        ]
      }
    }
  }
</script>

<style lang="scss">
  @mixin main-center-content() {
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
    padding: 0 15px;
  }
  body {
    background-color: white !important;
  }
  .main-container {
    margin-bottom: 50px;
    padding: 0px 0 15px 0;
    .loading {
      position: absolute;
      width: 100%;
      height: 5px;
      left: 0;
      top: 90px;
      background: #fff;
      z-index: 3;
    }
    .edit_link {
      position: absolute;
      top: 78px ;
      left: 25px;
    }
    .top_header {
      min-height: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(to right, #eee, #f9f9f9);
      flex-direction: column;
      position: relative;
      h1 {
        font-family: sans-serif;
        color: black;
        margin-bottom: 30px !important;
        line-height: 43px;
        padding: 0 10px;
        @media all and (max-width: 600px){
          font-size: 24px;
          line-height: 30px;
        }
      }
      > .date_and_category {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        position: absolute;
        bottom: 13px;
        @media all and (max-width: 768px){
          flex-direction: column;
          margin: 10px;
          height: 49px;
          position: relative;
        }
        a {
          color: #0000008a !important;
          font-size: 17px;
          @media all and (max-width: 768px){
            padding-top: 10px;
          }
        }
        span {
          //color: #ccc !important;
          color: #0000008a !important;
          font-size: 15px;
        }
      }
    }
    .node_body{
      > img{
        margin: 25px 0px 0px 0px;
        max-width: 100%;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        /* border: 1px solid #eee; */
      }
      article {
        @include main-center-content();
        font-size: 18px;
        line-height: 33px;
        letter-spacing: 0.3px;
        margin-top: 30px !important;  
        p {
          margin: 0 0 10px 0;
        }
        h2 {
          font-size: 22px;
          margin: 35px 0 11px 0;
          line-height: 40px;
        }
        h3 {
          font-size: 20px;
          margin: 24px 0 12px 0;
          line-height: 38px;
        }
        h4 {
          font-size: 19px;
          margin: 18px 0 12px 0;
          line-height: 36px;
        }
        h5,h6 {
          font-size: 18px;
          margin: 18px 0 12px 0;
          line-height: 33px;
        }
        img{
          display: block;
          margin: 40px auto;
        }
        .picture_info{
          text-align: center;
          margin: -29px 0 40px 0;
          font-size: 15px;
        }
        .boldCenter_line {
          display: inline-block;
          width: 100%;
          text-align: center !important;
          padding: 20px 0;
          background: rgb(252, 252, 252);
          border: 1px solid #f0f1f2;
          margin: 15px 0 !important;
          a{
            display: inline-block;
            width: 100%;
            text-align: center;
          }
        }
      }
      &:before {
        content: "";
        display: table;
        width: 0;
        height: 0;
      }
    }
    .tags {
      @include main-center-content();
      margin: 20px auto 20px auto !important;
      button {
        border: none;
        color: rgba(0,0,0,.68) !important;
        background: rgba(0,0,0,.05) !important;
        box-shadow: none !important;
        text-transform: unset !important;
        margin: 6px 8px 6px 0px !important;
      }
    }
    .reference {
      @include main-center-content();
      h3{
        display: inline;
      }
    }
  }
  .md-snackbar.error{
    background-color: #F44336;
  }
  .node_type_event {
    .top_header {
      height: 300px !important;
      justify-content: center;
      margin-bottom: 110px; 
    }
  }
  .node_type_video {
    .node_body > img{
      display: none;
    }
  }
  #audio-demos-vuejs {
    margin: 45px auto 30px auto;
    padding: 0 10%;
    > div {
      /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);*/
      padding: 20px 15px;
      border: 1px solid #eee;
      border-radius: 20px;
    }
  }
</style>
