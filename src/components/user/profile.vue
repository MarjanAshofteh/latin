<template>
  <div>
    <md-content class="md-elevation-1 top">

      <div class="background-image">

        <div class="dim" v-if="updateField.background_image"></div>

        <img v-if="user.hasOwnProperty('background_image') && !loading" v-bind:src="user.background_image" alt="background image">

        <div v-if="sameUser" class="edit-background-image">
          <input type="file" id="file" ref="file1" v-on:change="handleFileUpload('background_image')"/>
          <md-icon class="md-size-2x">edit</md-icon>
        </div>
        <div class="spinner-loading" v-if="updateField.background_image">
          <md-progress-spinner :md-diameter="100" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
        </div>
      </div>

      <div class="user-image">

        <div class="dim" v-if="updateField.picture"></div>

        <img v-if="user.hasOwnProperty('picture') && !loading && (user.picture!=0)" v-bind:src="user.picture" v-bind:alt="'image of ' + user.name" v-bind:title="'image of ' + user.name">

        <img v-else src="http://ed808.com/staticfile/avatar.png" v-bind:alt="'image of ' + user.name">
        
        <div v-if="sameUser" class="edit-picture">
          <input type="file" id="file" ref="file2" v-on:change="handleFileUpload('picture')"/>
          <md-icon>photo_camera</md-icon>
        </div>
        <div class="spinner-loading" v-if="updateField.picture">
          <md-progress-spinner :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
      </div>
      <div class="user-tabs">
        <md-tabs md-sync-route>
          <md-tab id="tab-home" md-label="Personal info" to=""></md-tab>
        </md-tabs>
      </div>
      <div class="loading" v-if="loading">
        <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
      </div>
    </md-content>
    <div class="bottom">
      <div class="min-col">
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>account_box</md-icon>
            <span class="item-text">Personal</span>
            <md-button v-if="sameUser" @click="editThis('personal')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div v-if="editingEl != 'personal'">
              <div class="box-row" v-if="user.full_name">{{user.full_name}}</div>
              <div class="box-row" v-if="user.mail">{{user.mail}}</div>
              <div class="box-row" v-if="user.mobile">{{user.mobile}}</div>
            </div>

            <div class="box-edit" v-else>
              <div>
                <md-field>
                  <label>full name</label>
                    <md-input v-model="user.full_name"></md-input>
                </md-field>

                <md-field>
                  <label>Email address</label>
                    <md-input v-model="user.mail"></md-input>
                </md-field>

                <md-field>
                  <label>Phone</label>
                    <md-input v-model="user.mobile"></md-input>
                </md-field>

                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>   
              </div>

              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('personal')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('personal')">Cancel</md-button>
                </div>
              </div>
            </div>


          </div>
        </md-content>
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>verified_user</md-icon>
            <span class="item-text">History</span>
          </div>
          <div class="box-text">
              <div class="box-row" v-if="user.uid">
                <span class="label">User Id: </span>
                {{user.uid}}
              </div>
              <div class="box-row" v-if="user.name">
                <span class="label">Username: </span>
                {{user.name}}
              </div>
              <div class="box-row" v-if="user.created">
                <span class="label">Created at </span>
                {{user.created}}
              </div>
              <div class="box-row" v-if="user.login">
                <span class="label">Last login </span>
                {{user.login}}
              </div>
          </div>
        </md-content>
      </div>
      <div class="max-col">
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>perm_identity</md-icon>
            <span class="item-text">Bio</span>
            <md-button v-if="sameUser" @click="editThis('about')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div class="default-text box-row" v-if="!user.about && (editingEl != 'about')">
              Write Your Bio ...
            </div>
            <div class="box-row" v-if="user.about && (editingEl != 'about')">
              {{user.about}}
            </div>
            <div class="box-edit" v-else-if="editingEl == 'about'">
              <md-field>
                <md-textarea v-model="user.about"></md-textarea>
                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>
              </md-field>
              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('about')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('about')">Cancel</md-button>
                </div>
              </div>
            </div>
          </div>
        </md-content>
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>school</md-icon>
            <span class="item-text">Education</span>
            <md-button v-if="sameUser" @click="editThis('education')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div v-if="editingEl != 'education'">
              <div class="default-text box-row" v-if="!user.university">
                University Name ...
              </div>
              <div v-else class="box-row" style="font-size:19px;">{{user.university}}</div>

              <div class="default-text box-row" v-if="!user.education_degree" style="padding: 5px 25px 0px 35px;">
                <span class="label">Degree: </span>
                Your Degree
              </div>
              <div v-else class="box-row" style="padding: 5px 25px 0px 35px;">
                <span class="label">Degree: </span>
                {{user.education_degree}}
              </div>

              <div class="default-text box-row" v-if="!user.education_field" style="padding-left: 35px;">
                <span class="label">Field of Study: </span>
                Your Field of study
              </div>
              <div v-else class="box-row" style="padding-left: 35px;">
                <span class="label">Field of Study: </span>
                {{user.education_field}}
              </div>
            </div>

            <div class="box-edit" v-else>
              <div>
                <md-field>
                  <label>University</label>
                    <md-input v-model="user.university"></md-input>
                </md-field>

                <md-field>
                  <label>Degree</label>
                    <md-input v-model="user.education_degree"></md-input>
                </md-field>

                <md-field>
                  <label>Field of study</label>
                    <md-input v-model="user.education_field"></md-input>
                </md-field>

                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>   
              </div>

              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('education')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('education')">Cancel</md-button>
                </div>
              </div>
            </div>
          </div>
        </md-content>
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>work</md-icon>
            <span class="item-text">Skills & Experince</span>
            <md-button v-if="sameUser" @click="editThis('work')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div v-if="editingEl != 'work'">
              <div class="default-text box-row" v-if="!user.job">
                <span class="label">job Experince: </span>
                I've worked at ...
              </div>
              <div class="box-row" v-else>
                <span class="label">job Experince: </span>
                {{user.job}}
              </div>

              <div class="default-text box-row" v-if="!user.skills">
                <span class="label">Skills: </span>
                I have skill in ...
              </div>
              <div class="box-row" v-else>
                <span class="label">Skills: </span>
                {{user.skills}}
              </div>

              <div class="box-row" v-if="user.hasOwnProperty('cv_url') && user.hasOwnProperty('cv_name')">
                <span class="label">CV: </span>
                <!--<md-icon>insert_drive_file</md-icon>-->
                <a :href="user.cv_url" target="_self" download style="display: inline-block;vertical-align: bottom;"> {{user.cv_name}} </a>
              </div>

            </div>

            <div class="box-edit" v-else>
              <div>
                <md-field style="margin-bottom:24px;">
                  <label>Job</label>
                  <md-input v-model="user.job"></md-input>
                </md-field>

                <md-field class="with-label" style="margin-bottom:24px;">
                  <label>Skills</label>
                  <md-textarea v-model="user.skills"></md-textarea>
                </md-field>

                <!--<md-field>
                  <label>Cv</label>
                  <md-file v-if="user.cv_name" v-model="uploadCv" :placeholder="user.cv_name" :ref="file" @change="handleFileUpload()"/>
                  <md-file v-else v-model="uploadCv"/>
                </md-field>

                <div class="container">
                  <div class="large-12 medium-12 small-12 cell">
                    <label>File
                      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                    </label>
                    <button v-on:click="submitFile()">Submit</button>
                  </div>
                </div>-->

                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>
              </div>

              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('work')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('work')">Cancel</md-button>
                </div>
              </div>
            </div>
          </div>
        </md-content>



      </div>
    </div>
    <!--<span v-for="(role,index) in roles" :key="index">
      {{role}}
      <span v-if="(roles.length-1 != index)">,</span>
    </span>-->
  </div>
