<template>
  <div style="margin-top:90px;background-color: #fafafa;">

    <section id="banner">
        <!--<img src="http://civil808.com/en/staticfile/top-banner.jpg" alt="">-->
        <div>
            <h1>Educational and Engineering institute 808</h1>
            <span>specialized training in Civil and Architecture
                <span>civil808.com</span>
            </span>
        </div>
    </section>

    <newspane/>

    <section id="webinar">
      <h1 class="md-headline">4th Conference on Performance-Based Structural Design</h1>
      <div class="inner">
        <img src="http://civil808.com/sites/all/themes/sara/images/seismosoft.png"  width="324" height="444">
        <div class="webinar-text">
          <p>SeismoBuild is an innovative Finite Elements package for the seismic assessment and strengthening of reinforced concrete framed structures that is targeted to the design office. The program is capable of fully carrying out the Code defined assessment methodologies from the structural modelling, through to the required analyses, and the corresponding member checks.</p>
          <p><strong>Speaker:</strong></p>
          <p>Dr. Stelios Antoniou, Co-founder, Managing Director and R&amp;D Director of the Seismosoft Company</p><p><strong>Program:</strong></p><ul><li>Unveiling of SeismoBuild software in accordance with ASCE41 Code to evaluate and retrofit buildings</li><li>Training workshop on the different types of Seismosoft Softwares</li></ul><p><strong>Conference Date:</strong></p><p>17 February 2018 (Concurrent with the 4th International Conference on Structural Engineering)</p><p><strong>Organizer:</strong></p><p>808 Engineering Education Institute, Official representative of Seismosoft Company in Iran</p><b>Watch The Webinar:</b>
        </div>
      </div>
      <div class="iframe">
          <div style="margin:10px auto 20px;position:relative;max-width:840px;height:500px;"><div style="position:relative;width: 100%;padding-bottom: 56.25%;"><iframe allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src ="http://www.civil808.com/file/iframe/18332" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div></div>
          <!--<iframe width="640" height="564" src="https://player.vimeo.com/video/270040789" frameborder="0" allowFullScreen mozallowfullscreen webkitAllowFullScreen></iframe>-->
      </div>
    </section>

    <section id="playlist">
      <div class="inner">
        <img src="http://civil808.com/en/staticfile/playlist.jpg" alt="">
        <div class="right">
          <h2>Educational Videos for SeismoStruct</h2>
          <p>
            In this tutorial, a steel concentrically braced frame is considered and modeled in SeismoStruct. Behaviors of the frame from experimental and numerical results are obtained and compared in terms if hysteretic behavior and dissipated energy. This tutorial also demonstrates how to obtain digitized data from a curve in a PDF file or a curve photograph
          </p>
          <b>This video prepared by Civil808 , Official representative of Seismosoft products in Iran</b>
          <a target="_blank" href="https://www.youtube.com/watch?v=prFIPcbk940&list=PL53K6Vi2wDUJc88g35lnfQk5jKN9_kuVM">Start Learning</a>
        </div>
      </div>
    </section>

    <section id="shop">
      <div class="inner">
      <h1 class="md-headline">Steel Frame with Infill Panel-Nonlinear Time History Analysis</h1>
      <p>In this short tutorial the process of modeling a 3D 1-story steel structure with the brick infill panel is tutored in the Seismostruct software. The building behavior is evaluated under earthquake accelerogram by implementing a nonlinear dynamic analysis. The nonlinear behavior of the both structure as well as the infill panel is taken into account. All the process from modeling to extracting the results are described in detail.</p>
      <a target="_blank" href="http://civil808.com/node/18212">More Information</a>
      <div style="margin:10px auto 20px;position:relative;max-width:840px;height:500px;">
        <div style="position:relative;width: 100%;padding-bottom: 56.25%;">
          <iframe allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src ="http://www.civil808.com/file/iframe/18471" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>
        </div>
      </div>
    </section>

    <section id="representative">
        <h1 class="md-headline">
            Educational and Engineering Institute 808
            ,
            Official representative of Seismosoft products in Iran
        </h1>
        <div class="main">
            <div class="left seismoStruct">
                <img src="http://civil808.com/en/staticfile/seismostruct.png"/>
                <h3>SeismoStruct</h3>
                <p>
                    is an award-winning program developed for the accurate analytical assessment of different classes of structures, such as buildings, bridges or industrial plants, subjected to earthquake strong motion. It features a number of verified nonlinear static and dynamic analysis methods (pushover, incremental dynamic analysis, etc.) so as to meet the analytical requirements posed by the modern performance-based seismic assessment and design philosophy.
                </p>
            </div>
            <div class="middle seismoSignal">
                <img src="http://civil808.com/en/staticfile/seismosignal.png"/>
                <h3>SeismoSignal</h3>
                <p>
                    constitutes a simple, yet efficient, package for the processing of strong-motion data. Amongst other things, it allows for the derivation of elastic and constant ductility inelastic response spectra, computation of Fourier amplitude spectra, filtering of high and low frequency record content and estimation of other important seismological parameters, such as the Arias Intensity and the significant and effective durations.
                </p>
            </div>
            <div class="right seismoApps">
                <img src="http://civil808.com/en/staticfile/seismostruct.png"/>
                <h3>SeismoApps</h3>
                <p>
                    <strong>SeismoMatch</strong> is an application capable of adjusting earthquake records, through wavelet addition, to match a specific target response spectrum
                    <br>
                    <strong>SeismoArtif</strong>  is an application capable of generating artificial earthquake accelerograms matched to a specific target response spectrum using different calculation methods and varied assumptions
                    <br>
                    <strong>SeismoSpect</strong> allows users to create their own library of ground motion records and save them all in a single file making it easy to handle and share large numbers of records
                </p>
            </div>
        </div>
        <div class="footer">
            <h4>
                Contact us via edu@civil808.com if you would like to order free products of Seismosoft
                ,
                Educational and Engineering Institute 808
            </h4>
        </div>
    </section>

    <section id="subscribe">
      <div class="inner">
        <h2>Subscribe Your Email</h2>
        <p> Join our mailing list to receive the latest updates and personalized content right in your inbox </p>
        <div class="input-wrapper">
          <input @keyup.enter="addEmail" v-model="inputBox" placeholder="Submit Your Email..."  autocomplete="off"/>
          <button v-on:click="addEmail"></button>
          <div style="margin-top: 20px;" v-if="aftersubmit" >Thank You :)</div>
        </div>
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
        //console.log(response)
      })

      this.aftersubmit = true;
      
    }
  },
  components: {
    newspane
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
                /*color: white; */
                font-size: 24px;
                /* border: 1px solid white; */
                padding: 26px 26px;
                font-weight: bold;
                /* text-shadow: 2px 2px 6px #000; */
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
    section#webinar{
        background-color: white;
        padding: 70px 0 57px 0;
        .inner {
            text-align: left;
            img{
                margin-right: 55px;
                display: inline-block;
                width: 30.5%;
                max-width: 324px;
                vertical-align: top;
                @media all and (max-width: 700px){
                    display: block;
                    margin: 0 auto;
                }
            }
            .webinar-text{
                display: inline-block;
                width: 61%;
                @media all and (max-width: 700px){
                    width: 95%;
                    margin: 5px 20px;
                }
            }
            a{
                width: 313px;
                border-radius: 30px;
                height: 50px;
                font-size: 19px;
                display: block;
                background-color: #e2c3ff;
                text-decoration: blink;
                color: black;
                text-align: center;
                line-height: 47px;
            }
        }
        .iframe{
            margin-top: 30px;
        }
    }
    section#playlist{
        background-color: #f5f5f5;
        padding: 75px 0;
        img{
            display: inline-block;
            width: 300px;
            @media all and (max-width: 700px){
                display: block;
                margin: auto;
            }
        }
        .right{
            display: inline-block;
            width: calc(100% - 350px);
            vertical-align: top;
            text-align: left;
            margin-left: 33px;
            @media all and (max-width: 700px){
                display: block;
                width: 95%;
                margin: 35px auto 0px auto;
                text-align: center;
            }
            a{
                width: 250px;
                border-radius: 30px;
                height: 50px;
                font-size: 16px;
                display: block;
                background-color: #e2c3ff;
                text-decoration: blink;
                color: black;
                text-align: center;
                line-height: 47px;
                margin-top:30px;
                @media all and (max-width: 700px){
                    margin: 30px auto 5px auto;
                }
            }
        }
    }
    section#shop{
        padding: 70px 0 59px 0;
        background-color:white;
        a{
            width: 220px;
            border-radius: 30px;
            height: 50px;
            font-size: 16px;
            display: block;
            background-color: #e2c3ff;
            text-decoration: blink;
            color: black;
            text-align: center;
            line-height: 47px;
            margin: 22px auto 22px auto;
        }
        p{
            width: 95%;
            margin: 0 auto;
        }
    }
    section#representative{
        padding: 70px 0 70px 0;
        h1{
            @media all and (max-width: 400px) {
                font-size: 15px;
                margin: 10px;
                padding: 5px;
            }
        }
        .main{
            text-align: center;
            div{
                display: inline-block;
                vertical-align: top;
                width: 300px;
                min-height: 450px;
                padding: 10px 25px;
                margin: 15px;
                background-color: #fff;
                box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
                @media all and (min-width: 1280px){
                    width: 350px;
                }
                @media all and (max-width: 400px) {
                    width: 200px;
                    margin: 10px;
                }
            }
            img{
                padding: 5px;
                height: auto;
                width: 150px;
            }
            p{
                text-align: left !important;
                @media all and (max-width: 400px) {
                    font-size: 15px;
                }
            }
        }
        .footer{
            margin-top:70px;
            @media all and (max-width: 400px) {
                font-size: 12px;
                margin: 5px;
                padding: 5px;
            }
        }
    }
    section#subscribe{
        background-image: url(http://civil808.com/en/staticfile/3931.jpg);
        padding: 80px 0 90px 0;
        background-size: cover;
        background-position: center;
        h2{
            color: white;
            font-size: 34px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        p{
            margin: 0 10px 45px 10px;
            color: #000000;
            text-shadow: 1px 1px 1px #fff;
        }
        .input-wrapper{
            position: relative;
            width: 510px;
            margin: auto;
            @media all and (max-width: 700px){
                width: 300px;
            }
        }
        input{
            width: 510px;
            box-sizing: border-box;
            -webkit-transition: width 0.4s ease-in-out;
            transition: width 0.4s ease-in-out;
            border-radius: 30px;
            height: 50px;
            -webkit-appearance: button-bevel;
            padding: 0 17px;
            font-size: 12px;
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

