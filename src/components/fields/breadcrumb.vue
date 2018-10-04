<template>
    <div class="breadcrumb">
        <router-link :to="'/'" class="first">Home</router-link>
        <router-link 
            v-for="(item, index) in links"
            :key="index"
            :to="item.url">
            {{item.title}}
        </router-link>
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
        padding: 5px 0px;
        color: #555;
        text-decoration: none;
        &:not(.first):before {
            content: "chevron_right";
            margin: 0 5px 0 0;
            font-family: material icons;
            color: #E91E63;
            font-size: 24px;
            vertical-align: middle;
        }
    }
}
</style>



