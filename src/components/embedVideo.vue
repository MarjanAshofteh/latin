<template>
  <div class="video_player">
    <youtube :video-id="videoId" player-width="840" player-height="472.5" class="video_inside"></youtube>
  </div>
</template>

<script>
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

export default {
  name:'embedVideo',
  props:['url'],
  data(){
    return{
      videoId:''
    }
  },
  mounted(){
    this.method(this.url)
  },
  methods: {
    method(url) {
      this.videoId = this.$youtube.getIdFromURL(url)
    }
  }
}
</script>

<style lang="scss">
  .video_player{
    margin:50px 0 50px 0;
    iframe {
      height:475px !important;
    }
    .video_inside{
      background-color: #f6f6f6;
      min-height: 200px;
      max-width: 840px;
      display: block;
      margin: 0 auto;
      border: 1px solid #eee; 
    }
  }
</style>

