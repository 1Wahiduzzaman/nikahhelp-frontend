<template>
	<div class="col-lg-4 col-xl-12 col-md-4 col-sm-12">
		<a-card class="team-card" style="min-height: 500px">
			<a-row style="margin-top: 5%">
				<a-col :span="24">
					<a-col :span="24"
						><img
							class="group-logo"
							src="@/assets/Icons/Join a team or Create a team.svg"
							alt=""
							width="200"
							height="200"
						/>
						<!-- <img
							class="group-logo"
							src="@/assets/Icons/Join a team or Create a team.svg"
							alt=""
							width="200"
							height="200"
							style="
								border: 5px #6158a7 solid;
								border-radius: 50%;
								padding: 15px;
							"
						/> -->
					</a-col>
				</a-col>
			</a-row>

			<a-row>
				<div class="space-align-container">
					<div class="space-align-block">
						<a-space align="center">
							<a-button class="confirm-button" v-on:click="$emit('joinATeam')"
								>Join A Team
							</a-button>
						</a-space>
					</div>
					<!--        <hr>-->
					<!--        <br>-->
					<p style="text-align: center; padding-top: 8px">or</p>
					<!--        <hr>-->

					<div class="space-align-block">
						<a-space align="center">
							<a-button class="confirm-button" v-on:click="$emit('createATeam')"
								>Create A Team
							</a-button>
						</a-space>
					</div>
				</div>
			</a-row>
		</a-card>
	</div>
</template>


<style scoped lang='scss'>
.input-controls > input {
	height: 50px;
	margin-top: 10px;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
}

.card-container {
	margin: 10px;
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

.confirm-button {
	background-color: #6158a7;
	color: white;
}

// start css for team-card
.team-card {
	width: 100%;
	padding: 10px 8px;
	border-radius: 10px;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);

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
}

// end css for team-card
</style>
