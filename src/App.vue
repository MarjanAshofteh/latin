<template>
  <div id="app">
    <header id="header">
      <div class="inner md-layout md-gutter">
        <img src="http://civil808.com/en/staticfile/logo.png">
        <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-hide">
          <p>Educational and Engineering institute 808</p>
          <span class="md-layout-item md-small-hide">specialized training in Civil and Architecture</span>
        </div>
        <div class="header-menu md-layout-item md-size-30 md-xsmall-size-100">
          <md-menu md-direction="bottom-start">
          <md-button><router-link to="about-us">about us</router-link></md-button>
          </md-menu>
          <md-menu md-direction="bottom-start">
            <md-button><router-link to="/">Home</router-link></md-button>
          </md-menu>
          <md-menu md-direction="bottom-start">
            <md-button><router-link to="/register">register</router-link></md-button>
          </md-menu>
          <!--
          <md-menu md-direction="bottom-start">
            <md-button class="md-primary" @click="gotosubscribe()">Subscribe</md-button>
          </md-menu>
          -->
        </div>
      </div>
    </header>
    <router-view/>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  methods:{
    gotosubscribe(){
      var ele = document.getElementById('subscribe');
      window.scroll({
        top: ele.offsetTop, 
        left: ele.offsetLeft, 
        behavior: 'smooth' 
      });
    }
  }
}
</script>

<style src="./assets/app.css"></style>

