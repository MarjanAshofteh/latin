<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
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
              <md-input id="username" name="username" v-model="form.username" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.username.required">The Username is required</span>
              <!--<span class="md-error" v-else-if="!$v.form.mobile.taken">The User is already taken</span>-->
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input type="password" id="password" name="password" v-model="form.password" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.password.required">The Password is required</span>
              <span class="md-error" v-else-if="!$v.form.password.minlength">Should be at least 6 character</span>  
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('rePassword')">
              <label for="rePassword">Password Confirmation</label>
              <md-input type="password" name="rePassword" v-model="form.rePassword" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.rePassword.required">The Password Confirmation is required</span>
              <span class="md-error" v-else-if="!$v.form.rePassword.sameAsPassword">Password is not the same</span>  
            </md-field>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

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
  import login from '@/components/login'

  export default {
    name: 'register',
    mixins: [validationMixin],
    data: () => ({
      errors:'',
      showError:false,
      sessid:'',
      session_name:'',
      token:'',
      uid:0,
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
      saveUser () {
        this.sending = true
        var userData = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          "username" : this.form.username,
          "password" : this.form.password,
          "email" : this.form.email,
          "full_name" : this.form.fullName,
          "version" : "pbd_0"
        }
        console.log(userData)
        axios.post('http://ali.dev.com/latin/user/register2',
          userData,
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
            this.loged_in(this.uid)
            this.$router.push('/profile/'+ this.uid)
            this.clearForm()
            /* log user in by calling login component */
          })
          .catch(e => {
              this.errors = e.response.data
              this.showError = true
              this.clearForm()
          });
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },
      loguserin(data){
        this.sessid = data.data.sessid
        this.session_name = data.data.session_name
        this.token = data.data.token
        this.uid = data.data.uid
        var jsonCookie = this.session_name + '=' + this.sessid
        var jsonCookie2 = this.token
        var jsonCookie3 = this.uid
        //save data to cookie storage
        this.setCookie("user_cookie", jsonCookie , 23)
        this.setCookie("token", jsonCookie2 , 23)
        this.setCookie("uid", jsonCookie3 , 23)
        this.loged_in(this.uid)
        this.$router.push('/profile/'+ this.uid)
      },
      setCookie(name, value, days){
        var cookie = name + "=" + value + ";"
        if (days) { 
          var expires = new Date()
          expires = new Date(expires.getFullYear(),expires.getMonth(),expires.getDate()+days)
          cookie += "expires=" + expires + ";"
        }
        document.cookie = cookie + expires + "; path=/"
      },
      getCookie(name) {
        var nameEQ = name + "="
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          //console.log(c)
          while (c.charAt(0) == ' ') c = c.substring(1, c.length)
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
        }
        return null
      },
      loged_in(uid){
        if(uid != 0)
        this.$store.commit('LOGEDIN', uid);
      }
    },
    mounted(){
      if((this.getCookie("user_cookie")!= null) && (this.getCookie("token")!= null)){
        this.$router.push('/profile/'+ this.getCookie("uid"))
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