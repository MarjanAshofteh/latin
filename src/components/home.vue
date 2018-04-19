<template>
  <div>
    <section id="webinar">
      <!--<div class="top">
        <div class="top-in">
          <h1>Free Live Webinar of the Fourth Conference on Performance-Based Structural Design using SeismoBuild</h1>
          <h2>Live Webinar</h2>
          <div >
            <p>Saturday, February 17, 2018 - 4:00 pm (Tehran zone:tehran)</p>
          </div>
          </div>
      </div>-->
      <div class="inner">
        <img src="http://civil808.com/sites/all/themes/sara/images/seismosoft.png"  width="324" height="444">
        <div class="webinar-text">
          <p>SeismoBuild is an innovative Finite Elements package for the seismic assessment and strengthening of reinforced concrete framed structures that is targeted to the design office. The program is capable of fully carrying out the Code defined assessment methodologies from the structural modelling, through to the required analyses, and the corresponding member checks.</p>
          <p><strong>Speaker:</strong></p>
          <p>Dr. Stelios Antoniou, Co-founder, Managing Director and R&amp;D Director of the Seismosoft Company</p><p><strong>Program:</strong></p><ul><li>Unveiling of SeismoBuild software in accordance with ASCE41 Code to evaluate and retrofit buildings</li><li>Training workshop on the different types of Seismosoft Softwares</li></ul><p><strong>Conference Date:</strong></p><p>17 February 2018 (Concurrent with the 4th International Conference on Structural Engineering)</p><p><strong>Organizer:</strong></p><p>808 Engineering Education Institute, Official representative of Seismosoft Company in Iran</p><p><strong>Sponsors:</strong></p><ul><li>Iranian Society of Structural Engineering,</li><li>Behsazandishan Company,</li><li>Seismosoft Company</li></ul><b>Watch The Webinar:</b>
          <!--<a href="http://civil808.com/gallery/videos/playlist/3573/18332"> Watch It </a>-->
        </div>
        
      </div>
    </section>

    <section id="intro">
      <div style="margin:10px auto 20px;position:relative;width:840px;height:500px;"><div style="position:relative;width: 100%;padding-bottom: 56.25%;"><iframe allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src ="http://www.civil808.com/file/iframe/18332" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div></div>
    </section>

    <section class="playlist">
      <div class="inner">
        <img src="http://civil808.com/seismosoft/playlist.jpg" alt="">
        <div class="right">
          <h2>Educational Videos for SeismoStruct</h2>
          <p>
            In this tutorial, a steel concentrically braced frame is considered and modeled in SeismoStruct. Behaviors of the frame from experimental and numerical results are obtained and compared in terms if hysteretic behavior and dissipated energy. This tutorial also demonstrates how to obtain digitized data from a curve in a PDF file or a curve photograph
          </p>
          <b>This video prepared by Civil808 , Official representative of Seismosoft products in Iran</b>
          <a target="_blank" href="http://civil808.com/gallery/videos/playlist/3522/18106">Start Learning</a>
        </div>
      </div>
    </section>

    <section id="intro" class="add">
      <div class="inner">
      <h2>Steel Frame with Infill Panel-Nonlinear Time History Analysis</h2>
      <p>In this short tutorial the process of modeling a 3D 1-story steel structure with the brick infill panel is tutored in the Seismostruct software. The building behavior is evaluated under earthquake accelerogram by implementing a nonlinear dynamic analysis. The nonlinear behavior of the both structure as well as the infill panel is taken into account. All the process from modeling to extracting the results are described in detail.</p>
      <a target="_blank" href="http://civil808.com/node/18212">More Information</a>
      <div style="margin:10px auto 20px;position:relative;width:840px;height:500px;">
        <div style="position:relative;width: 100%;padding-bottom: 56.25%;">
          <iframe allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src ="http://www.civil808.com/file/iframe/18471" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>
        </div>
      </div>
    </section>

    <div class="section">
        <h3 class="title">
            Educational and Engineering Institute 808
            ,
            Official representative of Seismosoft products in Iran
        </h3>
        <div class="main">
            <div class="left seismoStruct">
                <img src="http://civil808.com/seismosoft/seismostruct.png"/>
                <h3>SeismoStruct</h3>
                <p>
                    is an award-winning program developed for the accurate analytical assessment of different classes of structures, such as buildings, bridges or industrial plants, subjected to earthquake strong motion. It features a number of verified nonlinear static and dynamic analysis methods (pushover, incremental dynamic analysis, etc.) so as to meet the analytical requirements posed by the modern performance-based seismic assessment and design philosophy.
                </p>
            </div>
            <div class="middle seismoSignal">
                <img src="http://civil808.com/seismosoft/seismosignal.png"/>
                <h3>SeismoSignal</h3>
                <p>
                    constitutes a simple, yet efficient, package for the processing of strong-motion data. Amongst other things, it allows for the derivation of elastic and constant ductility inelastic response spectra, computation of Fourier amplitude spectra, filtering of high and low frequency record content and estimation of other important seismological parameters, such as the Arias Intensity and the significant and effective durations.
                </p>
            </div>
            <div class="right seismoApps">
                <img src="http://civil808.com/seismosoft/seismostruct.png"/>
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
                Contact us via an edu@civil808.com if you would like to order free products of Seismosoft
                ,
                Educational and Engineering Institute 808
            </h4>
        </div>
    </div>

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
export default {
  name: 'home',
  data () {
    return {
      inputBox:'',
      aftersubmit:false
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
