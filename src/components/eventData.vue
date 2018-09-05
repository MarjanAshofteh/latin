<template>
  <div class="event_header">
    <Countdown :deadline="date" v-if="date != null"></Countdown>
    <md-button v-if="registration_link != null" class="md-raised md-primary">
      <a :href="registration_link" target="_blank" rel="nofollow">Register Now</a>
    </md-button> 
    <div v-if="(date != null) || (time != null) || (organizer != null) || (place != null)" class="event_bottom">
      <div v-if="date != null" class="feature">
        <md-icon class="md-size-2x">date_range</md-icon>
        <span>Date</span>
        <span class="event_data">{{date}}</span>
      </div>
      <div v-if="time != null" class="feature">
        <md-icon class="md-size-2x">alarm</md-icon>
        <span>Time</span>
        <span class="event_data">{{time}}</span>
      </div>
      <div v-if="organizer != null" class="feature">
        <md-icon class="md-size-2x">home</md-icon>
        <span>Organizer</span>
        <span class="event_data">{{organizer}}</span>
      </div>
      <div v-if="place != null" class="feature">
        <md-icon class="md-size-2x">place</md-icon>
        <span>Place</span>
        <span class="event_data">{{place}}</span>
      </div>
      <!--<p v-if="webinar_covered == 1">
        <span>This webinar is covered by 808 company throw go to webinar website</span>
      </p>-->
    </div>
  </div>
</template>

<script>
import Countdown from 'vuejs-countdown'

export default {
  name: 'eventData',
  props: ['date','time','organizer','place','webinar_covered','registration_link'],
  filters:{
    erasetime: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split(' ')[0]
    }
  },
  components:{
    Countdown
  }
}
</script>

<style lang="scss">
  .vuejs-countdown{
    margin: 0px 0 15px 0 !important;
    li:after {
      top: 7px!important;
      font-size: 20px !important;
      font-weight: bold;
    }
    .digit {
      font-size: 26px !important;
    }
  }
  .event_header{
    color: #a7a7a7 !important;
    width: 100%;
  }
  .md-primary{
    a{
      color: #fff !important;
    }
  }
  .event_bottom{
    position: absolute;
    bottom: -111px;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), -2px 2px 4px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
    .feature {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      border-left: 1px solid #eee;
      &:last-child {
        border-left: 0px;
      }
      .md-icon{
        font-size: 30px !important;
        color: #b5b5b5;
        width: 30px !important;
        height: 30px !important;
      }
      .event_data{
        color: black;
        padding: 11px 0 0 0;
        font-size: 15px;
      }
    }
  }
</style>
