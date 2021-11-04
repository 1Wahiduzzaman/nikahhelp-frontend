<template>
	<div class="verificationInfo p-3 rounded" style="background: #f4f4f9">
		<div class="verification-content" style="margin-top: 40px">
			<a-collapse
				default-active-key="1"
				:bordered="false"
				expand-icon-position="right"
			>
				<template #expandIcon="props">
					<a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
				</template>
				<a-collapse-panel key="1" header="1. Essential Information">
					<form class="form-ma">
						<div
							class="verification-header"
							style="color: rgba(0, 0, 0, 0.65); margin: 10px 0px"
						>
							<p>
								To keep your account safe, we need to verify your identity. This
								is a legal requirement that help us to keep your account secure.
							</p>
							<p>
								We accept photo/scans of a driving lecense, passport, national
								ID card or residense permit issued in European Economic Are
								(EEA)
							</p>

							<p>Follow these tips to make sure your document is accepted:</p>
							<ul>
								<li class="flex-start-center">
									<img
										src="@/assets/Icons/tick 2.svg"
										alt="icon"
										id="checkIcon"
									/>
									Submit a valid, current photo ID with an expiry date
								</li>
								<li class="flex-start-center">
									<img
										src="@/assets/Icons/tick 2.svg"
										alt="icon"
										id="checkIcon"
									/>
									Show the full document (all four corners should be visible)
								</li>
								<li class="flex-start-center">
									<img
										src="@/assets/Icons/tick 2.svg"
										alt="icon"
										id="checkIcon"
									/>
									Use a colour image that a is clear and easy to read
								</li>
							</ul>
						</div>
						<hr />

						<a-row>
							<!-- <a-col class="form-item py-3 border-bottom" :span="24">
							
								<a-row type="flex" align="top">
									<a-col :span="12">
										<div class="mb-2">
											<a-icon
												v-if="onConfirmationSwitchChnaged"
												class="color-success mr-2 fs-18 fw-500"
												type="check"
											/>Do you want to upload your document now?
										</div>
										<a-tooltip placement="bottom">
											<template slot="title">
												Please provide tooltip texts so we can place it
												here</template
											>
											<span class="color-info fw-500">Need help?</span>
										</a-tooltip>
									</a-col>
									<a-col :span="12">
										<a-switch
											v-model="is_document_upload"
											default-checked
											@change="onConfirmationSwitchChnaged"
										>
											<a-icon slot="checkedChildren" type="check" />
											<a-icon slot="unCheckedChildren" type="close" />
										</a-switch>
									</a-col>
								</a-row>
							</a-col> -->

							<div v-if="is_document_upload">
								<a-col :span="24">
									<!-- <a-row class="form-item py-3" :gutter="[16]" type="flex" justify="between" align="top"> -->
									<a-row
										class="form-item py-3"
										:gutter="[16]"
										type="flex"
										align="top"
									>
										<a-col :span="12">
											<div class="mb-2">
												<a-icon
													v-if="ver_country"
													class="color-success mr-2 fs-18 fw-500"
													type="check"
												/>Country
											</div>
											<a-tooltip placement="bottom">
												<template slot="title">
													Please provide tooltip texts so we can place it
													here</template
												>
												<span class="color-info fw-500">Need help?</span>
											</a-tooltip>
										</a-col>
										<a-col :span="12">
											<a-row :gutter="[8]">
												<a-col :span="12">
													<a-select
														:showSearch="true"
														option-filter-prop="children"
														:filter-option="filterOption"
														:showArrow="true"
														v-model="ver_country"
														class="select-ma w-100"
														placeholder="Country"
														@change="onChangeCountry"
													>
														<template v-for="_country in countries">
															<a-select-option :value="_country.name">
																{{ _country.name }}
															</a-select-option>
														</template>
														<!-- <a-select-option value="Other">
                            Other
                          </a-select-option> -->
													</a-select>
												</a-col>
												<a-col :span="12">
													<a-select
														:showSearch="true"
														option-filter-prop="children"
														:filter-option="filterOption"
														:showArrow="true"
														v-model="ver_city"
														class="select-ma w-100"
														placeholder="City"
														@change="(value) => (ver_city = value)"
													>
														<template v-for="_city in cities1">
															<a-select-option :value="_city.name">
																{{ _city.name }}
															</a-select-option>
														</template>
														<!-- <a-select-option value="Other">
                            Other
                          </a-select-option> -->
													</a-select>
												</a-col>
											</a-row>
											<a-input
												class="w-100 mt-2"
												placeholder="Please specify"
												v-if="ver_city == 'Other'"
											/>
										</a-col>
									</a-row>
								</a-col>
								<a-col class="form-item py-3 border-bottom" :span="24">
									<!-- <a-row  type="flex" justify="between" align="top"> -->
									<a-row type="flex" align="top">
										<a-col :span="12">
											<div class="mb-2">
												<a-icon
													v-if="ver_document_type"
													class="color-success mr-2 fs-18 fw-500"
													type="check"
												/>Document type?
											</div>
											<a-tooltip placement="bottom">
												<template slot="title">
													Please provide tooltip texts so we can place it
													here</template
												>
												<span class="color-info fw-500">Need help?</span>
											</a-tooltip>
										</a-col>
										<a-col :span="12">
											<a-select
												v-model="ver_document_type"
												class="select-ma w-100"
												placeholder="Document type"
											>
												<a-select-option value="Passport">
													Passport
												</a-select-option>
												<a-select-option value="Nation ID">
													Nation ID
												</a-select-option>
											</a-select>
										</a-col>
									</a-row>
								</a-col>
								<a-col class="form-item py-3 border-bottom" :span="24">
									<!-- <a-row type="flex" justify="between" align="top"> -->
									<a-row type="flex" align="top">
										<a-col :span="12">
											<div class="mb-2">
												<a-icon
													v-if="imageUrlFront"
													class="color-success mr-2 fs-18 fw-500"
													type="check"
												/>Upload front side?
											</div>
											<a-tooltip placement="bottom">
												<template slot="title">
													Please provide tooltip texts so we can place it
													here</template
												>
												<span class="color-info fw-500">Need help?</span>
											</a-tooltip>
										</a-col>
										<a-col :span="12">
											<!-- <a-row :gutter="8">
												<a-col :span="15"
													><FileUploadOne
														class="w-100"
														:handleChangeFromProp="handleChangeFromProp"
														nameFromVerification="front"
												/></a-col>
												<a-col :span="9"
													><a-button shape="round" class="w-100" type="danger">
														Remove</a-button
													></a-col
												>
											</a-row>
											<span class="my-3 d-block"
												>The format supported are JPEG, PNG, PDF. Maximum file
												size 2mb</span
											>
											<div>
												<img
													v-if="imageUrlFront"
													:src="imageUrlFront"
													alt="avatar"
												/>
												<img
													v-if="!imageUrlFront"
													src="@/assets/profile-image-placeholder.png"
													alt="img"
												/>
											</div> -->

											<div class="text-center">
												<span class="mb-2"
													>The format supported are JPEG, PNG, PDF. Maximum file
													size 2 mb</span
												>
												<div class="img-preview mb-2">
													<img
														:src="frontPageSrc"
														width="180"
														height="200"
														v-if="frontPageSrc"
													/>
													<div class="mt-3">Front Page</div>
													<div class="mt-4" v-if="!frontPageSrc">
														<a-icon
															type="plus-circle"
															:style="{ fontSize: '80px', color: '#aaa' }"
														/>
													</div>
												</div>
												<input
													type="file"
													class="input-image"
													name="avatar"
													@change="getFrontPage"
												/>
											</div>
										</a-col>
									</a-row>
								</a-col>
								<a-col class="form-item py-3 border-bottom" :span="24">
									<!-- <a-row type="flex" justify="between" align="top"> -->
									<a-row type="flex" align="top">
										<a-col :span="12">
											<div class="mb-2">
												<a-icon
													v-if="imageUrlBack"
													class="color-success mr-2 fs-18 fw-500"
													type="check"
												/>Upload back side?
											</div>
											<a-tooltip placement="bottom">
												<template slot="title">
													Please provide tooltip texts so we can place it
													here</template
												>
												<span class="color-info fw-500">Need help?</span>
											</a-tooltip>
										</a-col>
										<a-col :span="12">
											<!-- <a-row :gutter="8">
												<a-col :span="15"
													><FileUploadOne
														class="w-100"
														:handleChangeFromProp="handleChangeFromProp"
														nameFromVerification="back"
												/></a-col>
												<a-col :span="9"
													><a-button shape="round" class="w-100" type="danger">
														Remove</a-button
													></a-col
												>
											</a-row>
											<span class="my-3 d-block"
												>The format supported are JPEG, PNG, PDF Maximum file
												size 15mb</span
											>
											<div>
												<img
													v-if="imageUrlBack"
													:src="imageUrlBack"
													alt="avatar"
												/>
												<img
													v-if="!imageUrlBack"
													src="@/assets/profile-image-placeholder.png"
													alt="img"
												/>
											</div> -->

											<div class="text-center">
												<span class="mb-2"
													>The format supported are JPEG, PNG, PDF. Maximum file
													size 2 mb</span
												>
												<div class="img-preview mb-2">
													<img
														:src="backPageSrc"
														width="180"
														height="200"
														v-if="backPageSrc"
													/>

													<div class="mt-3">Back Page</div>
													<div class="mt-4" v-if="!backPageSrc">
														<a-icon
															type="plus-circle"
															:style="{ fontSize: '80px', color: '#aaa' }"
														/>
													</div>
												</div>
												<input
													type="file"
													class="input-image"
													name="avatar"
													@change="getBackPage"
												/>
											</div>
										</a-col>
									</a-row>
								</a-col>
								<a-col class="form-item py-3 border-bottom" :span="24">
									<!-- <a-row type="flex" justify="between" align="top"> -->
									<a-row type="flex" align="top">
										<a-col :span="12">
											<div class="mb-2">
												<a-icon
													v-if="ver_recommender_title"
													class="color-success mr-2 fs-18 fw-500"
													type="check"
												/>Person of community standing who know you?
											</div>
											<a-tooltip placement="bottom">
												<template slot="title">
													Please provide tooltip texts so we can place it
													here</template
												>
												<span class="color-info fw-500">Need help?</span>
											</a-tooltip>
										</a-col>
										<a-col :span="12">
											<a-row :gutter="[8, 8]">
												<a-col :span="24">
													<a-input
														v-model="ver_recommender_title"
														class="w-100"
														placeholder="Title"
														@change="
															ver_recommender_title = $event.target.value
														"
													/>
												</a-col>
												<a-col :span="12">
													<a-input
														v-model="ver_recommender_first_name"
														class="w-100 rounded-right"
														placeholder="First Name"
														@change="
															ver_recommender_first_name = $event.target.value
														"
													/>
												</a-col>
												<a-col :span="12">
													<a-input
														v-model="ver_recommender_last_name"
														class="w-100 rounded-left"
														placeholder="Last Name"
														@change="
															ver_recommender_last_name = $event.target.value
														"
													/>
												</a-col>
												<a-col :span="24">
													<a-select
														:showSearch="true"
														option-filter-prop="children"
														:filter-option="filterOption"
														:showArrow="true"
														v-model="ver_recommender_occupation"
														class="select-ma w-100"
														placeholder="Occupation"
														@change="ver_recommender_occupation = $event"
													>
														<template v-for="_occupation in occupations">
															<a-select-option :value="_occupation">
																{{ _occupation }}
															</a-select-option>
														</template>
														<!-- <a-select-option value="Other">
                            Other
                          </a-select-option> -->
													</a-select>
												</a-col>
												<!-- <a-col :span="24">
                          <a-input
                            class="w-100"
                            placeholder="Please specify"
                            @change="
                              ver_recommender_occupation = $event.target.value
                            "
                          />
                        </a-col> -->
												<a-col :span="24">
													<a-textarea
														placeholder="Address"
														:rows="4"
														v-model="ver_recommender_address"
													/>
												</a-col>
												<a-col :span="24">
													<a-input-number
														class="w-100"
														id="inputNumber"
														placeholder="Mobile number"
														v-model="ver_recommender_mobile_no"
													/>
												</a-col>
											</a-row>
										</a-col>
									</a-row>
								</a-col>
							</div>
						</a-row>
					</form>
				</a-collapse-panel>
			</a-collapse>
		</div>
	</div>
