<template>
	<div>
		<router-view />
	</div>
</template>

<script>
export default {
data(){
	return {};
},
created(){
	console.log('created called from app.vue');
	var user_id = this.$store.state.user.user.id;//this.user_id;
	if(user_id !== null || user_id !== ""){
		console.log('inbox loaded for:',user_id);
		this.$store.dispatch('getConversations',user_id);
		this.$store.dispatch('getMsgs');
		this.$store.dispatch('getUnreadRecords',user_id);
	}
}
}
</script>



<style lang="scss">
@import "../node_modules/ant-design-vue/dist/antd.css";
@import "@/styles/style";

.ant-card-head-title {
	font-size: 50px;
}
</style>
