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
            <md-field :class="getValidationClass('mobile')">
              <label for="mobile">Mobile Number</label>
              <md-input type="tel" id="mobile" name="mobile" autocomplete="tel" v-model="form.mobile" :disabled="sending" required/>
              <span class="md-error" v-if="!$v.form.mobile.required">The Mobile Number is required</span>
              <span class="md-error" v-else-if="!$v.form.mobile.numeric">It must be Number</span>
              <span class="md-error" v-else-if="!$v.form.mobile.minlength">Should be at least 8 character</span>  
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
    numeric,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'register',
    mixins: [validationMixin],
    data: () => ({
      errors: [],
      form: {
        fullName: null,
        mobile: null,
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
        mobile: {
          required,
          minLength: minLength(8),
          numeric
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
        this.form.mobile = null
        this.form.email = null
        this.form.username = null
        this.form.password = null
        this.form.rePassword = null
      },
      saveUser () {
        this.sending = true
        var userData = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          "username" : this.form.username,
          "password" : this.form.password,
          "email" : this.form.email,
          "full_name" : this.form.fullName,
          "mobile" : this.form.mobile
        }
        console.log(userData)
        axios.post('http://civil808.com/latin/user/register2',
          userData,
          {
            headers: {
            'Content-type': 'application/json',
            }
          })
          .then(response => console.log('yeeeeeeeeh'))
          /*.then((data) => {
            this.lastUser = `${this.form.fullName}`
            this.userSaved = true
            this.sending = false
            this.clearForm()
            console.log(data)
          })*/
          .catch(e => {
              this.errors.push(e)
          });

        /* Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          
        }, 1500)*/
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
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
</style>