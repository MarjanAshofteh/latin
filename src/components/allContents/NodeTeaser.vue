<template>
    <md-card class="content-teaser" :class="[('content-'+ nid)]" md-with-hover 
        @click.native="_go(nid)">
      <md-ripple>  
        <md-card-media md-ratio="16:9">
          <img v-bind:src="pic | converturl" />
        </md-card-media>

        <md-card-header>
            <div class="md-subhead content-subheader">
                <div v-for="item in type" :key="item.tid" style="display: inline-block;">
                    <md-icon style="font-size: 19px !important;">{{item.name | TypesToIcon}}</md-icon> 
                    {{item.name}}
                </div>
                <span style="float: right;">{{date}}</span>
            </div>
            <div class="md-title content-title">{{title}}</div>
        </md-card-header>
      </md-ripple>  
    </md-card>
</template>

<script>
import news from '@/components/news'

export default {
    name: 'NodeTeaser',
    props: ['title','pic','date','nid','type'],
    methods:{
        _go(nid){
          window.location.href = "/node/"+ nid
        },
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
        },
        converturl: function(value){
            if (!value || value == "") return 'http://ed808.com/staticfile/nophoto.png'
            return value.replace('meysam.dev', 'civil808')
        },
        priceFormat: function(value){
            return parseFloat(value, 10).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString()//Math.round()
        },
        TypesToIcon: str => {
            switch(str){
                case 'video':
                    return 'play_circle_outline'
                break;
                case 'podcast':
                    return 'music_note'
                break;
                case 'picture':
                    return 'image'
                break;
                case 'ebook':
                    return 'book'
                break;
                case 'article':
                    return 'keyboard'
                break;
                default:
                return str
            }
        }
   }
}

</script>

<style lang="scss">
.content-teaser{
    width: 23%;
	margin: 15px 1%;
	-webkit-box-flex: 0;
	-ms-flex: 0 1 23%;
	flex: 0 1 23%;
	max-height: 370px;
    @media (max-width: 1280px){
    	width: 31.3%;
	    -ms-flex: 0 1 31.3%;
    	flex: 0 1 31.3%;
    }
    .content-subheader{
        text-align: left;
        margin: -5px 0 10px;
        font-size: 13px;
        overflow: hidden;
    }
}
.md-card .md-title.content-title {
    text-align: left;
	font-size: 18px;
	max-height: 64px;
	overflow: hidden;
}
.md-card-media img {
	max-width: 100%;
	margin: auto;
	display: block;
    max-height: 300px;
    width: inherit;
}
</style>

