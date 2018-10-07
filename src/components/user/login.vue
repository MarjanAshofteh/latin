<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="formSubmit">
        <md-card class="md-layout-item md-size-30 md-small-size-100" style="overflow: visible;">
            <md-card-header>
            <div class="md-title" style="margin: 0;color: white;font-size: 25px;">Login</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field :class="getValidationClass('emailOrUsename')">
                  <label for="email">Email or Username</label>
                  <md-input name="username_email" id="username_email" autocomplete="email" v-model="form.username_email" :disabled="sending" required/>
                  <span class="md-error" v-if="!$v.form.username_email.required">The email or usename is required</span>
                  </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field :class="getValidationClass('password')">
                  <label for="password">Password</label>
                  <md-input type="password" id="password" name="password" v-model="form.password" :disabled="sending" autocomplete="current-password" required/>
                  <span class="md-error" v-if="!$v.form.password.required">The Password is required</span>
                  </md-field>
              </div>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            
            <vue-recaptcha
              ref="recaptcha"
              @verify="logUserIn"
              @expired="onCaptchaExpired"
              size="invisible"
              sitekey="6Ldp3XMUAAAAACZav47_l9to_2uESNGLa1RvQOU6">
            </vue-recaptcha>

            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending">Log In</md-button>
            </md-card-actions>
        </md-card>
        <md-snackbar :md-active.sync="userSaved">{{ lastUser }} you are log in successfully!</md-snackbar>
        <md-snackbar class="error" :md-active.sync="showError">{{ errors }}</md-snackbar>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import VueRecaptcha from 'vue-recaptcha'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { cookie } from '@/components/mixins/cookie.js'

export default {
  name: 'login',
  mixins: [validationMixin,cookie],
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  data(){
    return{
      errors:'',
      showError:false,
      sessid:'',
      session_name:'',
      token:'',
      form:{
        username_email: null,
        password: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }
  },
  validations: {
    form: {
      username_email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods:{
    getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
            return {
                'md-invalid': field.$invalid && field.$dirty
            }
        }
    },
    clearForm(){
        this.$v.$reset()
        this.form.username_email = null
        this.form.password = null
    },
    logUserIn(recaptchaToken){
      this.sending = true
      this.$refs.recaptcha.reset();

      //sending to login api
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials  = true;
      axios.post('http://api.ed808.com/latin/user/login',
      {
        hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
        username_email : this.form.username_email,
        password : this.form.password,
        reCaptchaToken : recaptchaToken
      },
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((data) => {
        this.sessid = data.data.sessid
        this.session_name = data.data.session_name
        this.token = data.data.token
        var jsonCookie2 = this.token
        //this.setCookie( this.session_name , this.sessid , 23)
        this.setCookie("token", jsonCookie2 , 23)
        this.lastUser = `${this.form.username_email}`
        this.userSaved = true
        this.sending = false
        this.$emit('do_navbar')
        if(data.data.uid != 0){
          this.setUid(data.data.uid)
          this.$router.push('/user/'+ data.data.uid)
        }
        this.clearForm()
      })
      .catch(e => {
        if(e.hasOwnProperty('response')){
          if(e.response.hasOwnProperty('data'))
            this.errors = e.response.data
          else{
            this.errors = e.response
          }
        }
        else{
          this.errors = e
        }
        this.showError = true
        //this.clearForm()
        /*todo : showing error without [""] */
      });
    },
    formSubmit(){
      //validating form
      this.$v.$touch()
      //run recaptcha and let it to fire up 'logUserIn' function with google token
      if (!this.$v.$invalid){
        this.$refs.recaptcha.execute();
      }
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    }
  },
  mounted(){
    if(this.$store.getters.getUid){
      this.$router.push('/user/'+ this.$store.getters.getUid)
    }
    else{
      //this is just work for admins that login in api.edu befor(has session and doesnt have token)
      //this code is gonna set token for them
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
          this.setCookie('token', data.data.token , 23)
          //under line is not working, I think.
          this.$emit('do_navbar')
        }
      })
      .catch(e => {
        console.log('errors for nav_bar_info : ' + e)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  form{
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 50px);
    > div{
        overflow: hidden;
    }
  }
  .md-card-content > div {
    margin: 30px 0;
  }
  .md-card-header{
    //background-color: md-theme(primary);
    background-color:#ba68c8; 
    padding: 30px 0;
    /* @todo : make it colored from variables not hard code */
  }
  .md-snackbar.error{
    background-color: #F44336;
  }
</style>

