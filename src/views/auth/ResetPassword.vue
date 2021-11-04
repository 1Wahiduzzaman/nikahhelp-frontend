<template>
	<div>
		<div class="reset-password">
			<div class="inner">
				<a href="/" class="logo"><img src="@/assets/logo.png" alt="logo" /></a>
				<form class="form" @submit.prevent="handleSubmit">
					<Spinner v-if="isLoading" />
					<p v-else-if="error">
						{{ error }}
						<a
							class="btn btn-sm btn-outline-primary btn-round-sm ms-2 text-nowrap"
							href="/login"
							>Sign in
						</a>
					</p>
					<div v-else>
						<div class="mb-3">
							<input
								type="email"
								class="form-control"
								id="email"
								v-model="email"
								placeholder="Enter email"
							/>
						</div>
						<div class="mb-3">
							<input
								type="password"
								class="form-control"
								id="password"
								v-model="password"
								placeholder="Password"
							/>
						</div>
						<div class="mb-3">
							<input
								type="password"
								class="form-control"
								id="passwordConfirm"
								v-model="passwordConfirm"
								placeholder="Confirm Password"
							/>
						</div>
						<p v-if="!formIsValid" class="warning">
							Invalid Email or Password didn't match
						</p>
						<button type="submit" class="btn btn-primary w-100">
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
export default {
	name: "ResetPassword",
	components: {
		Footer,
		Spinner,
	},
	data() {
		return {
			email: "",
			password: "",
			passwordConfirm: "",
			isLoading: false,
			error: null,
			formIsValid: true,
			message: null,
		};
	},
	methods: {
		async handleSubmit() {
			// Todo -- form validation. and success message
			this.formIsValid = true;
			if (
				this.email === "" ||
				!this.email.includes("@") ||
				this.password !== this.passwordConfirm
			) {
				this.formIsValid = false;
				return;
			}
			this.isLoading = true;
			const actionPayload = {
				email: this.email,
				password: this.password,
				token: this.$route.params.token,
			};
			//console.log(actionPayload);
			try {
				await this.$store.dispatch("resetPassword", actionPayload);
				this.$router.push("/login");
			} catch (error) {
				this.error = "Something went wrong try again!";
			}
			this.isLoading = false;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.reset-password {
	min-height: 100vh;
	background-color: #522e8e;
	background-image: linear-gradient(
		0deg,
		#522e8e 0%,
		#932784 46%,
		#e02076 100%
	);
	.inner {
		max-width: 400px;
		margin: 0 auto;
		padding: 50px 15px;
		text-align: center;
		.logo {
			max-width: 250px;
			display: inline-block;
			margin-bottom: 20px;
		}
		.form {
			background: $bg-white;
			padding: 50px 20px;
			border-radius: 5px;
			.warning {
				color: red;
				font-size: 14px;
				margin-top: 5px;
			}
		}
	}
}
</style>