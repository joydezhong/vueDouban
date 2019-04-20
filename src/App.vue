<template>
  <div id="app">
    <Header @upMenu="onMenu"/>

    <SideBar ref="sidebar" />
    <div class="mdui-container doc-container doc-no-cover">
      <router-view/>
    </div>

  </div>
</template>

<script>

import Header from './layouts/Header'
import SideBar from './layouts/SideBar'

export default {
  name: 'app',
  data() {
    return {

    }
  },
  components: {
    Header,
    SideBar
  },
  mounted() {

  },
  methods: {
    onMenu(v){
      this.downSideBar(v);
    },
    downSideBar(v){
      this.$refs.sidebar.handleSideBar(v);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
.mdui-container{
  margin-top: 40px;
  text-align: left;
}
</style>
