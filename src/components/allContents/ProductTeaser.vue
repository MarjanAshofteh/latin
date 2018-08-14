<template>
    <md-card class="product-teaser" :class="[('product-'+ nid), {'vijeh': has_discount}]" md-with-hover 
        @click.native="_go(nid)">
      <md-ripple>  
        <md-card-media v-if="pic" md-ratio="1:1">
          <img v-bind:src="pic | converturl" />
        </md-card-media>

        <span class="discount" v-if="has_discount">فروش ویژه</span>

        <md-card-header>
          <div class="md-subhead" style="text-align: right;opacity: 1;"> {{title}} </div>
        </md-card-header>
        <p class="list-price price" v-if="has_discount && status != 'unavailable'">{{listPrice | priceFormat}} <span>تومان</span></p>
        <p class="sell-price price" v-if="status != 'unavailable'">{{sellPrice | priceFormat}} تومان</p>
        <p style="padding: 0px 15px;color: #F44336;font-weight: bold;" v-else>نا موجود</p>

      </md-ripple>  
    </md-card>
</template>

<script>
import news from '@/components/news'

export default {
    name: 'ProductTeaser',
    props: ['title','pic','date','nid','listPrice','sellPrice','status'],
    methods:{
        set_news(nid){
            this.$store.commit('SET_NEWS', nid);
        },
        _go(nid){
          window.location.href = "http://civil808.com/node/"+ nid
        },
    },
    computed: {
        has_discount: function(){
            return parseInt(this.listPrice) > parseInt(this.sellPrice)
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
            if (!value) return ''
            return value.replace('meysam.dev', 'civil808')
        },
        priceFormat: function(value){
            return parseFloat(value, 10).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").toString()//Math.round()
        }
   }
}

</script>

<style lang="scss">
.product-teaser{
    width: 19%;
	margin: 15px 1%;
	-webkit-box-flex: 0;
	-ms-flex: 0 1 19%;
	flex: 0 1 18%;
	max-height: 370px;
    @media (max-width: 1280px){
    	width: 23%;
	    -ms-flex: 0 1 23%;
    	flex: 0 1 23%;
    }
    &:hover span.discount{
        padding: 2px 12px;
    }
    &.vijeh {
        border-top: 3px solid #F44336;
    }
}
.price{
	text-align: right;
	padding: 0px 15px;
	font-size: 1.1em;
    color: rgb(46, 125, 50);
    margin: 1em 0;
    &.list-price {
    	text-decoration: line-through;
    	color: rgba(255,0,0,0.75);
    	font-size: 12px;
    	margin: -5px 0 -15px 0px;
    }
}
.md-subhead {
	height: 40px;
	overflow: hidden;
}
.md-card-media img {
	max-width: 100%;
	margin: auto;
	display: block;
    max-height: 300px;
    width: inherit;
}
span.discount {
	background: #F44336;
	color: #fff;
	padding: 2px 6px;
	font-size: 11px;
	left: 0px;
	top: 10px;
	letter-spacing: -0.35px;
	transition: all 0.2s ease;
	position: absolute;
}
</style>

