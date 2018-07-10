<template>
    <div style="margin-top:50px;">
            <md-content class="md-elevation-1 top">
                <div class="background-image">
                    <img v-if="user.hasOwnProperty('background_image') && !loading" v-bind:src="user.background_image" alt="background image">
                    <!--<img v-else src="http://civil808.com/en/staticfile/user_background2.jpg" alt="background image" style="opacity: 0.7;width: 100%;">-->
                </div>
                <div class="user-image">
                    <img v-if="user.hasOwnProperty('picture') && !loading && (user.picture!=0)" v-bind:src="user.picture" v-bind:alt="'image of ' + user.name">
                    <img v-else src="http://civil808.com/en/staticfile/avatar.png" v-bind:alt="'image of ' + user.name">
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
                        </div>
                        <div class="box-text">
                            <div v-if="user.full_name">{{user.full_name}}</div>
                            <div v-if="user.mail">{{user.mail}}</div>
                            <div v-if="user.mobile">{{user.mobile}}</div>
                        </div>
                    </md-content>
                    <md-content class="md-elevation-3 box">
                        <div class="box-head">
                            <md-icon>verified_user</md-icon>
                            <span class="item-text">History</span>
                        </div>
                        <div class="box-text">
                            <div v-if="user.uid">
                                <span class="label">User Id: </span>
                                {{user.uid}}
                            </div>
                            <div v-if="user.name">
                                <span class="label">Username: </span>
                                {{user.name}}
                            </div>
                            <div v-if="user.created">
                                <span class="label">Created at </span>
                                {{user.created}}
                            </div>
                            <div v-if="user.login">
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
                        </div>
                        <div class="box-text">
                            <div v-if="user.about_me">{{user.about_me}}</div>
                        </div>
                    </md-content>
                    <md-content class="md-elevation-3 box">
                        <div class="box-head">
                            <md-icon>school</md-icon>
                            <span class="item-text">Education</span>
                        </div>
                        <div class="box-text">
                            <div v-if="user.university" style="font-size:19px;">{{user.university}}</div>
                            <div v-if="user.education_field" style="padding: 5px 25px 0px 35px;">
                                <span class="label">Degree: </span>
                                {{user.education_field}}
                            </div>
                            <div v-if="user.education_degree" style="padding-left: 35px;">
                                <span class="label">Field of Study: </span>
                                {{user.education_degree}}
                            </div>
                        </div>
                    </md-content>
                    <md-content class="md-elevation-3 box">
                        <div class="box-head">
                            <md-icon>work</md-icon>
                            <span class="item-text">Skills & Experince</span>
                        </div>
                        <div class="box-text">
                            <div v-if="user.job">
                                <span class="label">job Experince: </span>
                                {{user.job}}
                            </div>
                            <div v-if="user.skills">
                                <span class="label">Skills: </span>
                                {{user.skills}}
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
import { cookie } from './mixins/cookie.js'

export default {
    name:'profile',
    mixins: [cookie],
    data(){
        return{
            errors:'',
            roles:[],
            uid:this.$route.params.uid,
            loading: true,
            user:{}
        }
    },
    mounted(){
        console.log('1')
        this.getProfile()
    },
    methods:{
        getProfile(){
            axios.get('http://civil808.com/latin/user/'+ this.uid + '/profile?hash=50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60',
                {
                    headers:{
                    'Content-type': 'application/json',
                    //'X-CSRF-Token' : this.getCookie("token")
                    //'Cookie' : this.cookie
                    }
                })
            .then((data) => {
                this.user = data.data
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
        position: relative;
        .background-image{
            width: 100%;
            height: 230px;
            overflow: hidden;
            background-color: #c4b6c2;
        }
        .user-image{
            position: absolute;
            top: 138px;
            left: 14%;
            z-index: 2;
            img{
                width: 132px;
                height: auto;
                border-radius: 50%;
                border: 3px solid white;
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
            .box-head{
                border-bottom: 1px solid #eee;
                min-height: 48px;
                padding: 4px 16px;
                display: -webkit-box;
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: justify;
                justify-content: space-between;
                transition: padding .4s cubic-bezier(.25,.8,.25,1);
                will-change: padding;
                .md-icon:first-child {
                    margin-right: 14px;
                    margin-top: 7px;
                }
                .item-text{
                    -webkit-box-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    flex-direction: column;
                    -webkit-box-align: start;
                    align-items: flex-start;
                    overflow: hidden;
                    line-height: 1.25em;
                    white-space: nowrap;
                }
            }
            .box-text {
                margin: 10px 0;
                > div {
                    padding: 5px 25px;
                }
                .label{
                    color:#888;
                    font-size:13px;
                }
            }
        }
    }
    
</style>



