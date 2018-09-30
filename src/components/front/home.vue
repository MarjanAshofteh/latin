<template>
  <div>
    <section id="banner">
      <!--<img src="http://civil808.com/en/staticfile/top-banner.jpg" alt="">-->
      <div>
        <h1>808 Educational and Engineering institute</h1>
        <span>specialized training in Civil and Architecture
          <span>Ed808.com</span>
        </span>
      </div>
    </section>

    <newspane/>

    <!--<NodeList :filterEnabled="false" class="md-card md-theme-default md-layout-item md-size-80"/>-->

  </div>
</template>

<script>
import axios from 'axios'
import newspane from '@/components/front/newspane'
import NodeList from '@/components/allContents/NodeList'

export default {
  name: 'home',
  components: {
    newspane,
    NodeList
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
        &:before,
        &:after{
          content: '';
          position: absolute;
          background-color: white;
          width: 100px;
          height: 1px;
          bottom: 0;
        }
        &:before{
          left: 0;
        }
        &:after{
          right: 0;
        }
      }
    }
  }
  .page-iframe .mejs-container{
      padding-bottom: 53% !important;
  }
  .admin-error{
      display: none;
  }
</style>

