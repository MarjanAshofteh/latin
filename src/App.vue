<template>
  <div id="app" :class="[queryClasses]">
    <header id="header">
      <div class="inner md-layout">

        <img src="http://ed808.com/staticfile/logo.png" class="logo">

        <div class="md-layout md-gutter large-screen">
          <div class="header-menu-text md-layout-item md-size-100" style="text-align: right;"> 
            
            <md-menu md-direction="bottom-start">
              <router-link to="/"><md-button>Home</md-button></router-link>
            </md-menu>
            
            <md-menu md-direction="bottom-start">
              <router-link to="/about-us"><md-button>about us</md-button></router-link>
            </md-menu>
            
            <md-menu md-direction="bottom-start">
              <router-link to="/contents"><md-button>all contents</md-button></router-link>
            </md-menu>

            <div v-if="!IsLogin" class="md-menu user-links"> 
              <md-menu md-direction="bottom-start">
                <router-link to="/login"><md-button>login</md-button></router-link>
              </md-menu>

              <md-menu md-direction="bottom-start">
                <router-link to="/register">
                  <md-button class="md-raised" style="background: #2196F3;color: #fff;">register</md-button>
                </router-link>
              </md-menu>
            </div>

            <div v-else class="md-menu user-links"> 
              <md-menu md-size="big"  md-direction="bottom-end" md-align-trigger :md-active.sync="menu_flag">
                <div @click="opening_menu" style="cursor: pointer;">
                  <span v-if="user.username" style="display: inline-block;vertical-align: middle;margin: 0 10px -20px 15px;">{{user.username}}</span>
                  <md-button class="md-icon-button">
                    <md-avatar>
                      <img v-if="user.picture" v-bind:src="user.picture" alt="user_image">
                      <img v-else src="http://civil808.com/en/staticfile/avatar.png" alt="user_image">
                    </md-avatar>
                  </md-button>
                </div>
                
                <md-menu-content>
                  <md-menu-item>
                    <router-link :to="'/user/'+ user.uid" target="_blank">My Profile</router-link>
                  </md-menu-item>
                  <md-menu-item @click="logUserOut">log out</md-menu-item>
                </md-menu-content>
              </md-menu>

            </div>
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
    </header>
    
    <div v-if="($route.name == 'login') || ($route.name == 'register')">
      <router-view @do_navbar="update_navbar" v-if="NavbarDone"/>
    </div>
    <div v-else>
      <router-view @do_navbar="update_navbar"/>
    </div>
    <md-snackbar :md-active.sync="IsLogOut">You log out successfully!</md-snackbar>

    <section id="subscribe">
      <div class="inner">
        <h2>Subscribe Your Email</h2>
        <div class="input-wrapper">
          <input @keyup.enter="addEmail" v-model="inputBox" placeholder="Submit Your Email..."  autocomplete="off"/>
          <button v-on:click="addEmail"></button>
          <div style="margin-top: 20px;" v-if="aftersubmit" >Thank You :)</div>
        </div>
        <p> Join our mailing list to receive the latest updates and personalized content right in your inbox </p>
      </div>
    </section>

  </div>
</template>

