<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<Layout>
      <div class="root-content container-fluid d-flex justify-content-center mt-5 shadow-default py-4 position-relative">
        <div class="row text-center mt-3">
          <div class="col-12">
            <img
                class="check-icon"
                src="@/assets/icon/check-circle-fill-green.svg"
                alt=""
            />
          </div>
          <div class="col-12 mt-2">
            <p class="fs-28">Done, your payment successful</p>
            <p class="fs-22">
              You team <b>{{ team }}</b> has successfully subscribed
              <b>{{ subscriptionName }}</b
              >.
            </p>

            <p class="fs-18">
              You can view payment receipt from Manage team > Team Setting >
              Subscription details,
            </p>
            <p class="fs-18">
              also we sent payment confirmation email to your Matrimony
              assist account email.
            </p>
          </div>
          <div class="col-12 col-md-6 offset-md-3 text-center mt-5">
            For more information visit Our <a href="" class="fs-14 text-blue">FAQ</a> page. <br>
            Any other queries? Please contact out <a href="" class="text-blue fs-14">Customer support</a>
          </div>
          <div class="col-12 text-center mt-4 mobile-btn-block">
            <a href="/manageteam" class="btn btn-primary fs-18 team-btn-primary"
            >Manage Team
              <span class="fs-20">&#8594;</span>
            </a>
          </div>
          <div class="position-absolute team-btn desktop-btn-block">
            <a href="/manageteam" class="btn btn-primary fs-18 team-btn-primary"
            >Manage Team
              <span class="fs-20">&#8594;</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/dashboard/layout/Footer.vue";

export default {
	components: {
		Header,
		Sidebar,
		Footer,
		// ShortlistedCandidate
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			team: null,
			subscriptionName: null,
		};
	},
	created() {
		this.loadUser();
		this.getTeamDetails();
	},
	methods: {
		async loadUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("getUser");
				this.user = this.$store.getters["userInfo"];
				this.is_verified = this.user.is_verified;
				// if (this.is_verified == 0) {
				// 	this.$router.push("/email-verification");
				// }
				// if (this.user.account_type === 0) {
				// 	this.$router.push("/member-type");
				// }
				//
				// if (this.user.account_type === 4) {
				// 	this.$router.push("/admin");
				// }
        //
				// let data_input_status = this.$store.getters["userDataInputStatus"];
				// console.log("data input status", data_input_status);
				// if (data_input_status == 10) {
				// 	this.$router.push("/member-name/candidate");
				// }
        //
				// if (data_input_status == 20) {
				// 	this.$router.push("/member-name/representative");
				// }
        //
				// if (data_input_status == 11) {
				// 	this.$router.push("/candidate-registration");
				// }
				// if (data_input_status == 21) {
				// 	this.$router.push("/representative-registration");
				// }

				// if (data_input_status == 12) {
				// 	this.$router.push("/candidate-registration");
				// }
				// if (data_input_status == 22) {
				// 	this.$router.push("/representative-registration");
				// }
			} catch (error) {
				this.error = error.message || "Something went wrong";
				alert(this.error);
			}
			this.isLoading = false;
		},
		getTeamDetails() {
			const team = this.$route.params.team;
			const subscriptionName = this.$route.params.subName;
			this.team = team;
			this.subscriptionName = subscriptionName;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.root-content {
  max-width: calc(100% - 40px);
}
.text-blue {
  color: #1b83d8;
  font-weight: bold;
}
.team-btn {
  bottom: 25px;
  right: 10px;
}
.team-btn-primary {
  border: 2px solid $color-white;
  outline-style: solid;
  outline-color: #cfcece;
  border-radius: 30px;
}
.check-icon {
  width: 100px;
  height: 100px;
}
.mobile-btn-block {
  display: block;
}
.desktop-btn-block {
  display: none;
}
@media (min-width: 992px) {
  .root-content {
    max-width: calc(100% - 240px);
  }
  .check-icon {
    width: 200px;
    height: 200px;
  }
  .mobile-btn-block {
    display: none;
  }
  .desktop-btn-block {
    display: block;
  }
}
</style>
