
<template>
  <div class="main-container">
    <div class="loading" v-if="loading">
      <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
    </div>
    <a :href="'http://api.ed808.com/node/' + nid + '/edit'" target="_blank">
      <md-icon class="md-size-2x edit_link">edit</md-icon>
    </a>
    <mainContent
      :title="node_content.title"
      :body="node_content.body_value"
      :picture="node_content.image"
      :references="node_content.references"
    />
    <eventData
      :date="node_content.event_time"
      :time="node_content.time_and_duration"
      :organizer="node_content.company"
      :place="node_content.event_place"
      :webinar_covered="node_content.ifwebinar"
      :registration_link="node_content.registration_link"
    />
    <div class="tags" >
      <span v-for="(tag , index) in node_content.tags" :key="index">
        <tag :name="tag.name" />
      </span>
    </div>
    <author
      :uid="author.uid"
      :name="author.full_name"
      :picture="author.picture"
      :about_me="author.about_me"
    />
  </div>
</template>

<script>
import mainContent from '@/components/mainContent'
import eventData from '@/components/eventData'
import author from '@/components/author'
import tag from '@/components/tag'
import axios from 'axios'
export default {
  name: 'node',
  data(){
    return {
      nid: this.$route.params.nid,
      node_content:'',
      author:'',
      loading:true
    }
  },
  components: {
    mainContent,
    eventData,
    author,
    tag
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
      this.loading = false
    })
    .catch(e => {
      this.errors = e.response.data
    });
  }
}
</script>

<style lang="scss">
  body{
    background-color: white !important;
  }
  .main-container{
    margin: 50px auto;
    max-width: 1100px;
    padding: 15px;
  }
  .edit_link{
    position: absolute;
    top: 78px ;
    left: 25px;
  }
  @mixin main-center-content(){
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
  }
  .tags{
    @include main-center-content();
    margin: 15px auto 20px auto;
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    top: 50px;
    background: #fff;
  }
</style>
