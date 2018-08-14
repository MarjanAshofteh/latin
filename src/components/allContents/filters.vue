<template>
    <div class="filters" style="position: relative;">
      <div class="loading" v-if="$store.state.filtersLoading">
        <md-progress-spinner 
          :md-diameter="50" 
          :md-stroke="2"
          md-mode="indeterminate" 
          style="position: fixed;top: calc(50% - 50px);">
        </md-progress-spinner>
      </div>
      <div class="md-card" style="margin-bottom: 15px;" v-for="item in filters" :key="item.tid" v-if="item.tid">
        <md-toolbar style="min-height: 50px;" :md-elevation="0">
          <span class="md-subheading">{{item.name}}</span>
        </md-toolbar>
        <md-list class="md-scrollbar" style="max-height: 250px;overflow: overlay;">
          <md-checkbox 
            v-for="sub_item in item.children" :key="sub_item.tid" 
            v-model="$store.state.selected['t'+ item.tid]" 
            :value="sub_item.tid">
              {{sub_item.name}}
          </md-checkbox>
        </md-list>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filters',
  data () {
    return {
      filters:[],
    }
  },
  mounted() {
    fetch('http://api.ed808.com/latin/latin_contents/all/filters?parameter[hash]=f275ebb87f408796b11f651b929293edf639554efb9e014c53c8b8d8e0f9db45')
      .then(response => response.json())
      .then((data) => {
        this.filters = data

        //making a dictionary for filters
        var filters = {}
        data.forEach(category => {
          filters[category.tid] = category.name
          category.children.forEach(child => {filters[child.tid] = child.name})
        })
        this.$store.commit('SET_FILTERS', filters)

        setTimeout(() => {this.$store.commit('CLEAR_LOADING', 'filtersLoading')}, 300)
    })
  },
}
</script>

<style lang="scss">
div.md-checkbox {
  margin: 5px 16px 6px 0;
  min-height: 20px;
}
label.md-checkbox-label {
	white-space: nowrap;
}
.filters.md-layout-item{

  @media (max-width: 1280px) {
    min-width: 25%;
	  max-width: 25%;
	  flex: 0 1 25%;
  }
}
</style>


