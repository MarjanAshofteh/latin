<template>
  <md-content>
    <p v-if="date">
      <b>Date : </b>
      <span>{{date | erasetime}}</span>
    </p>
    <p v-if="time">
      <b>Time : </b>
      <span>{{time}}</span>
    </p>
    <p v-if="organizer">
      <b>Organizer : </b>
      <span>{{organizer}}</span>
    </p>
    <p v-if="place">
      <b>Place : </b>
      <span>{{place}}</span>
    </p>
    <p v-if="webinar_covered == 1">
      <span>This webinar is covered by 808 company throw go to webinar website</span>
    </p>
    <p v-if="registration_link">
      <span>For registration click 
        <a :href="registration_link" target="_blank" rel="nofollow">here</a>
        .
      </span>
    </p>
  </md-content>
</template>

<script>
export default {
  name: 'eventData',
  props: ['date','time','organizer','place','webinar_covered','registration_link'],
  filters:{
    erasetime: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split(' ')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin main-center-content(){
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
  }
  .md-content{
    @include main-center-content();
  }
</style>
