<template>
    <md-card class="news-teaser md-accent" md-with-hover>   
      <md-ripple>
        <md-card-header>
          <div class="md-title"> {{newstitle}} </div>
          <div class="md-subhead"> </div>
        </md-card-header>

        <md-card-content>
          <b>Date:</b> {{newsdate}}
        </md-card-content>
        <md-card-content>
          <b>Organizer:</b> {{newscompany}}
        </md-card-content>

        <md-card-actions>
          <md-button @click="set_news(newsnid)">read more</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
</template>

<script>
import news from '@/components/news'

export default {
    name: 'newsteaser',
    props: ['newstitle','newsdate','newscompany','newsnid'],
    methods:{
        set_news(nid){
            this.$store.commit('SET_NEWS', nid);
        }
    },
    components: {
        news
    }
}

</script>

<style>
    .md-card.news-teaser{
        background-color:white;
        min-height: 240px;
    }
    .md-card .md-title {
        font-size: 15px;
        letter-spacing: 0;
        line-height: 21px;
    }
    .md-card-content{
        padding: 4px 16px;
    }
    .md-ripple{
        text-align: left;
    }
    .md-subhead b{
        color:#333
    }
</style>

