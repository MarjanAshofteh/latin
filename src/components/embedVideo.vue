<template>
  <div class="video_player">
    <youtube :video-id="videoId" player-width="840" player-height="472.5"></youtube>
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
  }
</style>

