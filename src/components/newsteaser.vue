<template>
    <md-card class="news-teaser" md-with-hover>   
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
          <md-button class="md-raised" @click="set_news(newsnid)">read more</md-button>
        </md-card-actions>
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

<style lang="scss">

    .md-card.news-teaser{
        //background-color:white;
        min-height: 240px;
        text-align: left;
        .md-title {
            font-size: 15px;
            letter-spacing: 0;
            line-height: 21px;
            min-width:200px;
        }
        .md-card-content{
            padding: 4px 16px;
        }
        .md-subhead b{
            color:#333
        }
    } 
</style>

