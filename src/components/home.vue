<template>
  <div style="margin-top:90px;background-color: #fafafa;">

    <section id="banner">
        <!--<img src="http://civil808.com/en/staticfile/top-banner.jpg" alt="">-->
        <div>
            <h1>Educational and Engineering institute 808</h1>
            <span>specialized training in Civil and Architecture
<<<<<<< HEAD
                <span>ed808.com</span>
=======
                <span>Ed808.com</span>
>>>>>>> 4abf582a77a893017bcec0c8ae5e7a908807180d
            </span>
        </div>
    </section>

    <newspane/>

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
import newspane from '@/components/newspane'

export default {
  name: 'home',
  data () {
    return {
      inputBox:'',
      aftersubmit:false,
    }
  },
  methods: {
    addEmail() {
      var config = {
        headers:{
          'Content-Type': 'application/json',
          'crossDomain': true
        },
        baseURL: 'http://civil808.com'
      }
      var geturl = '/latin/pbd?email="' + this.inputBox + '"' 
      axios.get( geturl , config)
      .then((response) => {
      })

      this.aftersubmit = true;
      
    }
  },
  components: {
    newspane
  }
}
</script>

<style lang="scss">

    section#banner{
        background-image: url(http://civil808.com/en/staticfile/top-banner.jpg);
        background-size: cover;
        height: 400px;
        display: flex;
        align-items: center;
        background-position: bottom;
        justify-content: flex-end;
        @media all and (max-width: 700px){
            justify-content: center; 
        }
        > div{
            margin: 0 11% 0 0;
            @media all and (max-width: 700px){
                margin:0px;
            }
            h1{
                font-size: 24px;
                padding: 26px 26px;
                font-weight: bold;
                background-color: #ffffff;
                margin-bottom: 7px;
                @media all and (max-width: 600px){
                    font-size: 17px;
                    padding: 26px 10px;
                }
            }
            > span{
                color: white;
                font-size: 17px;
                border: 1px solid white;
                padding: 24px 20px 30px 20px;
                display: inline-block;
                text-shadow: 2px 2px 6px #000;
                border-width: 1px 1px 0px 1px;
                position: relative;
                @media all and (max-width: 600px){
                    font-size: 16px;
                    padding: 24px 10px 30px 10px;
                }
                > span{
                    font-size: 10px;
                    position: absolute;
                    bottom: -7px;
                    right: calc(50% - 28px);
                }
                &:before{
                    content: '';
                    position: absolute;
                    background-color: white;
                    width: 100px;
                    height: 1px;
                    bottom: 0;
                    left: 0;
                }
                &:after{
                    content: '';
                    position: absolute;
                    background-color: white;
                    width: 100px;
                    height: 1px;
                    bottom: 0;
                    right: 0;
                }
            }
        }
    }
    section#subscribe{
        background: #5a5f64;
        padding: 10px 0 30px 0;
        color: #fff;
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
            padding: 0 17px;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.3);
            outline: none;
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
    .inner{
        max-width: 1100px;
        margin: auto;
    }
    .page-iframe .mejs-container{
        padding-bottom: 53% !important;
    }
    .admin-error{
        display: none;
    }

</style>

