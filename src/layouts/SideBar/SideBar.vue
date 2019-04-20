<template>
	<div class="mdui-drawer" id="drawer">
	  <ul class="mdui-list" mdui-collapse="{accordion: true}">

	  	<template v-for="(item, index) in sideMenu">
	  		<li class="mdui-collapse-item" :key="index">
			    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
			      <i class="mdui-list-item-icon mdui-icon material-icons">{{item.icon}}</i>
			      <div class="mdui-list-item-content">{{item.name}}</div>
			      <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
			    </div>
			    <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
			    	<template v-for="(n, i) in item.children">
			    		<li class="mdui-list-item mdui-ripple" :key="n.name + i"><router-link :to="n.path">{{n.name}}</router-link></li>
			    	</template>
			    </ul>
			  </li>
      </template>

	    <!--<li class="mdui-collapse-item">
		    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
		      <i class="mdui-list-item-icon mdui-icon material-icons">people</i>
		      <div class="mdui-list-item-content">阅读管理</div>
		      <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
		    </div>
		    <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
		      <li class="mdui-list-item mdui-ripple"><router-link to="/bookLists">书本列表</router-link></li>
		      <li class="mdui-list-item mdui-ripple"><router-link to="/bookTops">书本排行榜</router-link></li>
		    </ul>
		  </li>
	    <li class="mdui-list-item mdui-ripple">
	      <i class="mdui-list-item-icon mdui-icon material-icons">star</i>
	      <div class="mdui-list-item-content">菜单项二</div>
	      <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
	    </li>
	    <li class="mdui-collapse-item">
		    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
		      <i class="mdui-list-item-icon mdui-icon material-icons">people</i>
		      <div class="mdui-list-item-content">菜单包含子菜单</div>
		      <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
		    </div>
		    <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
		      <li class="mdui-list-item mdui-ripple">下拉子项一</li>
		      <li class="mdui-list-item mdui-ripple">下拉子项二</li>
		      <li class="mdui-list-item mdui-ripple">下拉子项三</li>
		      <li class="mdui-list-item mdui-ripple"><router-link to="/bookLists">书本列表</router-link></li>
		    </ul>
		  </li>-->
	  </ul>
	</div>
</template>

<script>
	import Vue from "vue";
	import sideMenu from "../../menuConfig";

	export default {
	  name: 'SideBar',
	  data() {
	    return {
	    	inst: {},
	    	sideMenu: sideMenu,
	    }
	  },
	  mounted() {
	    this.inst = new mdui.Drawer('#drawer');
	  },
	  methods: {
	  	handleSideBar(v){
				if(v){
	  			this.inst.open();
	  		}else{
	  			this.inst.close();
	  		}
	  	}
	  },
	  computed: {
			isClick: {
	      get () {
	      	console.log(this.$store.state, 'store')
	        return this.$store.state.isClick
	      }
	    },
		}

	}
</script>


<style scoped>
	.mdui-list-item-content{
		text-align: left;
	}
	.mdui-list-item a{
		display: flex;
    min-height: 48px;
    line-height: 48px;
		text-align: left;
	}
</style>
