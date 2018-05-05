<template>
  <div id="app">
    <header id="header">
      <div class="inner">
        <img src="http://civil808.com/seismosoft/logo.png">
        <div class="site-name">
          <p>Educational and Engineering institute 808</p>
          <span>specialized training in Civil and Architecture</span>
        </div>
        <div class="menu">
          <router-link to="about-us">about us</router-link>
          <router-link to="/">Home</router-link>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App'
}
</script>

<style src="./assets/app.css"></style>