</template>

<style lang="scss">
@import "@/styles/base/_variables.scss";
</style>
<script>
import FileUploadOne from "@/components/shared/FileUploadOne.vue";
import ApiService from "../../services/api.service";
export default {
	name: "VerificationInfo",
	props: ["handleChangeFromProp", "imageUrlFront", "imageUrlBack", "repData"],
	components: {
		FileUploadOne,
	},
	created() {
		// console.log(this.handleChangeFromProp)
		console.log(this.repData);
	},
	mounted() {
		this.setPersonalInfoRepData();
		this.getCountries();
		this.getOccupations();
	},
	data() {
		return {
			confirmationChecked: true,
			is_document_upload: true,
			ver_country: undefined,
			ver_city: undefined,
			ver_document_type: undefined,
			ver_document_frontside: undefined,
			ver_document_backside: undefined,
			ver_recommender_title: undefined,
			ver_recommender_first_name: undefined,
			ver_recommender_last_name: undefined,
			ver_recommender_occupation: undefined,
			ver_recommender_address: undefined,
			ver_recommender_mobile_no: undefined,

			frontPage: "",
			frontPageSrc: "" || this.imageUrlFront,
			backPage: "",
			backPageSrc: "" || this.imageUrlBack,

			countries: [],
			cities1: [],
			cities2: [],

			occupations: [],
		};
	},

	methods: {
		filterOption(input, option) {
			return (
				option.componentOptions.children[0].text
					.toLowerCase()
					.indexOf(input.toLowerCase()) >= 0
			);
		},
		imageSizeCheck(file) {
			if (file["size"] > 2111775) {
				this.$error({
					title: "Validation Error",
					content: "Image size can't be more than 2 mb",
					center: true,
				});
				return false;
			}
			return true;
		},
		getFrontPage(e) {
			let file = e.target.files[0];
			if (!this.imageSizeCheck(file)) {
				file = "";
				return;
			}
			this.frontPage = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				this.frontPageSrc = e.target.result;
			};
		},
		getBackPage(e) {
			let file = e.target.files[0];
			if (!this.imageSizeCheck(file)) {
				file = "";
				return;
			}
			this.backPage = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				this.backPageSrc = e.target.result;
			};
		},
		async getCountries() {
			let ccObject;
			await ApiService.get("v1/utilities/countries")
				.then((data) => {
					// console.log(data);
					ccObject = data.data.data;
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
			ccObject.map((_countries) => {
				this.countries.push(_countries);
			});
		},
		async getOccupations() {
			let occupationObject = [];
			await ApiService.get("v1/occupations")
				.then((data) => {
					// console.log(data);
					occupationObject = data.data.data.occupations;
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
			for (const [key, _occupation] of Object.entries(occupationObject)) {
				this.occupations.push(_occupation);
			}
		},
		setPersonalInfoRepData() {
			console.log("Rep Data Called");
			console.log(this.repData);
			if (this.repData) {
				if (this.repData.is_document_upload != null)
					this.is_document_upload = true;

				if (this.repData.ver_country != null)
					this.ver_country = this.repData.ver_country;

				if (this.repData.ver_city != null)
					this.ver_city = this.repData.ver_city;

				if (this.repData.ver_document_type != null)
					this.ver_document_type = this.repData.ver_document_type;

				if (this.repData.ver_recommender_title != null)
					this.ver_recommender_title = this.repData.ver_recommender_title;

				if (this.repData.ver_recommender_first_name != null)
					this.ver_recommender_first_name =
						this.repData.ver_recommender_first_name;

				if (this.repData.ver_recommender_last_name != null)
					this.ver_recommender_last_name =
						this.repData.ver_recommender_last_name;

				if (this.repData.ver_recommender_occupation != null)
					this.ver_recommender_occupation =
						this.repData.ver_recommender_occupation;

				if (this.repData.ver_recommender_address != null)
					this.ver_recommender_address = this.repData.ver_recommender_address;

				if (this.repData.ver_recommender_mobile_no != null)
					this.ver_recommender_mobile_no =
						this.repData.ver_recommender_mobile_no;
			}
		},
		// onConfirmationSwitchChnaged(checked) {
		// 	this.is_document_upload = checked;
		// },
		onChangeCountry(value) {
			this.ver_country = value;
			this.countries.map((_country) => {
				if (_country.name == value) {
					this.cities1 = _country.cities;
				}
			});
		},
	},
};
</script>


<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.ant-tooltip-inner {
	border-radius: 0px;
}

img {
	border-radius: 5px;
}
.img-preview {
	width: 180px;
	border: 1px solid $color-secondary;
	border-radius: 5px;
	margin: 0px auto;
	height: 200px;
}
input[type="file"] {
	cursor: pointer;
	width: 180px;
	height: 34px;
	overflow: hidden;
	border-radius: 5px !important;
}

input[type="file"]:before {
	width: 180px;
	height: 32px;
	font-size: 16px;
	line-height: 32px;
	content: "Upload";
	display: inline-block;
	color: white;
	background: #8781bd;
	border: 1px solid #98a0e2;
	padding: 0 10px;
	text-align: center;
	font-family: Helvetica, Arial, sans-serif;
}

#checkIcon {
	height: 18px;
	margin-right: 5px;
}

input[type="file"]::-webkit-file-upload-button {
	visibility: hidden;
}
</style>