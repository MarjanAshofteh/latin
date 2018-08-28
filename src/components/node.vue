
<template>
  <div :class="'main-container node_type_' + types[0]">
    <div class="loading" v-if="loading">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    <!--<a :href="'http://api.ed808.com/node/' + nid + '/edit'" target="_blank">
      <md-icon class="md-size-2x edit_link">edit</md-icon>
    </a>-->
    <div class="top_header">
      <h1 v-if="node_content.hasOwnProperty('title')">{{node_content.title}}</h1>
      <div class="date_and_category" v-if="!types.includes('event')">
        <span v-if="node_content.hasOwnProperty('created')">{{node_content.created}}</span>
        <a v-if="node_content.hasOwnProperty('topic') && (node_content.topic.length != 0)" :href="'http://ed808.com/tag/'+ node_content.topic[0].tid" target="_blank" :title="node_content.topic[0].name">
        {{node_content.topic[0].name}}
        </a>
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
      <div v-if="types.includes('podcast')" id="audio-demos-vuejs">
        <wavesurferPlayer layout="modal"></wavesurferPlayer>
      </div>
      <embedVideo v-if="types.includes('video') && node_content.hasOwnProperty('video_link') && (node_content.video_link != null)"
        :url="node_content.video_link"/>
      <img v-if="node_content.hasOwnProperty('image') && (node_content.image != null)" style="margin: 25px 0 0 0; max-width: 900px;" :src="node_content.image | createlink" :alt="node_content.title">
      <article v-if="node_content.hasOwnProperty('body_value') && (node_content.body_value != null)" v-html="convertDomain(node_content.body_value)"></article>
      <div 
        v-if="node_content.hasOwnProperty('references') && (node_content.references.length != 0)" class="reference" 
        v-for="(reference , index) in node_content.references" :key="index">
        <h3>Reference: </h3>
        <a :href="reference" target="_blank" rel="nofollow">{{reference}}</a>
        <span v-if="index > 0">,</span>
      </div>
    </md-content>
    <div class="tags" v-if="node_content.hasOwnProperty('tags') && (node_content.tags.length != 0)">
      <tag v-for="(tag , index) in node_content.tags" :key="index" :name="tag.name"/>
    </div>
    <!--<author
      :uid="author.uid"
      :name="author.full_name"
      :picture="author.picture"
      :about_me="author.about_me"
    />-->
    <md-snackbar class="error" :md-active.sync="showError">{{ errors }}</md-snackbar>
  </div>
</template>

<script>
import eventData from '@/components/eventData'
import author from '@/components/author'
import tag from '@/components/tag'
import embedVideo from '@/components/embedVideo'
import wavesurferPlayer from '@/components/wavesurferPlayer'
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
    embedVideo,
    wavesurferPlayer
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
      if(this.node_content.hasOwnProperty('category') && (this.node_content.category.length != 0)){
        this.node_content.category.forEach(element => {
          if(element.tid == 3929)
            this.types.push('event')
        });
      }
      if(this.node_content.hasOwnProperty('type') && (this.node_content.type.length != 0)){
        this.node_content.type.forEach(element => {
          if(element.tid == 3938)
            this.types.push('podcast')
          if(element.tid == 3941)
            this.types.push('video')
        });
      }
    },
    convertDomain(value){
      return value.replace('ed808.com', 'api.ed808.com').replace('="/sites', '="http://api.ed808.com/sites')
    }
  },
  filters: {
    createlink: function (value) {
        if (!value) return ''
        return "http://api.ed808.com/sites/default/files/" + value.substring(9)
    },
    convertDomain: function(value){
      // if (!value) return ''
      return value.replace('ed808.com', 'api.ed808.com').replace('="/sites', '="http://api.ed808.com/sites')
    },
  }
}
</script>

<style lang="scss">
  @mixin main-center-content(){
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
  }
  body{
    background-color: white !important;
  }
  .main-container{
    margin: 90px auto 50px auto;
    padding: 0px 0 15px 0;
  }
  .edit_link{
    position: absolute;
    top: 78px ;
    left: 25px;
  }
  .top_header{
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 90px 0 0 0;
    background-image: linear-gradient(to right, #eee, #f9f9f9);
    flex-direction: column;
    position: relative;
    > .date_and_category{
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      position: absolute;
      bottom: 13px;
      a{
        color: #0000008a !important;
        font-size: 17px;
      }
      span{
        //color: #ccc !important;
        color: #0000008a !important;
        font-size: 15px;
      }
    }
    
  }
  .tags{
    @include main-center-content();
    margin: 20px auto 20px auto !important;
    button{
      border: none;
      color: rgba(0,0,0,.68) !important;
      background: rgba(0,0,0,.05) !important;
      box-shadow: none !important;
      text-transform: unset !important;
      margin: 6px 8px 6px 0px !important;
    }
  }
  .node_body:before {
    content: "";
    display: table;
    width: 0;
    height: 0;
  }
  .main-container .loading {
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    top: 90px;
    background: #fff;
    z-index: 3;
  }
  h1{
    font-family: sans-serif;
    color:black;
    margin-bottom: 30px !important;
  }
  .md-elevation-1{
    padding: 25px 10px;
  }
  article{
    @include main-center-content();
    font-size: 21px;
    line-height: 33px;
    font-family: Merriweather;
    letter-spacing: 0.3px;
    margin-top: 30px !important;
  }
  .reference{
    @include main-center-content();
    h3{
      display: inline;
    }
  }
  .md-snackbar.error{
    background-color: #F44336;
  }
  .node_type_event{
    .top_header{
      height: 300px !important;
      justify-content: center;
      margin-bottom: 110px; 
    }
  }
  .node_type_video{
    .node_body > img{
      display: none;
    }
  }
  #audio-demos-vuejs{
    margin: 30px auto;
    padding: 0 30px;
  }
</style>