<script>
  import axios from 'axios'
  import { cookie } from './components/mixins/cookie.js'

  export default {
    name: 'App',
    mixins:[cookie],
    data(){
      return{
        user:{
          uid:'',
          picture:'',
          username:''
        },
        IsLogin:false,
        IsLogOut:false,
        menu_flag:false,
        queryClasses: '',
        inputBox:'',
        aftersubmit:false,
        toggleCard: false,
        NavbarDone:false
      }
    },
    created(){
      if(this.getCookie("token") == null){
        //in this way, user is not log in
        //console.log('token is unset')
        this.NavbarDone = true
      }
      else {
        this.update_navbar()
      }
      var query = this.$router.currentRoute.path.split('/')
      query.forEach(element => {
        if(element != '')
          this.queryClasses += ' page-' + element
      });
    },
    methods:{
      update_navbar(){
        //console.log('token is set')
        axios.defaults.crossDomain = true;
        axios.defaults.withCredentials  = true;
        axios.get('http://api.ed808.com/latin/user/login/nav_bar_info',
        {
          headers:{
            'Content-type': 'application/json'
          }
        })
        .then((data) => {
          if(data.data.uid != 0){
            this.user.uid = data.data.uid
            this.user.picture = data.data.picture
            this.user.username = data.data.username
            this.setUid(data.data.uid)
            this.IsLogin = true
            this.NavbarDone = true
          }
        })
        .catch(e => {
          console.log('errors for nav_bar_info : ' + e)
        })
      },
      opening_menu(){
        this.menu_flag = !this.menu_flag
      },
      toggle () {
        this.toggleCard = !this.toggleCard
      },
      gotosubscribe(){
        var ele = document.getElementById('subscribe');
        window.scroll({
          top: ele.offsetTop, 
          left: ele.offsetLeft, 
          behavior: 'smooth' 
        });
      },
      logUserOut(){
        axios.defaults.crossDomain = true;
        axios.defaults.withCredentials  = true;
        axios.post('http://api.ed808.com/latin/user/logout',
        true,{
          headers:{
          'Content-type': 'application/json',
          'X-CSRF-Token': this.getCookie("token")
          }
        })
        .then((data) => {
          this.eraseCookie('token')
          this.$store.commit('LOGOUT')
          this.IsLogin = false
          this.IsLogOut = true
          this.$router.push('/')
        })
        .catch(e => {
          console.log('errors for logout : ' + e)
        });
      },
      addEmail() {
        axios.post('http://api.ed808.com/latin/user/subscribe_email',
        {
          'email':this.inputBox
        },
        {
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then((data) => {
          this.aftersubmit = true
          this.inputBox = ''
        })
        .catch(e => {

        });
      },
      get_gravatar(email, size){
        // MD5 (Message-Digest Algorithm) by WebToolkit 
        var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
        var size = size || 80;
        return 'http://www.gravatar.com/avatar/' + MD5(email) + '.jpg?s=' + size;
      }
    }
  }
</script>

<style lang="scss">
  .md-menu-content-bottom-start.md-menu-content-big.md-menu-content.md-theme-default {
    width: 100%;
    max-width: 100%;
    top:90px !important;
    right:0px !important;
    left:0px !important;
    .md-menu{
      width: 100%;
      display: block;
    }
    .md-button{
      width:100%;
    }
  }
  @mixin icon-size($size) {
    width: $size;
    height: $size;
    min-width: $size;
    font-size: $size !important;
  }
  @media all and (max-width:960px) {
    .large-screen{
      display:none !important;
    }
    .small-screen{
      display: block !important;
      .md-icon{
        @include icon-size(30px);
      }
    }
    header#header .inner{
      justify-content: space-between;
    }
  }
  .small-screen{
    display: none;
  }
  .md-menu button {
    margin: 0;
  }
  section#subscribe{
    background: #5a5f64;
    padding: 10px 0 30px 0;
    color: #fff;
    margin-top: auto;
    .input-wrapper{
      position: relative;
      width: 400px;
      margin: auto;
      @media all and (max-width: 700px){
        width: 300px;
      }
    }
    input{
      width: 400px;
      box-sizing: border-box;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
      border-radius: 30px;
      height: 50px;
      -webkit-appearance: button-bevel;
      padding: 0 7%;
      font-size: 15px;
      background: rgba(0, 0, 0, 0.3);
      outline: none;
      color: white;
      @media all and (max-width: 700px){
        width: 300px;
      }
    }
    button{
      position: absolute;
      height: 44px;
      right: -1px;
      top: -2px;
      width: 45px;
      border-radius: 50%;
      -webkit-appearance: button-bevel;
      margin: 5px;
      cursor: pointer;
      background-color: #BA68C8;
      &:before {
        content: '+';
        font-size: 28px;
        color: #ffffff;
      }
    }
  }
  .md-menu.user-links {
    padding-left: 10px;
    margin-left: 15px;
    position: relative;
    &:before {
      content: "";
      height: 20px;
      left: 0;
      width: 1px;
      background: #ccc;
      position: absolute;
      top: 8px;
    }
  }
</style>
