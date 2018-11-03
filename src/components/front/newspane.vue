<template>
    <div class="eventspane">
      <section id="events">
      <div class="md-headline">
        <h5>Upcoming Civil Engineering Events</h5>
        <div class="more-link"><router-link tag="md-button" to="/contents?type=4058">See All</router-link></div>
      </div>

      <div class="events-pane loading" v-if="loading">
        <md-progress-spinner 
          :md-diameter="100" 
          :md-stroke="5" 
          md-mode="indeterminate">
        </md-progress-spinner>
      </div>

      <carousel 
        :per-page="4" 
        :navigationEnabled="true" 
        navigationNextLabel="navigate_next"
        navigationPrevLabel="navigate_before"
        :paginationEnabled="false">
        <slide v-for="event in events" 
            :key="event.nid">
          <newsteaser 
            :newstitle="event.title" 
            :newscompany="event.company" 
            :newsdate="event.eventtime | erasetime" 
            :newsnid="event.nid"
            @setNid="show_event(event.nid)"/>
        </slide>
        </carousel>
      </section>
      <div v-if="eventNid != 0">
        <news 
          :nid="eventNid"
          @clearNid="eventNid = 0"/>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'
import newsteaser from '@/components/front/newsteaser'
import news from '@/components/front/news'
export default {
  name: 'newspane',
  data () {
    return {
      events:[],
      loading: true,
      eventNid: 0,
    }
  },
  mounted() {
    fetch('http://api.ed808.com/latin/event')
      .then(response => response.json())
      .then((data) => {
          this.events = data
          this.loading = false
    })
  },
  methods:{
    show_event(nid){
      this.eventNid = nid
    }
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
.eventspane{
  background-color: #fafafa;
	padding: 0 36px 36px;
  position: relative;
  .events-pane.loading {
    position: absolute;
    z-index: 3;
    width: 100%;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
section#events{
  width: 100%;
	margin: 0px auto 20px auto;
	padding: 0 36px;
  min-height: 300px;
}
.md-headline{
	padding: 35px 0;
	margin: 0 !important;
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
.more-link {
	background: #fafafa;
	z-index: 1;
	position: relative;
  float: right;
  button {
    margin: 0px 10px 0 10px;
    border: 1px solid #ddd;
    border-radius: 30px;
  }
}
</style>


