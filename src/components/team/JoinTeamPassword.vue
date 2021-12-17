<template>
	<div
		class="col-lg-6 col-xl-3 cards"
	>
		<div
			class="team-card card"
			style="min-height: 500px; margin-top: 20px;"
		>
      <div style="width: 100%" class="d-flex align-items-center justify-content-center joining-header position-relative">
        <div class="logo-position position-absolute">
          <img
              class="group-logo"
              src="@/assets/Icons/Join a team.svg"
              alt=""
          />
        </div>
        <h4 class="card-title pt-2">Joining a team</h4>
      </div>
      <div class="mt-5 px-4" v-if="!success">
        <h4 class="fs-18 color-primary">Team Password</h4>
        <a-row class="mt-1">
          <a-col :span="24" class="mt-4">
            <a-input-password
                placeholder="Enter Password"
                size="large"
                class="team-password"
                @change="invitationPassword = $event.target.value"
            >
            </a-input-password>
          </a-col>
        </a-row>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center mt-5" v-if="success">
        <div class="success-box">
          <a-icon type="check" class="fs-24 text-white d-flex align-items-center justify-content-center py-2" />
        </div>
        <h4 class="fs-20 mt-3">Done</h4>
        <p class="fs-14">You're joined successfully</p>
      </div>

      <div class="position-absolute footer-cancel-btn" v-if="!success">
        <a-button class="back-button button float-left" v-on:click="$emit('cancel_button')">Back</a-button>
      </div>
      <div class="position-absolute footer-conf-btn" v-if="!success">
        <a-button class="confirm-button button float-right" @click="onConfirmClick">Confirm</a-button>
      </div>
      <div class="position-absolute footer-conf-btn" v-if="success">
        <a-button class="confirm-button button float-right" @click="closeSuccess">Ok</a-button>
      </div>
		</div>
	</div>
