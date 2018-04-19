<template>
    <div class="newsparent">
        <div class="newsinner">
            <div class="newsin">
                <div class="newstext">
                    {{newstitle}}
                </div>
                <div class="datenews">
                    <div>
                        {{newscompany}}
                    </div>
                    <button @click="set_news(newsnid)">read more...</button>
                    <div>
                        <span class="f">{{newsdate}}</span>
                        <span class="f"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    .newsparent {
        padding: 4px;
        width: 205px;
        height: 243px;
        display: flex;
        font-size: small;
        font-family: arial,sans-serif;
        text-align: left;
    }
    .newsinner {
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        padding: 16px;
        background-color: #fff;
        border-radius: 2px;
        display: block;
        overflow: hidden;
        width:100%;
    }
    .newstext {
        min-height: 72px;
        text-align: left;
        margin-bottom: 30px;
        -webkit-box-flex: 1;
        flex: 1 0 auto;
        line-height: 18px;
        white-space: normal;
        word-wrap: break-word;
    }
    .datenews {
        -webkit-box-align: end;
        align-items: flex-end;
        align-items: flex-end;
    }
    .newsin{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>

