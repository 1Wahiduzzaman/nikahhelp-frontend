<template>
	<div>
		<h1>Loading</h1>
	</div>
</template>

<script>
export default {
	name: "VerifyEmail",
	created() {
		this.verifyEmail();
	},
	methods: {
		async verifyEmail() {
			const actionPayload = {
				token: this.$route.params.token,
			};
			try {
				await this.$store.dispatch("verify", actionPayload);
				this.$router.push("/email-verification-success");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
</style>