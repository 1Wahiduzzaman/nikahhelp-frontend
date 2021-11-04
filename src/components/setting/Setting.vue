<template>
	<div class="container mt-3 mb-5">
		<a-modal
			title="Change Password"
			:visible="visible"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="handleCancel"
		>
<!--			<p>{{ ModalText }}</p>-->
			<a-input-password
				placeholder="Input Old Password"
				@change="onOldPassChange"
			style="margin-top: 5px; margin-bottom: 5px;"/>
			<a-input-password
				placeholder="Input New Password"
				@change="onNewPassChange"
        style="margin-top: 5px; margin-bottom: 5px;"/>
			<a-input-password
				placeholder="Retype New Password"
				@change="onRetypePassChange"
			/>
		</a-modal>
		<div class="card">
      <div class="row ">
      <div class="col-lg-8" style="border-right: 1px #CCC solid">

			<div class="ml-3 mt-3">
				<h5 style="color: #9d2585">
				User ID : {{userData.id}}
<!--					<a-button class="btn bt-sm btn-primary float-right mr-3"-->
<!--						>Edit</a-button-->
<!--					>-->
				</h5>
			</div>
			<div class="card-body">

        <hr />
        <p><b>Email Address</b></p>
				<p>{{userData.email}}</p>
			</div>
			<hr />

			<div class="ml-3"><h5>Password</h5></div>
			<div class="card-body">
				<p>**************</p>
				<a-button
					class="btn bt-sm btn-primary"
					v-on:click="handleClickPassword"
				>
					Change
				</a-button>
			</div>

			<hr />
			<div class="ml-3"><h5>Switch Membership Type</h5></div>
			<div class="card-body">
				<p>Change Membership Type</p>
				{{ `You are a ${accountType}` }}
				<p>You can Change Membership type if you are a Representative</p>
				<a-button
					:disabled="accountType == 'Candidate'"
					class="btn bt-sm btn-primary"
					@click="onAccountSwitchClick"
					:loading="loadingSwitch"
				>
					Candidate
				</a-button>
			</div>

			<hr />
			<div class="ml-3"><h5>Promotion</h5></div>
			<div class="card-body">
				<p>Receive Marketing communication from Matrimonial Assist</p>
				<div class="custom-control custom-switch">
					<input
						type="checkbox"
						class="custom-control-input"
						id="customSwitch1"
					/>
					<label class="custom-control-label" for="customSwitch1"></label>
				</div>
			</div>
			<hr />
			<div class="ml-3"><h5>Delete Account</h5></div>
			<div class="card-body">
				<p>Lorem Ipsum sit amet, consectetuer</p>
				<a-button type="danger" class="btn bt-sm" @click="handleDeleteAccount"
					>Delete Account</a-button
				>
			</div>
			</div >
		<div class="col-lg-4">
			<div class="ml-3 mt-3">
			<h5 class="identity-design">
			Identity Verification
			</h5>
			</div>

			<div v-if="userData.status==0">
				<div class="row " style="text-align: center">
					<div class="col-lg-12">
						<button class="btn btn-primary px-4 edit-button"
							@click="editProfile"
						>
							<img src="@/assets/icon/pencil-square.svg">
							Edit Profile
						</button>
					</div>
				</div>
			</div>

			<div v-else>	
				<div class="row " style="text-align: center">
				<div class="col-lg-12">
					<img src="@/assets/icon/varified.svg" alt="icon" style="max-width: 100px; max-height: 100px; margin-top: 30px;"/>
				</div>
				<div class="col-lg-12">
				<p style="padding: 10px"><strong>Verified</strong></p>
				</div>
				</div>
			</div>

			
		<div class="ml-3 mt-3"><p>For Security reason, Contact Detail Can not be changed. any of this data is incorrect, Please contact our <a href="#" style="color: #1c7430">Support Team</a></p>
        </div>
      </div>
      </div>
		</div>
	</div>
</template>
<style type="text/css">
.ant-modal-close{

}
</style>

<script>
import ApiService from "../../services/api.service";
export default {
	data() {
		return {
			ModalText: "Change Password",
			visible: false,
			confirmLoading: false,

			loadingSwitch: false,

			oldPass: "",
			newPass: "",
			retypePass: "",
			accountType: "Account Type loading",
			userData: null,
		};
	},
	async mounted() {
		this.loadingSwitch = true;
		await this.$store.dispatch("getUser");
		let userData = await this.$store.getters["userInfo"];
		this.userData = userData;
		console.log(this.userData);
		if (userData.account_type == 2) {
			this.accountType = "Representative";
		} else {
			this.accountType = "Candidate";
		}
		console.log(userData);
		console.log("Created");
		this.loadingSwitch = false;
	},
	methods: {
		onOldPassChange(e) {
			console.log(e.target.value);
			this.oldPass = e.target.value;
		},
		onNewPassChange(e) {
			console.log(e.target.value);
			this.newPass = e.target.value;
		},
		onRetypePassChange(e) {
			console.log(e.target.value);
			this.retypePass = e.target.value;
		},
		showModal() {
			this.visible = true;
		},
		async handleOk(e) {
			this.ModalText = "Talking with server ㋡";
			this.confirmLoading = true;
			await ApiService.post("v1/change-password", {
				oldpassword: this.oldPass,
				newpassword: this.newPass,
			})
				.then((data) => {
					console.log(data);
					if (data.data.status_code == 200) {
						this.$message.success(data.data.message);
					}
					this.confirmLoading = false;
					this.visible = false;
					// reseting inputs
					this.oldPass = "";
					this.newPass = "";
					this.retypePass = "";

					this.ModalText = "Change Password";
				})
				.catch((error) => {
					console.log(error.response);
					if (error.response.data.status_code >= 400) {
						this.$message.error(error.response.data.message);
					}
					this.confirmLoading = false;
					this.visible = false;
					// reseting inputs
					this.oldPass = "";
					this.newPass = "";
					this.retypePass = "";

					this.ModalText = "Change Password";
				});

			// setTimeout(() => {
			//   this.visible = false;
			//   this.confirmLoading = false;
			// }, 2000);
		},
		handleCancel(e) {
			console.log("Clicked cancel button");
			this.visible = false;
		},
		handleClickPassword(e) {
			this.showModal();
		},
		onAccountSwitchClick(e) {
			this.loadingSwitch = true;
			if (this.accountType === "Representative") {
				ApiService.post("v1/switch-account", { account_type: 1 })
					.then((data) => {
						console.log(data);
						if (data.data.status_code == 200) {
							this.accountType = "Candidate";
							this.$message.success("Succesfully Switched");
							this.loadingSwitch = false;
						}
					})
					.catch((error) => {
						this.$message.error("Something Went Wrong");
						console.log(error.response);
						this.loadingSwitch = false;
					});
			} else {
				this.$message.error(
					"You might be a candidate, or wait a bit for data to load"
				);
				this.loadingSwitch = false;

				return;
			}
		},
		handleDeleteAccount() {
			console.log("Handle Delete Account");
			ApiService.get("v1/delete-account").then((data) => {
				console.log("Account deleted Succesfully");
				this.$router.push("/logout");
			});
		},

		editProfile() {
			if(this.accountType == "Candidate")
				this.$router.push("/candidate-registration");
			else {
				this.$router.push("/representative-registration");
			}
		},
	},
};
</script>

<style> 
.identity-design {
	color: #9d2585; 
	text-align: center;
	font-weight: bold;
}

.edit-button {
	margin: 50px;
	margin-left: 70px;
	padding-left: 10px;
	padding-right: 10px;
}
</style>
