<template>
    <div class="newspane">
      <section id="news">
      <div class="md-headline">
        <h5>Upcoming Civil Engineering Events</h5>
      </div>
      <carousel 
        :per-page="4" 
        :navigationEnabled="true" 
        navigationNextLabel="navigate_next"
        navigationPrevLabel="navigate_before"
        :paginationEnabled="false">
        <slide v-for="news in newss" 
            :key="news.nid">
          <newsteaser 
            :newstitle="news.title" 
            :newscompany="news.field_company_value" 
            :newsdate="news.field_eventtime_value | erasetime" 
            :newsnid="news.nid"/>
        </slide>
        </carousel>
      </section>
      <div v-if="$store.state.newsnid!=0">
        <news/>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'
import newsteaser from '@/components/newsteaser'
import news from '@/components/news'
export default {
  name: 'newspane',
  data () {
    return {
      newss:[]
    }
  },
  mounted() {
    fetch('http://api.ed808.com/latin/latin_news?hash=21567cb05bd1fa6fa9d20ea55b4f26b6f90446f7726bc305dbc2c9f7c2fcf054')
      .then(response => response.json())
      .then((data) => {
          this.newss = data
    })
  },
  components: {
    Carousel,
    Slide,
    newsteaser,
    news
  },
  filters: {
    erasetime: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.split(' ')[0]
    }
  }
}
</script>

<style lang="scss">

.VueCarousel-slide{
  padding: 10px;
  width:316px !important;
}
button.VueCarousel-navigation-button{
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color:white !important;
  font-family: Material Icons;
  font-size: 30px;
  text-align: center;
  line-height: 30px;
  padding: 0 !important;
  color:#92278f !important;
}
.newspane{
  background-color: #fafafa;
	padding: 0 36px 36px;
}
section#news{
  width: 100%;
	margin: 0px auto 20px auto;
	padding: 0 36px;
}
.md-headline{
	padding: 35px 0;
	margin: 0;
	position: relative;
  text-align: left;
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    background: #ddd;
    position: absolute;
    top: 53px;
  }
  h5{
    margin: 0;
    font-weight: normal;
    display: inline-block;
    background: #fafafa;
    z-index: 1;
    position: relative;
    padding-right: 15px;
  }
}

</style>


