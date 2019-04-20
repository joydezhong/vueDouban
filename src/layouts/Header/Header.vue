<template>
	<div>
		<div class="mdui-appbar mdui-appbar-fixed">
	    <div class="mdui-toolbar mdui-color-theme">
	      <a href="javascript:;" class="mdui-btn mdui-btn-icon" @click="handleMenu(!isClick)"><i class="mdui-icon material-icons">menu</i></a>
	      <a href="#/" class="mdui-typo-headline">LOGO</a>
	      <a href="javascript:;" class="mdui-typo-title">标题</a>
	      <div class="mdui-toolbar-spacer"></div>
	      <a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '搜索'}">
	      	<i class="mdui-icon material-icons">search</i>
	      </a>
	      <a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '刷新'}">
	      	<i class="mdui-icon material-icons">refresh</i>
	      </a>
	      <a href="javascript:;" @click="handleDialog(!isDialog)" mdui-dialog="{target: '#login-modal'}" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '登陆或注册'}">
	      	<i class="mdui-icon material-icons">transfer_within_a_station</i>
	      </a>
	    </div>
	  </div>
	  <loginDialog :isDialog="isDialog" />
	</div>
</template>

<script>

import loginDialog from "../../components/loginDialog"

export default {
  name: 'Header',
  components: {
    loginDialog
  },
  data() {
    return{
       isClick: true,
       isDialog: false,
    }
  },
  mounted() {

  },
  methods: {
    handleMenu(v){
      this.isClick = v;
      this.$emit('upMenu', this.isClick);

    },
    handleDialog(v){
    	this.isDialog = v;
    }
  }
}
</script>


<style scoped>
	.mdui-appbar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #ecf4ec;
	}
</style>