</template>

<script>
import axios from 'axios'
import { cookie } from '@/components/mixins/cookie.js'

export default {
  name:'profile',
  mixins: [cookie],
  data(){
    return{
      userapi:{},
      errors:'',
      roles:[],
      uid:this.$route.params.uid,
      loading: true,
      updateField: false,
      user:{},
      editingEl:'',
      sameUser:false,
      updateField:{
        picture:false,
        background_image:false
      },
      file:{
        picture:{},
        background_image:{},
        cv:{}
      },
      afterUpload:{
        picture:{},
        background_image:{},
        cv:{}
      }
    }
  },
  mounted(){
    this.$store.watch(
      (state) => {return state.uid}, 
      () => { this.isSameUser()}, 
      { deep: true} 
    )
    
    this.getProfile()
  },
  methods:{
    handleFileUpload(fieldName){
      this.updateField[fieldName] = true
      if(fieldName == 'picture'){
        this.file[fieldName] = this.$refs.file2.files[0]
      }
      if(fieldName == 'background_image'){
        this.file[fieldName] = this.$refs.file1.files[0]
      }
      this.submitFile(fieldName)
    },
    submitFile(fieldName){
      let formData = new FormData();
      formData.append('file', this.file[fieldName]);
      //needs validation here
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials  = true;
      axios.post('http://api.ed808.com/latin/file/upload?parameter[hash]=020042f70a981fd6806ecf5e53f2267b377da9d9f981e15297d70c3f7c2a87d0',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRF-Token' : this.getCookie("token")
          }
        }
        ).then((data) =>{
          this.afterUpload[fieldName] = data.data.file
          console.log('New '+ fieldName + ' was upload SUCCESSly')
          if((fieldName == 'picture') || (fieldName == 'background_image')){
            this.doneEditingThis(fieldName)
          }
        })
        .catch((e) =>{
          console.log('FAILURE!!' + e)
        });
    },
    isSameUser(){
      if(this.$store.getters.getUid){
        if(this.$store.getters.getUid == this.$route.params.uid)
          this.sameUser = true
          console.log(this.sameUser)
      }
    },
    editThis(fieldName){
      this.editingEl = fieldName
      this.updateField = false
    },
    cancleEditingThis(fieldName){
      if(fieldName == 'education'){
        this.user['university'] = this.userapi['university']
        this.user['education_degree'] = this.userapi['education_degree']
        this.user['education_field'] = this.userapi['education_field']
      }
      else if(fieldName == 'personal'){
        this.user['full_name'] = this.userapi['full_name']
        this.user['mail'] = this.userapi['mail']
        this.user['mobile'] = this.userapi['mobile']
      }
      else if(fieldName == 'work'){
        this.user['job'] = this.userapi['job']
        this.user['skills'] = this.userapi['skills']
      }
      else{
        this.user[fieldName] = this.userapi[fieldName]
      }
      this.editingEl = ''
    },
    doneEditingThis(fieldName){
      this.updateField = true
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials  = true;
      if(fieldName == 'education'){
        var data = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          "university" : this.user['university'],
          "education_degree" : this.user['education_degree'],
          "education_field" : this.user['education_field']
        }
      }
      else if(fieldName == 'personal'){
        var data = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          "full_name" : this.user['full_name'],
          "mail" : this.user['mail'],
          "mobile" : this.user['mobile']
        }
      }
      else if(fieldName == 'work'){
        var data = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          "job" : this.user['job'],
          "skills" : this.user['skills']
        }
      }
      else if((fieldName == 'picture') || (fieldName == 'background_image')){
        var data = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          [fieldName] : this.afterUpload[fieldName]
        }
      }
      else{
        var data = {
          "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          [fieldName] : this.user[fieldName]
        }
      }
      console.log(data)
      axios.put('http://api.ed808.com/latin/user/'+ this.$route.params.uid,
      data,
      {
        headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token' : this.getCookie("token")
        }
      })
      .then((data) => {
        this.updateField = false
        this.updateField[fieldName] = false
        this.editingEl = ''
        if(fieldName == 'education'){
          this.userapi['university'] = this.user['university']
          this.userapi['education_degree'] = this.user['education_degree']
          this.userapi['education_field'] = this.user['education_field']
        }
        else if(fieldName == 'personal'){
          this.userapi['full_name'] = this.user['full_name']
          this.userapi['mail'] = this.user['mail']
          this.userapi['mobile'] = this.user['mobile']
        }
        else if(fieldName == 'work'){
          this.userapi['job'] = this.user['job']
          this.userapi['skills'] = this.user['skills']
        }
        else{
          this.userapi[fieldName] = this.user[fieldName]
        }
        if((fieldName == 'picture') || (fieldName == 'background_image')){
          console.log(this.afterUpload[fieldName].uri)
          console.log(this.createlink(this.afterUpload[fieldName].uri))
          this.user[fieldName] = this.createlink(this.afterUpload[fieldName].uri)
          console.log('New '+ fieldName + ' was saved SUCCESSly')
        }
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
      })
    },
    getProfile(){
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials  = true;
      axios.get('http://api.ed808.com/latin/user/'+ this.uid + '/information',
        {
          headers:{
            'Content-type': 'application/json',
            'X-CSRF-Token' : this.getCookie("token")
          } 
        })
      .then((data) => {
        this.user = data.data
        this.userapi = Object.assign({}, this.user)
        /*for(var field in this.user){
          this.user[field] = data.data[field]
        }
        /*for (var key in data.data.roles) {
          this.roles.push(data.data.roles[key])
        }*/
        this.roles = Object.values(data.data.roles)
        this.loading = false;
      })
      .catch(e => {
        this.errors = e.response.data
      });
    },
    createlink: function (value) {
      if (!value) return ''
      return "http://api.ed808.com/sites/default/files/" + value.substring(9)
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    bottom: 0;
    background: #fff;
  }
  .top{
    .dim{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      right: 0;
      left: 0;
      background-color: #868686c4;
    }
    position: relative;
    .spinner-loading{
      position: absolute;
      top: calc(50% - 30px);
      right: calc(50% - 30px);
    }
    .background-image{
      width: 100%;
      height: 230px;
      overflow: hidden;
      background-color: #c4b6c2;
      position: relative;
      &:hover{
        .edit-background-image{
          opacity: 1;
        }
      }
      .spinner-loading{
        top: calc(50% - 50px);
      }
      .edit-background-image{
        position: absolute;
        transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
        width: 60px;
        right: 33px;
        top: 30px;
        background-color: #00000059;
        opacity: 0;
        height: 60px;
        border-radius: 50%;
        [type="file"] {
          height: 100%;
          overflow: hidden;
          width: 100%;
          opacity: 0;
          z-index: 3;
          position: relative;
          cursor: pointer;
        }
        [type="file"] + i {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 0;
          width: 30px;
          height: 30px;
          max-width: 30px;
          font-size: 30px !important;
          color: #ffffff;
        }
      }
    }
    .user-image{
      position: absolute;
      top: 138px;
      left: 14%;
      z-index: 2;
      overflow: hidden;
      border-radius: 50%;
      border: 3px solid white;
      &:hover{
        .edit-picture{
          opacity: 1;
          bottom: 0;
          top: 50%;
        }
      }
      .edit-picture{
        position: absolute;
        transition: .5s cubic-bezier(.25,.8,.5,1);
        width: 100%;
        height: 50%;
        right: 0;
        left: 0;
        background-color: #ffffff82;
        opacity: 0;
        top: 100%;
        [type="file"] {
          height: 100%;
          overflow: hidden;
          width: 100%;
          opacity: 0;
          z-index: 3;
          position: relative;
          cursor: pointer;
        }
        [type="file"] + i {
          font-weight: bold;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 0;
        }
      }
      img{
        width: 132px;
        height: auto;
      } 
    }
    .user-tabs{
      background: white;
      .md-tabs{
        width: 56%;
        margin: auto;
        max-width: 880px;
      }
    }
  }
  .bottom{
    max-width: 1130px;
    margin: 27px auto;
    text-align: left;
    display: flex;
    .max-col{
      .box{
        min-width: 776px;
      }
    }
    .box{
      position: relative;
      min-width: 300px;
      display: inline-block;
      width: auto;
      margin: 0 27px 27px 0;
      transition: .3s cubic-bezier(.25,.8,.5,1);
      &:hover .box-head .edit{
        opacity: 1;
      } 
      .box-head{
        border-bottom: 1px solid #eee;
        min-height: 48px;
        padding: 4px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: padding .4s cubic-bezier(.25,.8,.25,1);
        .md-icon:first-child {
          margin-right: 14px;
          margin-top: 7px;
        }
        .item-text{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
          line-height: 1.25em;
          white-space: nowrap;
        }
        .edit{
          opacity: 0;
          transition: .3s cubic-bezier(.25,.8,.5,1);
          margin: 0 -12px 0 0;
          .md-icon{
            margin: 0px !important;
          }
        } 
      }
      .box-text {
        margin: 10px 0;
        .box-row {
          padding: 5px 25px;
        }
        .default-text{
          color: #BDBDBD;
        }
        .label{
          color:#888;
          font-size:13px;
        }
        .box-edit{
          padding: 5px 25px;
          .md-field{
            margin-bottom: 9px;
          }
          .md-field.md-has-textarea{
            textarea{
              font-size:16px !important;
            }
            &:not(.with-label){
              padding: 7px 1px;
            }
            margin: 0;
          }
          .md-layout.md-alignment-center-space-between .md-layout-item{
            flex:0;
            button{
              margin: 6px 0 0 0;
              &.green{
                background-color:#4caf50;
                color: white !important;
              }
            }
          }
        }
      }
    }
  }
</style>
