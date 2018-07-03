<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-30 md-small-size-100">
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'login',
    mixins: [validationMixin],
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
        clearForm () {
            this.$v.$reset()
            this.form.username_email = null
            this.form.password = null
        },
        logUserIn(){
            this.sending = true
            var data = this.createPostData
            axios.post('http://ali.dev.com/latin/user/login2', 
            data,{
                    headers: {
                    'Content-type': 'application/json'
                    }
                })
            .then((data) => {
                this.sessid = data.data.sessid
                this.session_name = data.data.session_name
                this.token = data.data.token
                //var jsonCookie = JSON.stringify(this.createSession)
                var jsonCookie = this.session_name + '=' + this.sessid
                var jsonCookie2 = this.token
                //save data to cookie storage
                this.setCookie("user_cookie", jsonCookie , 23)
                this.setCookie("token", jsonCookie2 , 23)
                this.lastUser = `${this.form.username_email}`
                this.userSaved = true
                this.sending = false
                this.$router.push('/profile') //this line isn't working
                this.clearForm()
            })
            .catch(e => {
                this.errors = e.response.data
                this.showError = true
                //this.clearForm()
                /*todo : showing error without [""] */
            });
        },
        validateUser(){
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.logUserIn()
            }
        },
        getUserCookie(name){
            var obj = JSON.parse(this.getCookie("user_cookie"))
            if (name){
                return obj[name]
            }
            return null
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
        eraseCookie(name) {this.setCookie(name, "", -1);}
    },
    mounted(){
        if((this.getCookie("user_cookie")!= null) && (this.getCookie("token")!= null)){
            this.$router.push('/profile')
        }
    },
    computed:{
        createSession(){
            return this.session_name + '=' + this.sessid
            /*return{
                "sessid": this.sessid,
                "session_name": this.session_name,
                "token":this.token
            }*/
        },
        createPostData(){
            return{
                hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
                username_email : this.form.username_email,
                password : this.form.password
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
  .md-snackbar.error{
    background-color: #F44336;
  }
</style>

