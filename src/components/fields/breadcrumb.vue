<template>
    <div class="breadcrumb">
        <router-link :to="'/'">Home</router-link>
        <template v-for="(item, index) in links">
            <span> > </span>
            <router-link 
                :to="item.url">
                {{item.title}}
            </router-link>
        </template>
    </div>
</template>

<script>

export default {
    name: 'breadcrumb',
    props: ['links']
}
</script>
<style lang="scss" scoped>
.breadcrumb{
    padding: 10px 10px;
    a{
        padding: 5px 10px;
        color: #555;
    }
    span{
        margin: 0 5px;
        color: #9C27B0;
    }
}
</style>



