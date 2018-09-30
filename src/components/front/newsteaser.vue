<template>
    <md-card class="news-teaser" md-with-hover>   
        <md-card-header>
          <div class="md-title"> {{newstitle}} </div>
          <div class="md-subhead"> </div>
        </md-card-header>

        <md-card-content>
            <md-icon>timer</md-icon>
            {{newsdate}}
            <span class="tooltip">Date</span>
        </md-card-content>
        <md-card-content class="company">
            <md-icon>supervised_user_circle</md-icon>
            {{newscompany}}
            <span class="tooltip">Organizer</span>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised" @click="set_news(newsnid)">more</md-button>
        </md-card-actions>

        <md-card-content class="date-fan">
            <div class="day">{{newsdate | day_detecter}}</div>
            <div class="month">{{newsdate | month_detecter}}</div>
            <div class="year">{{newsdate | year_detecter}}</div>
        </md-card-content>
    </md-card>
</template>

<script>
import news from '@/components/front/news' 

export default {
    name: 'newsteaser',
    props: ['newstitle','newsdate','newscompany','newsnid'],
    methods:{
        set_news(nid){
            this.$emit('setNid');
        }
    },
    components: {
        news
    },
    filters: {
        year_detecter: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.split('-')[0]
        },
        month_detecter: function (value) {
            if (!value) return ''
            value = value.toString()
            if(value.split('-')[1] == '01') return 'Jan'
            else if(value.split('-')[1] == '02') return 'Feb'
            else if(value.split('-')[1] == '03') return 'Mar'
            else if(value.split('-')[1] == '04') return 'Apr'
            else if(value.split('-')[1] == '05') return 'May'
            else if(value.split('-')[1] == '06') return 'Jun'
            else if(value.split('-')[1] == '07') return 'Jul'
            else if(value.split('-')[1] == '08') return 'Aug'
            else if(value.split('-')[1] == '09') return 'Sep'
            else if(value.split('-')[1] == '10') return 'Oct'
            else if(value.split('-')[1] == '11') return 'Nov'
            else if(value.split('-')[1] == '12') return 'Dec'
        },
        day_detecter: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.split('-')[2]
        }
   }
}

</script>

<style lang="scss">
    .md-tooltip-left{
        margin-top:-74px;
        margin-right:-15px; 
    }
    .md-card.news-teaser{
        //background-color:white;
        min-height: 240px;
        text-align: left;
        position: relative;
        .md-title {
            font-size: 15px;
            letter-spacing: 0;
            line-height: 21px;
            min-width:240px;
        }
        .md-card-content{
            padding: 4px 16px;
            &:hover span.tooltip{
                margin-left: 10px;
                opacity: 1;
            }
        }
        .md-subhead b{
            color:#333
        }
        .md-card-actions {
            position: absolute;
            right: 0px;
            bottom: 0;
        }
        .company{
            margin-bottom: 65px;
        }
        span.tooltip {
            background: #ddd;
            font-size: 12px;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 0;
            opacity: 0;
            transition: all 0.2s ease;
        }
        .md-card-content.date-fan {
            position: absolute;
            bottom: 0;
            z-index: -1;
            .day {
                font-size: 47px;
                color: #eee;
                position: absolute;
                left: 9px;
            }
            .month {
                /* position: absolute; */
                margin: 3px 0 0 45px;
                font-size: 20px;
                color: #eee;
            }
            .year {
                color: #dadada;margin-left: 31px;
            }
        }
    } 
</style>

