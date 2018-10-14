<template>
  <div class="inner md-layout">

    <img src="http://ed808.com/staticfile/logo.png" class="logo">

    <div class="md-layout md-gutter large-screen">
      <div class="header-menu-text md-layout-item md-size-100 md-xsmall-size-100"> 
        <md-menu md-direction="bottom-start">
          <router-link to="/"><md-button>Home</md-button></router-link>
        </md-menu>
        <md-menu md-direction="bottom-start">
          <router-link to="/about-us"><md-button>about us</md-button></router-link>
        </md-menu>
        <md-menu md-direction="bottom-start">
          <router-link to="/contents"><md-button>all contents</md-button></router-link>
        </md-menu>
      </div>

      <div v-if="!IsLogin" class="header-menu-text md-layout-item md-size-30 md-xsmall-size-100"> 
        <md-menu md-direction="bottom-start">
          <router-link to="/login"><md-button>login</md-button></router-link>
        </md-menu>
        <md-menu md-direction="bottom-start">
          <router-link to="/register"><md-button>register</md-button></router-link>
        </md-menu>
      </div>
      <div v-else class="header-menu-right md-layout-item md-size-30 md-xsmall-size-100"> 

        <md-menu md-size="small"  md-direction="bottom-end" md-align-trigger :md-active.sync="menu_flag">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-avatar>
              <img v-if="user.picture" v-bind:src="user.picture" alt="user_image">
              <img v-else src="http://civil808.com/en/staticfile/avatar.png" alt="user_image">

              <span v-if="user.username">{{user.username}}</span>
            </md-avatar>
          </md-button>
          
          <md-menu-content>
            <md-menu-item @click="$router.push('/user/'+ user.uid)">My Profile</md-menu-item>
            <md-menu-item @click="logUserOut">log out</md-menu-item>
          </md-menu-content>
        </md-menu>

      </div>
    </div>

    <div class="small-screen">
      <!-- در حالت صفحه نمایش کوچیک هم منوی کاربری رو نمایش بده - هر دو حالتش رو -->
      <md-menu md-size="big" :md-active.sync="toggleCard" @click="toggle">
        
        <md-button>
          <md-icon v-if="!toggleCard" class="md-primary">menu</md-icon>
          <md-icon v-else class="md-primary">close</md-icon>
        </md-button>

        <md-menu-content>

          <div class="md-menu-content-container md-scrollbar md-theme-default">
            <ul class="md-list md-theme-default">
              <md-menu md-direction="bottom-start">
                <router-link to="/"><md-button>Home</md-button></router-link>
              </md-menu>
              <li class="md-list-item md-menu-item md-theme-default">
                <md-menu md-direction="bottom-start">
                  <router-link to="/about-us"><md-button>about us</md-button></router-link>
                </md-menu>
              </li>
              <li class="md-list-item md-menu-item md-theme-default">
                <md-menu md-direction="bottom-start">
                  <router-link to="/contents"><md-button>all contents</md-button></router-link>
                </md-menu>
              </li>
            </ul>
          </div>
        </md-menu-content>
      </md-menu>
    </div>        

  </div>
</template>
