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
import { cookie } from './mixins/cookie.js'

export default {
    name: 'login',
    mixins: [validationMixin,cookie],
    data(){
        return{
            errors:'',
            showError:false,
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
            /*const myApi = axios.create({
                baseURL: 'http://civil808.com/latin/user/login2',
                timeout: 10000,
                withCredentials: true,
                //transformRequest: [(data) => JSON.stringify(data.data)],
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })*/
            axios.post('http://civil808.com/latin/user/login2',
            data,
            {
                headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
                },
                /*xhrFields: {
                    withCredentials: true
                },*/
                withCredentials: true,
                crossDomain: true
            })
            .then((data) => {
                this.token = data.data.token
                var jsonCookie2 = this.token
                //save data to cookie storage
                this.setCookie("token", jsonCookie2 , 23)
                this.lastUser = `${this.form.username_email}`
                this.userSaved = true
                this.sending = false
                if(data.data.uid != 0){
                    this.is_login(data.data.uid)
                    axios.get('http://civil808.com/latin/user/login/nav_bar_info?hash=50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60&version:pbd_0',
                    {
                        headers:{
                        'Content-type': 'application/json'
                        }
                    })
                    .then((data) => {
                        if(data.data.uid != 0){
                            this.is_login(data.data.uid)
                            this.nav_bar(data.data.picture,data.data.username)
                            this.$router.push('/profile/'+ data.data.uid)
                        }
                    })
                    .catch(e => {
                        console.log('errors for nav_bar_info : ' + e)
                    })
                }
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
        is_login(uid){
            this.$store.commit('ISLOGIN',uid);
        }
    },
    mounted(){
        console.log('login.vue mounted')
        if(this.getCookie("token")!= null){
            if(this.$store.state.uid != 0)
                this.$router.push('/profile/'+ this.$store.state.uid)
        }
    },
    computed:{
        createPostData(){
            return{
                hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
                username_email : this.form.username_email,
                password : this.form.password,
                version : 'pbd_0'
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

