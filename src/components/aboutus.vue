
<template>
  <div class="aboutus">
      <div class="top-pic">
        <h1>about us</h1>
      </div>
      <div class="inner">
          <div class="atext">
              <p dir="ltr">Educational and Engineering Institute 808 (established in 2008, Iran, Tehran) is proud to use all its efforts for education in two fields:&nbsp;&nbsp;</p><p dir="ltr">Structural and Earthquake engineering. 808 activities are divided in two categories, online and offline training courses, on the website. Combining technology and the newest global experiences in all fields of civil and architectural engineering, 808 is working with a special view in connection of engineering knowledge and industry. From the beginning, outlook of 808 was to internationalize its services and eliminate boundaries in transfer of civil engineering and architectural knowledge between professionals all around the world and now we are at this point. We are proud to announce that by launching English page focusing on performance-based-design in April 2018, 808 will have a great step towards its goal; but this is the beginning.</p><p dir="ltr">Join us.</p><p dir="ltr">&nbsp;</p><p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Website</strong> : Civil808.com</p><p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Email</strong> : info [at] civil808.com , saze808 [at] gmail.com</p><p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Tel</strong> : +98 21 88275253 , +98 21 88272694</p><p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Address</strong> : Iran, Tehran, Jalal-e-Al-e-Ahmad Hwy, Gisha Bridge, Foroozanfar Blv, No. 1, Unit 7</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'aboutus'
}
</script>

<style scoped>
    .atext{
        margin: 50px 0;
        text-align:left;
    }
    h1{
        padding-top: 100px;
        text-shadow: 0px -1px 5px #000000, 0 -1px 0px #000000;
        color: white;
        position: relative;
        font-size: 35px;
    }
    .inner{
        padding: 0 20px;
    }
    .top-pic{
        background-image: url(http://civil808.com/en/staticfile/conf.jpg);
        background-size: cover;
        background-position: center;
        height: 241px;
        position: relative;
        margin-top: 50px;
    }
    .top-pic:before {
        content: '';
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background-color: #0000005e;
    }
</style>
