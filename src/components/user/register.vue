<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="formSubmit">
      <md-card class="md-layout-item md-size-30 md-small-size-100" style="overflow: visible;">
        <md-card-header>
          <div class="md-title" style="margin: 0;color: white;font-size: 25px;">Register</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field :class="getValidationClass('fullName')">
                <label for="fullName">Full Name</label>
                <md-input name="fullName" id="fullName" autocomplete="given-name" v-model="form.fullName" :disabled="sending" required/>
                <span class="md-error" v-if="!$v.form.fullName.required">The full name is required</span>
                <span class="md-error" v-else-if="!$v.form.fullName.minlength">Should be at least 3 character</span>
              </md-field>
            </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('username')">
              <label for="username">Username</label>
              <md-input id="username" name="username" v-model="form.username" autocomplete="given-name" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.username.required">The Username is required</span>
              <!--<span class="md-error" v-else-if="!$v.form.mobile.taken">The User is already taken</span>-->
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input type="password" id="password" name="password" v-model="form.password" autocomplete="new-password" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.password.required">The Password is required</span>
              <span class="md-error" v-else-if="!$v.form.password.minlength">Should be at least 6 character</span>  
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('rePassword')">
              <label for="rePassword">Password Confirmation</label>
              <md-input type="password" name="rePassword" v-model="form.rePassword" autocomplete="new-password" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.rePassword.required">The Password Confirmation is required</span>
              <span class="md-error" v-else-if="!$v.form.rePassword.sameAsPassword">Password is not the same</span>  
            </md-field>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <vue-recaptcha
          ref="recaptcha"
          @verify="saveUser"
          @expired="onCaptchaExpired"
          size="invisible"
          sitekey="6Ldp3XMUAAAAACZav47_l9to_2uESNGLa1RvQOU6">
        </vue-recaptcha>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>
        <pre>
        {{errors}}
        </pre>
      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      <md-snackbar class="error" :md-active.sync="showError">{{ errors }}</md-snackbar>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength,
  //numeric,
  sameAs
} from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'
import { cookie } from '@/components/mixins/cookie.js'

export default {
  name: 'register',
  mixins: [validationMixin,cookie],
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  data: () => ({
    errors:'',
    showError:false,
    form: {
      fullName: null,
      email: null,
      username: null,
      password: null,
      rePassword: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      fullName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      username: {
        required,
        //taken
      },
      password: {
        required,
        minLength: minLength(6)
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.fullName = null
      this.form.email = null
      this.form.username = null
      this.form.password = null
      this.form.rePassword = null
      this.showError = false
      this.errors = ''
    },
    saveUser(recaptchaToken) {
      this.sending = true
      this.$refs.recaptcha.reset();

      axios.post('http://api.ed808.com/latin/user/register',
        {
          hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          username : this.form.username,
          password : this.form.password,
          email : this.form.email,
          full_name : this.form.fullName,
          reCaptchaToken : recaptchaToken
        },
        {
          headers: {
            'Content-type': 'application/json',
          }
        })
        .then((data) => {
          this.loguserin(data)
          this.lastUser = `${this.form.fullName}`
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
        });
    },
    formSubmit() {
      //validating form
      this.$v.$touch()
      //run recaptcha and let it to fire up 'logUserIn' function with google token
      if (!this.$v.$invalid) {
        this.$refs.recaptcha.execute();
      }
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    },
    loguserin(data){
      this.setUid(data.data.uid)
      //save data to cookie storage
      this.setCookie("token", data.data.token , 23)
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
          this.setCookie("token", data.data.token , 23)
          //under line is not working, I think.
          this.$emit('do_navbar')
        }
      })
      .catch(e => {
        console.log('errors for nav_bar_info : ' + e)
      })
    }
  }
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
    height: calc(100vh - 50px);
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