</template>
<script>
import ApiService from "../../services/api.service";
export default {
	name: "ManageTeam",
	components: {},
  props: ['team'],
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			invitationPassword: "",
      success: false
		};
	},
	created() {},
	computed: {
		console: () => console,
		window: () => window,
	},
	methods: {
		async onConfirmClick() {
			if (this.invitationPassword.length > 0) {
        if(this.team.password.toString() === this.invitationPassword.toString()) {
          let payload = {
            team_id: this.team.team_id,
            invitation_link: this.team.invitation_link,
            team_password: this.invitationPassword
          };

          await ApiService.post("v1/join-team-by-invitation", payload).then((res) => {
            if(res && res.data && res.data.data) {
              this.success = true;
            }
          }).catch((e) => {
            console.log(e);
          });
        } else {
          alert("Password does not match");
        }
			}
		},
    closeSuccess() {
      this.$emit('cancel_button');
    }
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.input-controls > input {
	height: 50px;
	margin-top: 10px;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
}
.card-container {
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 0 5px 3px #d3d3d3 !important;
}
.group-logo {
	width: 80px;
	margin-bottom: 10px;
}
.card-title {
	color: #6158a7;
	font-weight: 400;
	font-size: 2.75rem;
}
.joining-message {
	color: #6158a7;
	font-weight: 400;
	font-size: 1.25rem;
}
.candiadate-text {
	margin-left: 5px;
	color: #6158a7;
	font-weight: bold;
	font-size: 1.25rem;
}
.form-label {
	text-align: left;
}
.form-value {
	text-align: left;
}
.ant-input {
	border: 1px solid red;
}
.team-password {
	border-radius: 25px !important;
}
.confirm-button {
	background-color: #6158a7;
	border-radius: 25px;
	padding: 0px 20px;
	margin-top: 40px;
	color: white;
	float: right;
}

// start css for team-card
.team-card {
	text-align: center;
	width: 100%;
	padding: 10px 8px;
	border-radius: 10px;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);

  .joining-header {
    background: $bg-primary;
    padding: 0 20px;
    .logo-position {
      left: 12px;
      top: -2px;
      .group-logo {
        width: 40px;
        height: 40px;
        background: $bg-white;
        border-radius: 50%;
        padding: 4px;
      }
    }
    .card-title {
      font-size: 14px;
      color: $color-white;
    }
  }

	.team-card-header {
		background-color: #ffffff;
		display: flex;
		padding: 0;
		margin-bottom: 20px;
		align-items: center;
		justify-content: space-between;

		.left {
			.status {
				border: 2px solid #999999;
				padding: 2px 5px;
				border-radius: 20px;
				color: #6158a9;
				background-color: #999999;
				color: #e4e4e4;
				font-size: 12px;

				span {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #e91e78;
					margin-left: 5px;
				}

				&.active {
					border: 2px solid #6b64ae;
					background-color: #ffffff;
					color: #6158a9;

					span {
						background-color: #39b54a;
					}
				}
			}
		}

		.middle {
			button {
				opacity: 1;
				padding-right: 5px;

				img {
					width: 25px;
				}
			}
		}

		.right {
			display: flex;
			align-items: center;

			.ant-switch {
				background-color: #ea4c91;

				.ant-switch-loading-icon,
				&::after {
					top: 2px;
				}
			}

			.ant-switch-checked {
				background-color: #6159a8;
			}

			.dropleft {
				margin-left: 10px;

				.dropdown-toggle {
					padding: 0;

					&::before {
						border: 0;
						width: 12px;
						height: 20px;
						margin-top: 7px;
						background: url("~@/assets/three-dots.png") no-repeat right center;
					}
				}

				.dropdown-menu {
					margin-top: 7px;
					padding: 10px 15px;
					box-shadow: 0 0 3px 2px #ddd;

					.dropdown-item {
						padding: 3px 0;
						margin-bottom: 2px;
						text-align: center;
						font-size: 12px;
						border-radius: 3px;
						color: #3a3092;
						background-color: #e6e6e6;

						&:hover {
							color: #ffffff;
							background-color: #e51f76;
						}
					}
				}
			}
		}
	}

	.card-info {
		display: flex;
		margin-bottom: 20px;

		.img {
			width: 60px;
			padding-right: 20px;
			box-sizing: content-box;

			button {
				border: 0;
				margin: 0;
				padding: 0;
				width: 60px;
				min-width: 12px;
				position: relative;
				background-color: transparent;

				span {
					position: absolute;
					bottom: 0px;
					right: -8px;
				}
			}
		}

		.info-content {
			.member-name,
			.member-desc {
				display: flex;
				padding-bottom: 5px;

				p {
					margin: 0;
					color: #777777;
				}

				button {
					border: 0;
					background-color: transparent;
					padding: 0;
					min-width: 12px;
				}
			}

			.member-desc {
				p {
					font-size: 12px;
				}
			}
		}
	}

	.member-area {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20px;

		.members {
			border: 2px solid #908bc2;
			border-radius: 5px;
			min-height: 30px;
			padding: 0 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 10px;
			margin-right: 10px;

			&:first-of-type {
				border-top-left-radius: 15px;
				border-bottom-left-radius: 15px;
			}

			&:last-of-type {
				border-top-right-radius: 15px;
				border-bottom-right-radius: 15px;
				margin-right: 0;
			}

			p {
				display: flex;
				margin: 0;
				font-size: 12px;
				align-items: center;

				span {
					width: 16px;
					height: 16px;
					color: #ffffff;
					border-radius: 50%;
					background-color: #e51f76;
					display: flex;
					align-items: center;
					justify-content: center;
					float: left;
					margin-right: 5px;
				}
			}
		}
	}

	.member-action {
		.add-remove {
			display: flex;
			justify-content: space-between;
			padding: 0;
			margin-bottom: 10px;

			.add-member,
			.remove-member {
				display: flex;
				color: #6159a8;

				img {
					width: 20px;
					margin-right: 10px;
				}
			}

			.remove-member {
				color: #e51f76;
			}
		}

		.admin-member,
		.only-member {
			padding: 4px;
			border-radius: 15px;
			margin-top: 15px;
			margin-bottom: 15px;
			font-size: 12px;
			color: #ffffff;

			td {
				background-color: #3a3092;
			}

			td:first-of-type {
				padding-left: 5px;
				border-top-left-radius: 12px;
				border-bottom-left-radius: 12px;
			}

			td:last-of-type {
				padding-right: 5px;
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
			}

			td {
				padding-top: 2px;
				padding-bottom: 2px;
			}

			.name-short,
			.name-full,
			.title,
			.status,
			.relation,
			.remove {
				background-color: #3a3092;
				margin-right: 10px;
			}

			.name-short {
				background-color: #ffffff;
				color: #6159a8;
				width: 30px;
				border-top-left-radius: 12px;
				border-bottom-left-radius: 12px;
				padding: 0 5px;
				font-size: 12px;
				font-weight: bold;
			}

			.title {
				background-color: #ffffff;
				color: #777777;
				padding: 0 5px;
				border-radius: 10px;
			}

			.status {
				width: 20px;
			}

			.remove {
				width: 15px;
				margin-right: 0;
			}
		}

		.only-member {
			background-color: #ffffff;
			color: #777777;

			td {
				padding-top: 15px;
				background-color: #ffffff;
			}

			.name-short,
			.name-full,
			.title,
			.status,
			.relation,
			.remove {
				background-color: #ffffff;
			}

			.name-short {
				background-color: #3a3092;
				color: #ffffff;
			}

			.title {
				background-color: #808080;
				color: #ffffff;
			}

			.remove {
				padding: 0;
			}
		}

		.select-member {
			display: flex;
			margin-top: 30px;
			margin-bottom: 30px;
			justify-content: space-between;
			// background: url("~@/assets/select-arrow.png") no-repeat center center;
			.custom-select {
				font-size: 12px;
				width: auto;
				padding-left: 2px;
				padding-right: 12px;
				padding-top: 0;
				padding-bottom: 0;
				height: 24px;
				background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
				background-position: right 2px center;
			}

			button {
				padding: 0;

				img {
					width: 20px;
				}
			}
		}
	}

	.team-card-footer {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;

		.left {
			margin-bottom: 10px;

			p {
				margin: 0;
				font-size: 12px;
			}
		}

		.right {
			a {
				font-size: 12px;
				color: #e51f76;
				text-decoration: underline;

				img {
					width: 20px;
					margin-right: 5px;
				}
			}
		}
	}

  .footer-cancel-btn {
    bottom: 20px;
    left: 32px;
    .button {
      border-radius: 16px;
      background: $bg-brand;
      color: $color-white;
    }
  }
  .footer-conf-btn {
    bottom: 20px;
    right: 32px;
    .button {
      border-radius: 16px;
    }
  }

  .d-flex {
    .success-box {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: $bg-success;
    }
  }
}
// end css for team-card
</style>
