<template>
  <div>
    <div class="player-template-rootnode">
      <div class="meta-artist">
          <span class="the-artist"></span>
          <span class="the-name"></span>
      </div>

      <div id="waveform"></div>

      <div class="controls">
        <div class="download_btn">
          <a :href="src" target="_self" download="mp3file">
            <md-icon>cloud_download</md-icon>
          </a>
        </div>
        <div class="play-pause-btn play" v-if="layout == 'modal'"  v-on:click="togglePlayPause($event)">
          <md-icon v-if="currentlyplay" class="md-size-2x md-primary">pause_circle_filled</md-icon>
          <md-icon v-else class="md-size-2x md-primary" aria-hidden="true">play_circle_filled</md-icon>
        </div>
      </div>
      <!--<div class="playlist" v-for="(source , index) in sources" :key="index">
          <div class="demo-song" v-bind:class="{active: source.isActive}">
              <div class="demo-title"><b>{{source.title}}</b></div>
              <div class="artist-name">{{source.name}}</div>
              <div class="demo-src">{{source.src}}</div>
              <div class="demo-desc"></div>
          </div>
      </div>-->
    </div>
  </div>
</template>


<script>
export default {
  name:'wavesurferPlayer',
  props: ['layout','src'],
  data(){
    return {
      sources : [
        {
          name: "Sample_Magic",
          title: "Prophet",
          src: this.src,
          isActive: true
        }
      ],
      wavesurfer:{},
      currentlyplay:false
    }
  },
  methods:{
    initWaveSurf : function(self){
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barWidth: 1,
        height:120,
        waveColor: '#262626',
        progressColor: '#2ddcb4'
      })
      this.wavesurfer.load(this.sources[0].src)
      this.indexPlaying = 0
    },
    addWaveSurfListeners: function(){
      var me = this
      this.wavesurfer.on('ready', function () {
        console.log('wavesurfer ready to surf')
        me.wavesurfer.play()
      });
      this.wavesurfer.on('finish', function () {
        console.log('wavesurfer finished a run')
        me.playNext()
      });
    },
    getSurfer : function(){
      return this.wavesurfer
    },
    play: function(){
      console.log('play methode raised in component')
      this.wavesurfer.play()
    },
    pause: function(){
      console.log('pause methode raised in component')
      this.wavesurfer.pause();
    },
    playNext: function(){
      if(this.indexPlaying < this.sources.length - 1){
          this.indexPlaying += 1;
          this.wavesurfer.load(this.sources[this.indexPlaying].src)
      }else{
          this.indexPlaying = 0
          this.wavesurfer.load(this.sources[0].src)
      }
      console.log('try play but maybe didn t finish to load?')
      //this.play();
    },
    playPrev: function(){
      if(this.indexPlaying > 0){
          this.indexPlaying -= 1
          this.wavesurfer.load(this.sources[this.indexPlaying].src)
      }else{
          this.indexPlaying = 0
          this.wavesurfer.load(this.sources[0].src)
      }
      console.log('try play but maybe didn t finish to load?')
      //this.play();
    },
    togglePlayPause: function(event){
      console.log('titi');
      if($(event.currentTarget).hasClass('play')){
        console.log('play')
        this.play();
        $(event.currentTarget).removeClass('play')
        $(event.currentTarget).addClass('pause')
        this.currentlyplay = true
      }else{
        console.log('pause');
        this.pause();
        $(event.currentTarget).removeClass('pause')
        $(event.currentTarget).addClass('play')
        this.currentlyplay = false
      }
    }
  },
  mounted(){
    console.log("wavesurferlayer component mounted");
    console.log(this);
    this.initWaveSurf(this);
    //this.addWaveSurfListeners();
  }
}

 //})
/*import Aplayer from 'vue-aplayer'

export default {
  name:'embedAudio',
  props:['src'],
  components:{
    Aplayer
  },
  computed:{
    music(){
      var param = {
        title: 'you are the best',
        artist: 'Silent Siren',
        src : this.src,
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
      }
      //JSON.stringify(param)
      return param
    }
  }
}*/
</script>

<style lang="scss">

.fa-circle-thin:before {
  content: "\f1db";
}
.btn-prev, .btn-next, .play-pause-btn {
  display: inline-block;
}
.fa-backward{
  margin-left: 0.4em;
  margin-top: 0.1em;
}
.fa-forward{
  margin-left: 0.6em;
  margin-top: 0.1em;
}
.fa-play{
  margin-left: 0.7em;
  margin-top: 0.1em;
}
.playlist{
  .demo-song{
    background-color: #444444;
    color: #fff;
    padding:1em;
  }
  .demo-song.active{
    background-color: #222222;
  }
}
canvas {
  max-width: initial !important;
}

.controls{
  border-top: 1px solid #eee;
  padding: 20px 0 0 0;
  margin: 15px auto 0 auto;
  justify-content: center;
  .download_btn{
    float: left;
    margin: 8px 0 0 9px;
    i{
      width: 30px;
      max-width: 30px;
      font-size: 30px !important;
      height: 30px;
    }
  }
  div{
    margin: 0 10px;
    cursor: pointer;
    a{
      text-decoration: none !important;
    }
  }
}

</style>

