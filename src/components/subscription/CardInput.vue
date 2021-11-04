<template>
	<div class="card-input">
		<div v-if="!this.payment_method" class="card-input form-group">
			<div class="form-group mt-2">
				<label for="name" class="text-white ml-2">Name on Card</label>
				<input
					type="text"
					id="name"
					class="w-100 p-2"
					v-model="name"
					placeholder="Your name on card"
				/> 
			</div>
			<div class="form-group">
				<label for="billingAddress" class="text-white ml-2">Country </label>
				<!-- <input
					type="text"
					id="billingAddress"
					class="w-100 p-2"
					v-model="country"
					placeholder="Example: US, CA, BD"
				/> -->
				<select class="custom-select" v-model="country">
					<option value="" disabled>Select Country</option>
					<option
						v-for="c in $store.state.candidateInfo.countries"
						:value="c.code"
						:key="c.id"
					>
						{{ c.name }} - {{ c.code }}
					</option>
				</select>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="postCode" class="text-white ml-2">Post Code </label>
					<input
						type="text"
						id="postCode"
						class="w-100 p-2"
						v-model="postCode"
						placeholder="Example: 1234"
					/>
				</div>
				<div class="form-group col-md-6">
					<label for="country" class="text-white ml-2">City </label>
					<input
						type="text"
						id="country"
						class="w-100 p-2"
						v-model="city"
						placeholder="New York"
					/>
				</div>
			</div>
			<label for="" class="text-white ml-2">Card Number</label>
			<div ref="card" class="form-control rounded-pill"></div>
			<div class="mt-2 text-center">
				<button class="btn btn-primary validate-button" @click.prevent="submitPayment">
					Validate
				</button>
			</div>
		</div>
		<div v-else class="text-center mt-5">
			<h4 class="text-white">
				Your card has been validated successfully, click "Agree and Subscribe"
				to complete the payment.
			</h4>
		</div>
	</div>
</template>

<script>
let stripe = Stripe(
	"pk_test_51ItV6RKl6A9Ix8PFs3EhQ7mmGV2oi07Bh7jIZ5uyvvecuN7Q4Z8C3D5KdtKF3qh2FVbeAaY9hTQcc9MeTWOXarrO00qMGea7ET"
);
let elements = stripe.elements();
const style = {
	base: {
		border: "2px solid #aaa",
		borderRaidus: "20px",
		color: "#000",
	},
	invalid: {
		//All of the error styles go inside of here.
	},
};

export default {
	props: ["clientSecret"],
	data() {
		return {
			card: "",
			intentToken:
				"seti_1IvfrFKl6A9Ix8PFbygQZcoX_secret_JYnSwJqG881f5NsiL6gRfspMY4NIqjS",
			fullName: "Shadman Ahmed",
			name: "",
			country: "",
			city: "",
			postCode: "",
			payment_method: null,
		};
	},
	mounted() {
		//location.reload();
		this.card = elements.create("card", style);
		this.card.mount(this.$refs.card);
	},
	beforeDestroy() {
		this.card.destroy(this.$refs.card);
	},
	methods: {
		submitPayment() {
			console.log("Payment clicked");
			stripe
				.confirmCardSetup(this.clientSecret, {
					payment_method: {
						card: this.card,
						billing_details: {
							name: this.name,
							address: {
								city: this.city,
								country: this.country,
								postal_code: this.postCode,
							},
						},
					},
				})
				.then(
					function (result) {
						if (result.error) {
							console.log(result.error);
							//alert(result.error.message);
							this.$error({
								title: "Card Validation Error",
								content: result.error.message,
								centered: true,
							});
						} else {
							console.log(result);
							console.log(result.setupIntent.payment_method);
							this.payment_method = result.setupIntent.payment_method;
							console.log(this.payment_method);
							this.$emit("get-payment-method", this.payment_method);
							this.$store.state.user.payment_method = this.payment_method;
							this.card.clear();
						}
					}.bind(this)
				);
		},
	},
};
</script>

<style scoped lang="scss">
.card-input {
	.form-group {
		margin-bottom: 5px;
	}
	.custom-select {
		border-radius: 25px;
		font-size: 12px;
	}
}

.validate-button {
	padding: 1px 60px;
	font-size: 20px;
	margin-top: 5px;

}
</style>