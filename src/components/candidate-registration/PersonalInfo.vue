<template>
	<div class="personal-info">
		<div class="section-heading heading-text">
			<h5>Personal Information</h5>
			<p>Your Personal Information</p>
		</div>
		<a-collapse
			:activeKey="$store.state.candidateInfo.activePanel"
			:bordered="false"
			expand-icon-position="right"
		>
			<template #expandIcon="props">
				<a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
			</template>
			<!-- <pre>{{ $store.state.candidateInfo.personalinformation }}</pre> -->
			<!-- 1. Essential Information -->
			<a-collapse-panel key="1" header="1. Essential Information">
				<form class="form-ma">
					<a-row type="flex" align="top">
						<!-- Gender -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.essential
													.per_gender
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your gender?
									</div>
									<!-- <need-help title="Select Your Gender"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Select gender"
										class="select-ma w-100"
										v-model="
											$store.state.candidateInfo.personalinformation.essential
												.per_gender
										"
									>
										<a-select-option disabled :value="0"
											>Select your gender</a-select-option
										>
										<a-select-option :value="1">Male</a-select-option>
										<a-select-option :value="2">Female</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoGender" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[27].first" @click="arr[27].first = !arr[27].first">
												Need Help?
											</span>
											<span v-else @click="arr[27].first = !arr[27].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoGender">
										<div class="card card-body bubble">
											Select Your Gender
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- DOB -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.essential
													.dob
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your date of birth?
									</div>
									<!-- <need-help title="Choose DOB"></need-help> -->
								</a-col>
								<a-col :span="12" class="date-of-birth text-left">
									<DropdownDatePicker
										displayFormat="dmy"
										dropdownClass="custom-select"
										:key="default_date"
										:default-date="default_date"
										v-model="dobFromDatePicker"
										:on-change="onChangeDD"
										:maxYear="new Date().getFullYear() - 18"
										:minYear="1940"
									></DropdownDatePicker>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoDateOfBirth" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[26].first" @click="arr[26].first = !arr[26].first">
												Need Help?
											</span>
											<span v-else @click="arr[26].first = !arr[26].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoDateOfBirth">
										<div class="card card-body bubble">
											Choose DOB
										</div>
									</div>
								</a-col>							</a-row>
						</a-col>

						<!-- Height -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="height"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your height?
									</div>
									<!-- <need-help title="Please provide height in cm"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-input
										suffix="cm"
										v-model.number="height"
										placeholder="Enter your height"
										type="number"
									/>
								</a-col>
									<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoHeight" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[25].first" @click="arr[25].first = !arr[25].first">
												Need Help?
											</span>
											<span v-else @click="arr[25].first = !arr[25].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoHeight">
										<div class="card card-body bubble">
											Please provide height in cm
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Employment status -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.essential
													.per_employment_status
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your employment status?
									</div>
									<!-- <need-help title="Your current employment status"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Select your employment status"
										class="select-ma w-100"
										v-model="
											$store.state.candidateInfo.personalinformation.essential
												.per_employment_status
										"
									>
										<a-select-option disabled :value="null"
											>Select your employment status</a-select-option
										>
										<a-select-option value="employed">Employed</a-select-option>
										<a-select-option value="unemployed"
											>Unemploymed</a-select-option
										>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoEmploymentSatus" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[24].first" @click="arr[24].first = !arr[24].first">
												Need Help?
											</span>
											<span v-else @click="arr[24].first = !arr[24].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoEmploymentSatus">
										<div class="card card-body bubble">
											Your current employment status
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Occupation -->
						<!-- Occupuation field needs to added  in database -->
						<!-- <a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your occupation?
									</div>
									<span class="color-info fw-500">Need help?</span>
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Select Occupation"
										class="select-ma w-100"
									>
										<a-select-option value="doctor">Doctor</a-select-option>
										<a-select-option value="engineer">Engineer</a-select-option>
									</a-select>
								</a-col>
							</a-row>
						</a-col> -->

						<!-- Occupations -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.essential
													.per_occupation
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your occupation?
									</div>
									<!-- <need-help title="Your current profession"></need-help> -->
								</a-col>

								<a-col :span="12">
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										style="width: 150px"
										placeholder="Please select your education status"
										v-model="
											$store.state.candidateInfo.personalinformation.essential
												.per_occupation
										"
										class="select-ma w-100"
									>
										<a-select-option :value="null" disabled
											>Select your occupation</a-select-option
										>
										<a-select-option
											:value="value"
											:key="key"
											style="width: 100px"
											v-for="(value, key) in $store.state.candidateInfo
												.occupations"
										>
											{{ value }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoOccupation" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[23].first" @click="arr[23].first = !arr[23].first">
												Need Help?
											</span>
											<span v-else @click="arr[23].first = !arr[23].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoOccupation">
										<div class="card card-body bubble">
											Your current profession
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>
						<!-- Education Level -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.essential
													.per_education_level_id
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your highest level of education?
									</div>
									<!-- <need-help
										title="Your highest level of education"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										show-search
										:showArrow="true"
										placeholder="Please select your education status"
										v-model="
											$store.state.candidateInfo.personalinformation.essential
												.per_education_level_id
										"
										class="select-ma w-100"
									>
										<!-- <a-select-option value="">Bs</a-select-option>
                  <a-select-option value="a">MS</a-select-option>
                  <a-select-option value="b">other</a-select-option>      -->
										<a-select-option disabled :value="0"
											>Select your education level</a-select-option
										>
										<a-select-option
											:value="item.id"
											v-bind:key="index"
											v-for="(item, index) in $store.state.candidateInfo
												.study_level_options"
											>{{ item.name }}</a-select-option
										>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoHighestLevelEducation" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[22].first" @click="arr[22].first = !arr[22].first">
												Need Help?
											</span>
											<span v-else @click="arr[22].first = !arr[22].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoHighestLevelEducation">
										<div class="card card-body bubble">
											Your highest level of education
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Religion -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.essential
													.per_religion_id
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your religion?
									</div>
									<!-- <need-help title="Your religion"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										show-search
										ref="select"
										placeholder="Select your religion"
										v-model="
											$store.state.candidateInfo.personalinformation.essential
												.per_religion_id
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="0"
											>Select your Religion</a-select-option
										>
										<a-select-option
											:value="item.id"
											v-bind:key="index"
											v-for="(item, index) in $store.state.candidateInfo
												.religion_options"
											class="ma-select w-100"
										>
											{{ item.name }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoReligion" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[21].first" @click="arr[21].first = !arr[21].first">
												Need Help?
											</span>
											<span v-else @click="arr[21].first = !arr[21].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoReligion">
										<div class="card card-body bubble">
											Your religion
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- TODO - Practicing Religion Missing? -->

						<!-- Essential Information End -->
					</a-row>
					<a-button
						shape="round"
						type="primary"
						style="float: right"
						class="mt-3"
						:loading="loadingButton"
						@click="saveEssentialInfo"
					>
						Save & Continue
					</a-button>
				</form>
			</a-collapse-panel>

			<!-- 2. General Information -->
			<a-collapse-panel key="2" header="2. General Information" style="margin-top: 5px;">
				<form class="form-ma">
					<a-row type="flex" align="top">
						<!-- Ethnicity -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.general
													.per_ethnicity
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your ethnicity?
									</div>
									<!-- <need-help title="Your Ethnicity"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										ref="select"
										style="width: 150px"
										placeholder="Please select"
										v-model="
											$store.state.candidateInfo.personalinformation.general
												.per_ethnicity
										"
										class="select-ma w-100"
									>
										<a-select-option :value="null" disabled
											>Select Ethnicity</a-select-option
										>

										<a-select-option
											v-for="(ethnicity, key) in ethnicityList"
											:value="ethnicity"
											:key="key"
										>
											{{ ethnicity }}
										</a-select-option>
									</a-select>
									<!-- <a-input
										placeholder="Exp: British Bangladesh"
										v-model="
											$store.state.candidateInfo.personalinformation.general
												.per_ethnicity
										"
									/> -->
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoEthnicity" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[20].first" @click="arr[20].first = !arr[20].first">
												Need Help?
											</span>
											<span v-else @click="arr[20].first = !arr[20].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoEthnicity">
										<div class="card card-body bubble">
											Your Ethnicity
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Mother Tounge -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.general
													.per_mother_tongue
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your mother tongue?
									</div>
									<!-- <need-help title="Your Mother Language"></need-help> -->
								</a-col>
								<a-col :span="12">
									<!-- <a-input
                    placeholder="Exp: Bangla"
                    v-model="
                      $store.state.candidateInfo.personalinformation.general
                        .per_mother_tongue
                    "
                  /> -->
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										ref="select"
										placeholder="Select your mother tongue"
										v-model="
											$store.state.candidateInfo.personalinformation.general
												.per_mother_tongue
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="null"
											>Select your mother tongue</a-select-option
										>
										<a-select-option
											v-for="language in languages"
											:value="language"
											:key="language.id"
										>
											{{ language }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoSpeakingLanguage" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[19].first" @click="arr[19].first = !arr[19].first">
												Need Help?
											</span>
											<span v-else @click="arr[19].first = !arr[19].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoSpeakingLanguage">
										<div class="card card-body bubble">
											Your Mother Language
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Nationality -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.general
													.per_nationality
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your nationality?
									</div>
									<!-- <need-help title="Your Nationality"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										show-search
										style="width: 150px"
										placeholder="Country"
										v-model="
											$store.state.candidateInfo.personalinformation.general
												.per_nationality
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="0"
											>Select your nationality</a-select-option
										>
										<a-select-option
											:value="item.id"
											v-bind:key="index"
											style="width: 100px"
											v-for="(item, index) in $store.state.candidateInfo
												.countries"
										>
											{{ item.name }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfonationality" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[18].first" @click="arr[18].first = !arr[18].first">
												Need Help?
											</span>
											<span v-else @click="arr[18].first = !arr[18].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfonationality">
										<div class="card card-body bubble">
											Your Nationality
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Country Of Birth -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.general
													.per_country_of_birth
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your country of birth?
									</div>
									<!-- <need-help title="Your country of birth"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										show-search
										style="width: 150px"
										placeholder="Country"
										v-model="
											$store.state.candidateInfo.personalinformation.general
												.per_country_of_birth
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="0"
											>Select your country of birth</a-select-option
										>
										<a-select-option
											:value="item.id"
											v-bind:key="index"
											style="width: 100px"
											v-for="(item, index) in $store.state.candidateInfo
												.countries"
										>
											{{ item.name }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoCountryOfBirth" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[17].first" @click="arr[17].first = !arr[17].first">
												Need Help?
											</span>
											<span v-else @click="arr[17].first = !arr[17].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoCountryOfBirth">
										<div class="card card-body bubble">
											Your country of birth
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- General Health and Well being -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.general
													.per_health_condition
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>How would you describe your general health and wellbeing?
									</div>
									<!-- <need-help title="Your current health condition"></need-help> -->
								</a-col>
								<a-col :span="12">
									<textarea
										placeholder="Exp: Bangladesh"
										cols="30"
										rows="3"
										v-model="
											$store.state.candidateInfo.personalinformation.general
												.per_health_condition
										"
										class="w-100 text-box"
									></textarea>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoHealthCondition" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[16].first" @click="arr[16].first = !arr[16].first">
												Need Help?
											</span>
											<span v-else @click="arr[16].first = !arr[16].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoHealthCondition">
										<div class="card card-body bubble">
											Your current health condition
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-button
						shape="round"
						type="primary"
						style="float: right"
						class="mt-3"
						:loading="loadingButton"
						@click="saveGeneralInfo"
					>
						Save & Continue
					</a-button>
				</form>
			</a-collapse-panel>

			<!-- 3. Contact Details -->
			<a-collapse-panel key="3" header="3. Contact Details" style="margin-top: 5px;">
				<form class="form-ma">
					<a-row>
						<!-- Current Residence -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.contact
													.per_current_residence_country &&
												$store.state.candidateInfo.personalinformation.contact
													.per_current_residence_city
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your current place of residence?
									</div>
									<!-- <need-help
										title="Provide current residence's country and city"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-row :span="24">
										<a-col :span="11">
											<!-- Current Country -->
											<a-select
												style="width: 150px"
												placeholder="Country"
												v-model="
													$store.state.candidateInfo.personalinformation.contact
														.per_current_residence_country
												"
												class="select-ma w-100"
												@change="onChangeCurrentCountry"
											>
												<a-select-option disabled :value="0"
													>Select Country</a-select-option
												>
												<a-select-option
													:value="item.id"
													v-bind:key="index"
													style="width: 100px"
													v-for="(item, index) in $store.state.candidateInfo
														.countries"
												>
													{{ item.name }}
												</a-select-option>
											</a-select>
										</a-col>
										<a-col :span="2"></a-col>
										<a-col :span="11">
											<!-- Current City -->
											<a-select
												style="width: 150px"
												placeholder="Country"
												v-model.number="
													$store.state.candidateInfo.personalinformation.contact
														.per_current_residence_city
												"
												class="select-ma w-100"
											>
												<a-select-option disabled :value="0"
													>Select City</a-select-option
												>
												<a-select-option
													v-for="city in currentCities"
													:key="city.id"
													:value="city.id"
													>{{ city.name }}</a-select-option
												>
											</a-select>
										</a-col>
									</a-row>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoCurrentResidenceCity" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[15].first" @click="arr[15].first = !arr[15].first">
												Need Help?
											</span>
											<span v-else @click="arr[15].first = !arr[15].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoCurrentResidenceCity">
										<div class="card card-body bubble">
											Provide current residence's country and city
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Permanent Address Heading -->
						<a-col class="form-item py-3" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">What is your permanent address?</div>
								</a-col>
								<a-col :span="12"> </a-col>
							</a-row>
						</a-col>

						<!-- Permanent Post Code  -->
						<a-col class="form-item py-3" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="postCode"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Post Code
									</div>
									<!-- <need-help
										title="Post Code for permanent address"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-input placeholder="Post Code" v-model="postCode" />
								</a-col>
									<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoPostCode" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[14].first" @click="arr[14].first = !arr[14].first">
												Need Help?
											</span>
											<span v-else @click="arr[14].first = !arr[14].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoPostCode">
										<div class="card card-body bubble">
											Post Code for permanent address
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Permanent Residence -->
						<a-col class="form-item py-3" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.contact
													.per_permanent_country &&
												$store.state.candidateInfo.personalinformation.contact
													.per_permanent_city
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Permanent Country and City
									</div>
									<!-- <need-help
										title="Permanent address Country and City"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-row :span="24">
										<a-col :span="11">
											<!-- Permanent Country -->
											<a-select
												style="width: 150px"
												placeholder="Country"
												v-model="
													$store.state.candidateInfo.personalinformation.contact
														.per_permanent_country
												"
												class="select-ma w-100"
												@change="onChangePermanentCountry"
											>
												<a-select-option disabled :value="0"
													>Select Country</a-select-option
												>
												<a-select-option
													:value="item.id"
													v-bind:key="index"
													style="width: 100px"
													v-for="(item, index) in $store.state.candidateInfo
														.countries"
												>
													{{ item.name }}
												</a-select-option>
											</a-select>
										</a-col>
										<a-col :span="2"></a-col>
										<a-col :span="11">
											<!-- Current City -->
											<a-select
												style="width: 150px"
												placeholder="Country"
												v-model="
													$store.state.candidateInfo.personalinformation.contact
														.per_permanent_city
												"
												class="select-ma w-100"
											>
												<a-select-option disabled :value="0"
													>Select City</a-select-option
												>
												<a-select-option
													v-for="city in permanentCities"
													:key="city.id"
													:value="city.id"
													>{{ city.name }}</a-select-option
												>
											</a-select>
										</a-col>
									</a-row>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#personalInfoParmanentCountryCity" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[13].first" @click="arr[13].first = !arr[13].first">
												Need Help?
											</span>
											<span v-else @click="arr[13].first = !arr[13].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="personalInfoParmanentCountryCity">
										<div class="card card-body bubble">
											Permanent address Country and City
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Home Permanent Address  -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.contact
													.per_permanent_address
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Home Address
									</div>
									<!-- <need-help title="Full address"></need-help> -->
								</a-col>
								<a-col :span="12">
									<textarea
										cols="30"
										rows="3"
										v-model="
											$store.state.candidateInfo.personalinformation.contact
												.per_permanent_address
										"
										class="w-100 text-box"
										placeholder="Sample Text"
									></textarea>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoFullAddress" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[12].first" @click="arr[12].first = !arr[12].first">
												Need Help?
											</span>
											<span v-else @click="arr[12].first = !arr[12].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoFullAddress">
										<div class="card card-body bubble">
											Full address
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Mobile Number -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation.contact
													.mobile_number &&
												$store.state.candidateInfo.personalinformation.contact
													.mobile_country_code
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your mobile number?
									</div>
									<!-- <need-help
										title="Provide mobile number with country code"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-row :span="24">
										<a-col :span="6">
											<a-select
												ref="select"
												v-model="
													$store.state.candidateInfo.personalinformation.contact
														.mobile_country_code
												"
												placeholder="Country Code"
											>
												<a-select-option value="">Select</a-select-option>
												<a-select-option value="+880">+880</a-select-option>
												<a-select-option value="+66">+66</a-select-option>
												<a-select-option value="+77">+77</a-select-option>
											</a-select>
										</a-col>
										<a-col :span="1"></a-col>
										<a-col :span="17">
											<a-input
												v-model="
													$store.state.candidateInfo.personalinformation.contact
														.mobile_number
												"
												placeholder="Mobile Number"
											/>
										</a-col>
										<!-- <a-col :span="6">
											<a-button type="primary">Verify</a-button>
										</a-col> -->
									</a-row>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsepersonalInfoContactNumber" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[11].first" @click="arr[11].first = !arr[11].first">
												Need Help?
											</span>
											<span v-else @click="arr[11].first = !arr[11].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsepersonalInfoContactNumber">
										<div class="card card-body bubble">
											Provide mobile number with country code
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Email Address -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="$store.state.user.user.email"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your email address?
									</div>
									<!-- <need-help
										title="Your registered email address. Read only field."
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-input
										type="email"
										:value="$store.state.user.user.email"
										placeholder="Sample email"
										:disabled="true"
									/>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoEmailId" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[10].first" @click="arr[10].first = !arr[10].first">
												Need Help?
											</span>
											<span v-else @click="arr[10].first = !arr[10].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoEmailId">
										<div class="card card-body bubble">
											Your registered email address. Read only field.
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-button
						shape="round"
						type="primary"
						style="float: right"
						class="mt-3"
						:loading="loadingButton"
						@click="saveContactInfo"
					>
						Save & Continue
					</a-button>
				</form>
			</a-collapse-panel>

			<!-- 4. More About You -->
			<a-collapse-panel key="4" header="4. More About You" style="margin-top: 5px;">
				<form class="form-ma">
					<a-row>
						<!-- Martial Status -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_marital_status
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your marital status?
									</div>
									<!-- <need-help title="Current Marital Status"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Select your Marital Status"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_marital_status
										"
										class="select-ma"
									>
										<a-select-option value="single">Single</a-select-option>
										<a-select-option value="married">Married</a-select-option>
										<a-select-option value="divorced">Divorced</a-select-option>
										<a-select-option value="divorced_with_children"
											>Divorced with Children</a-select-option
										>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoMaritalStatus" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[9].first" @click="arr[9].first = !arr[9].first">
												Need Help?
											</span>
											<span v-else @click="arr[9].first = !arr[9].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoMaritalStatus">
										<div class="card card-body bubble">
											Current Marital Status
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Current Living Arrangement -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_currently_living_with
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your current living arrangement?
									</div>
									<!-- <need-help title="Current living situation"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Currently Living With"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_currently_living_with
										"
										class="select-ma"
									>
										<a-select-option disabled :value="null"
											>Select your current living arrangement</a-select-option
										>
										<a-select-option value="parents">Parents</a-select-option>
										<a-select-option value="live in my own home"
											>Live in my own home</a-select-option
										>
										<a-select-option value="live in others home"
											>Live in others home</a-select-option
										>
										<a-select-option value="other">Other</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoCuurentlyLivingWith" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[8].first" @click="arr[8].first = !arr[8].first">
												Need Help?
											</span>
											<span v-else @click="arr[8].first = !arr[8].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoCuurentlyLivingWith">
										<div class="card card-body bubble">
											Current living situation
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Willing to relocate -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_willing_to_relocate
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Are you willing to relocate?
									</div>
									<!-- <need-help
										title="Willing To change your location of living"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Willing to relocate"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_willing_to_relocate
										"
										class="select-ma"
									>
										<a-select-option disabled :value="null"
											>Select your option</a-select-option
										>
										<a-select-option value="1">Yes</a-select-option>
										<a-select-option value="2">No</a-select-option>
										<a-select-option value="3">Let's discuss</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoWillingToRelocate" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[7].first" @click="arr[7].first = !arr[7].first">
												Need Help?
											</span>
											<span v-else @click="arr[7].first = !arr[7].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoWillingToRelocate">
										<div class="card card-body bubble">
											Willing To change your location of living
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Smoker? -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_smoker
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Are you a smoker?
									</div>
									<!-- <need-help title="Smoker or not"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										ref="select"
										placeholder="Smoker"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_smoker
										"
										class="select-ma"
									>
										<a-select-option disabled :value="0"
											>Select whether you are a smoker or not?</a-select-option
										>
										<a-select-option :value="1">Yes</a-select-option>
										<a-select-option :value="2">No</a-select-option>
										<a-select-option :value="3">Former smoker</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoSmokerOrNot" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[6].first" @click="arr[6].first = !arr[6].first">
												Need Help?
											</span>
											<span v-else @click="arr[6].first = !arr[6].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoSmokerOrNot">
										<div class="card card-body bubble">
											Smoker or not
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Languague I speak -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_language_speak
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What language do you speak?
									</div>
									<!-- <need-help title="Language you speak"></need-help> -->
								</a-col>
								<a-col :span="12">
									<!-- <a-select
                    :showArrow="true"
                    placeholder="Language I Speak?"
                    v-model="
                      $store.state.candidateInfo.personalinformation.more_about
                        .per_language_speak
                    "
                    class="select-ma"
                  >
                    <a-select-option disabled :value="null"
                      >Select your language</a-select-option
                    >
                    <a-select-option value="English">English</a-select-option>
                    <a-select-option value="Bangla">Bangla</a-select-option>
                  </a-select> -->
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										ref="select"
										placeholder="Select the language you speak"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_language_speak
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="null"
											>Select the language you speak</a-select-option
										>
										<a-select-option
											v-for="(spoken_language, key) in languages"
											:value="spoken_language"
											:key="key"
										>
											{{ spoken_language }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoSpeakingLanguages" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[5].first" @click="arr[5].first = !arr[5].first">
												Need Help?
											</span>
											<span v-else @click="arr[5].first = !arr[5].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoSpeakingLanguages">
										<div class="card card-body bubble">
											Language you speak
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Hobbies -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_hobbies_interests
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What are your hobbies and leisure interests?
									</div>
									<!-- <need-help title="Your hobbies"></need-help> -->
								</a-col>
								<a-col :span="12">
									<!-- <a-select
                    :showArrow="true"
                    placeholder="My hobbies & interest"
                    v-model="
                      $store.state.candidateInfo.personalinformation.more_about
                        .per_hobbies_interests
                    "
                    class="select-ma"
                  >
                    <a-select-option disabled :value="null"
                      >Select your Hobby</a-select-option
                    >
                    <a-select-option value="Music">Music</a-select-option>
                    <a-select-option value="Cricket">Cricket</a-select-option>
                  </a-select> -->
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										ref="select"
										placeholder="Select your hobbies"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_hobbies_interests
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="null"
											>Select your hobbies
										</a-select-option>
										<a-select-option
											v-for="(hobby, key) in hobbies"
											:value="hobby"
											:key="key"
										>
											{{ hobby }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoHobbies" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[4].first" @click="arr[4].first = !arr[4].first">
												Need Help?
											</span>
											<span v-else @click="arr[4].first = !arr[4].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoHobbies">
										<div class="card card-body bubble">
											Your hobbies
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Food and cuisine -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_food_cuisine_like
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What are your favorite food and cuisine?
									</div>
									<!-- <need-help title="Favorite Food and cuisine"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										placeholder="Food and Cuisine I like"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_food_cuisine_like
										"
										class="select-ma"
									>
										<a-select-option disabled :value="null"
											>Select your Favorite Food Cuisine</a-select-option
										>
										<a-select-option
											:value="value"
											:key="key"
											v-for="(value, key) in foods"
										>
											{{ value }}
										</a-select-option>
										<!-- <a-select-option value="Chinese">Chinese</a-select-option>
										<a-select-option value="Italian">Italian</a-select-option> -->
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoFavoriteFood" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[3].first" @click="arr[3].first = !arr[3].first">
												Need Help?
											</span>
											<span v-else @click="arr[3].first = !arr[3].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoFavoriteFood">
										<div class="card card-body bubble">
											Favorite Food and cuisine.
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Things I enjoy -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_things_enjoy
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What types of things do you enjoy?
									</div>
									<!-- <need-help title="Things you enjoy"></need-help> -->
								</a-col>
								<a-col :span="12">
									<!-- <a-select
                    :showArrow="true"
                    placeholder="Things I Enjoy"
                    v-model="
                      $store.state.candidateInfo.personalinformation.more_about
                        .per_things_enjoy
                    "
                    class="select-ma"
                  >
                    <a-select-option disabled :value="null"
                      >Select things you enjoy</a-select-option
                    >
                    <a-select-option value="Music">Music</a-select-option>
                    <a-select-option value="Cricket">Cricket</a-select-option>
                  </a-select> -->
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										ref="select"
										placeholder="Select your hobbies"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_things_enjoy
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="null"
											>Select things you enjoy
										</a-select-option>
										<a-select-option
											v-for="(hobby, key) in hobbies"
											:key="key"
											:value="hobby"
										>
											{{ hobby }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoEnjoyfullThings" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[2].first" @click="arr[2].first = !arr[2].first">
												Need Help?
											</span>
											<span v-else @click="arr[2].first = !arr[2].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoEnjoyfullThings">
										<div class="card card-body bubble">
											Things you enjoy
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Thankful for-->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_thankfull_for
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What kind of things are you thankful for in life?
									</div>
									<!-- <need-help
										title="kind of things are you thankful for"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										placeholder="I'm Thankfull For"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_thankfull_for
										"
										class="select-ma"
									>
										<a-select-option disabled :value="null"
											>Select things you are thankful for</a-select-option
										>
										<a-select-option
											:value="value.value"
											:key="key"
											style="width: 100px"
											v-for="(value, key) in thankfulThings"
										>
											{{ value.label }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoThankulFor" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[1].first" @click="arr[1].first = !arr[1].first">
												Need Help?
											</span>
											<span v-else @click="arr[1].first = !arr[1].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoThankulFor">
										<div class="card card-body bubble">
											kind of things are you thankful for
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- About Me -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.personalinformation
													.more_about.per_about
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>A little about me
									</div>
									<!-- <need-help title="A little about yourself"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-textarea
										placeholder="Exp: 19/ burder way, england"
										:rows="3"
										v-model="
											$store.state.candidateInfo.personalinformation.more_about
												.per_about
										"
									/>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapsePersonalInfoMoreAboutMe" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[0].first" @click="arr[0].first = !arr[0].first">
												Need Help?
											</span>
											<span v-else @click="arr[0].first = !arr[0].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapsePersonalInfoMoreAboutMe">
										<div class="card card-body bubble">
											A little about yourself
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-button
						shape="round"
						type="primary"
						style="float: right"
						class="mt-3"
						:loading="loadingButton"
						@click="saveMoreAboutInfo"
					>
						Save & Continue
					</a-button>
				</form>
			</a-collapse-panel>

			<!-- Current Residence -->
			<!-- <a-col :span="12">
				<a-form-item label="Current Residence">
					<a-input
						placeholder="Exp: London, england"
						v-model="
							$store.state.candidateInfo.personalinformation.current_residence
						"
					/>
				</a-form-item>
			</a-col> -->
		</a-collapse>

		<!-- {{ $store.state.candidateInfo.personalinformation }} -->
	</div>
</template>
<script>
import DropdownDatePicker from "vue-dropdown-datepicker";
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";

export default {
	name: "PersonalInfo",
	components: {
		DropdownDatePicker,
		NeedHelp,
	},
	data() {
		return {
			languages: languages,
			hobbies: hobbies,
			foods: foods,
			thankfulThings: thankfulThings,
			ethnicityList: ethnicities,
			default_date: undefined,
			dobFromDatePicker: undefined,
			currentCities: null,
			permanentCities: null,
			loadingButton: false,
			arr: [
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				},
				{
					first: true,
				}
			],
		};
	},
	created() {
		this.$store.state.candidateInfo.activePanel = 1;
	},
	mounted() {
		console.log("Personal info mounted");
		let payload = {
			token: this.$store.state.auth.token,
			userId: this.$store.state.user.user.id,
		};
		this.fetchPersonalInfo(payload);
		//this.$store.dispatch("getPersonalInfo", payload);
	},
	computed: {
		height: {
			get() {
				if (
					this.$store.state.candidateInfo.personalinformation.essential
						.per_height == 0
				) {
					return null;
				} else {
					return this.$store.state.candidateInfo.personalinformation.essential
						.per_height;
				}
			},
			set(newValue) {
				this.$store.state.candidateInfo.personalinformation.essential.per_height =
					newValue;
			},
		},
		postCode: {
			get() {
				if (
					this.$store.state.candidateInfo.personalinformation.contact
						.per_permanent_post_code == 0
				) {
					return null;
				} else {
					return this.$store.state.candidateInfo.personalinformation.contact
						.per_permanent_post_code;
				}
			},
			set(newValue) {
				this.$store.state.candidateInfo.personalinformation.contact.per_permanent_post_code =
					newValue;
			},
		},
	},
	methods: {
		showError(errorMessage) {
			this.$error({
				title: "Validation Error",
				content: errorMessage,
				centered: true,
			});
		},
		filterOption(input, option) {
			return (
				option.componentOptions.children[0].text
					.toLowerCase()
					.indexOf(input.toLowerCase()) >= 0
			);
		},
		async fetchPersonalInfo(payload) {
			await this.$store.dispatch("getPersonalInfo", payload);
			this.fetchDob();
			this.fetchCities();
		},
		onChangeDD(d, m, y) {
			console.log(d, m, y);
			console.log(
				this.$store.state.candidateInfo.personalinformation.essential.dob
			);
		},
		fetchDob() {
			if (this.$store.state.candidateInfo.personalinformation.essential.dob) {
				this.default_date =
					this.$store.state.candidateInfo.personalinformation.essential.dob;
				this.dobFromDatePicker =
					this.$store.state.candidateInfo.personalinformation.essential.dob;
			}
		},
		fetchCities() {
			if (
				this.$store.state.candidateInfo.personalinformation.contact
					.per_current_residence_country
			) {
				this.$store.state.candidateInfo.countries.map((c) => {
					if (
						c.id ==
						this.$store.state.candidateInfo.personalinformation.contact
							.per_current_residence_country
					) {
						this.currentCities = c.cities;
					}
				});
			}
			if (
				this.$store.state.candidateInfo.personalinformation.contact
					.per_permanent_country
			) {
				this.$store.state.candidateInfo.countries.map((c) => {
					if (
						c.id ==
						this.$store.state.candidateInfo.personalinformation.contact
							.per_permanent_country
					) {
						this.permanentCities = c.cities;
					}
				});
			}
		},
		onChangeCurrentCountry(value) {
			console.log(value);
			this.$store.state.candidateInfo.countries.map((c) => {
				if (c.id == value) {
					this.currentCities = c.cities;
				}
			});
			console.log(this.currentCities);
		},
		onChangePermanentCountry(value) {
			console.log(value);
			this.$store.state.candidateInfo.countries.map((c) => {
				if (c.id == value) {
					this.permanentCities = c.cities;
				}
			});
			console.log(this.permanentCities);
		},
		openNotification() {
			this.$notification.open({
				message: this.$store.state.candidateInfo.successMessageTitle,
				description: this.$store.state.candidateInfo.successMessage,
				onClick: () => {
					console.log("Notification Clicked!");
				},
			});
		},
		warning(message) {
			this.$message.error(message);
		},

		async saveEssentialInfo() {
			this.loadingButton = true;
			const _payload = {
				dob: this.dobFromDatePicker,
				per_gender:
					this.$store.state.candidateInfo.personalinformation.essential
						.per_gender,
				per_height:
					this.$store.state.candidateInfo.personalinformation.essential
						.per_height,
				per_employment_status:
					this.$store.state.candidateInfo.personalinformation.essential
						.per_employment_status,
				per_occupation:
					this.$store.state.candidateInfo.personalinformation.essential
						.per_occupation,
				per_education_level_id:
					this.$store.state.candidateInfo.personalinformation.essential
						.per_education_level_id,
				per_religion_id:
					this.$store.state.candidateInfo.personalinformation.essential
						.per_religion_id,
				mobile_number: "154636",
				mobile_country_code: "880",
				per_telephone_no: "45876987",
			};
			console.log(_payload);

			//Form Validation
			if (_payload.per_gender == "" || _payload.per_gender == null) {
				this.showError("Gender can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.dob == "" || _payload.dob == null) {
				this.showError("DOB can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.per_height <= 0 || _payload.per_height == null) {
				this.showError("Height can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.dob == "" || _payload.dob == null) {
				this.showError("DOB can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_employment_status == "" ||
				_payload.per_employment_status == null
			) {
				this.showError("Employment Status can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.per_occupation == "" || _payload.per_occupation == null) {
				this.showError("Occupation Status can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_education_level_id == "" ||
				_payload.per_education_level_id == null
			) {
				this.showError("Education Level can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.per_religion_id == "" || _payload.per_religion_id == null) {
				this.showError("Religion can't be empty!");
				this.loadingButton = false;
				return;
			}

			await this.$store
				.dispatch("savePersonalEssentialInfo", _payload)
				.then((data) => {
					if (data.data.status && data.data.status !== "FAIL") {
						console.log("Data saved to DB");
						this.loadingButton = false;
						console.log(data.data);
						this.$success({
							title: "Success!",
							content: data.data.message,
							center: true,
						});
						this.$store.state.candidateInfo.activePanel++;
					}
					if (data.data.status && data.data.status == "FAIL") {
						throw new Error(data.data);
					}
				})
				.catch((error) => {
					console.log(error.response.data.message);
					this.showError(error.response.data.message);
				});
		},
		async saveGeneralInfo() {
			this.loadingButton = true;
			const _payload = {
				per_ethnicity:
					this.$store.state.candidateInfo.personalinformation.general
						.per_ethnicity,
				per_mother_tongue:
					this.$store.state.candidateInfo.personalinformation.general
						.per_mother_tongue,
				per_nationality:
					this.$store.state.candidateInfo.personalinformation.general
						.per_nationality,
				per_country_of_birth:
					this.$store.state.candidateInfo.personalinformation.general
						.per_country_of_birth,
				per_health_condition:
					this.$store.state.candidateInfo.personalinformation.general
						.per_health_condition,
			};
			//Form Validation
			if (_payload.per_ethnicity == "" || _payload.per_ethnicity == null) {
				this.showError("Ethnicity can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_mother_tongue == "" ||
				_payload.per_mother_tongue == null
			) {
				this.showError("Mother tongue can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.per_nationality == "" || _payload.per_nationality == null) {
				this.showError("Nationality can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_country_of_birth == "" ||
				_payload.per_country_of_birth == null
			) {
				this.showError("Country of birth can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_health_condition == "" ||
				_payload.per_health_condition == null
			) {
				this.showError("General Health and Wellbeing can't be empty!");
				this.loadingButton = false;
				return;
			}

			await this.$store
				.dispatch("savePersonalGeneralInfo", _payload)
				.then((data) => {
					if (data.data.status && data.data.status !== "FAIL") {
						console.log("Data saved to DB");
						this.loadingButton = false;
						console.log(data.data);
						this.$success({
							title: "Success!",
							content: data.data.message,
							center: true,
						});
						this.$store.state.candidateInfo.activePanel++;
					}
					if (data.data.status && data.data.status == "FAIL") {
						throw new Error(data.data);
					}
				})
				.catch((error) => {
					console.log(error.response.data.message);
					this.showError(error.response.data.message);
				});
		},
		async saveContactInfo() {
			this.loadingButton = true;
			const _payload = {
				per_current_residence_country:
					this.$store.state.candidateInfo.personalinformation.contact
						.per_current_residence_country,
				per_current_residence_city:
					this.$store.state.candidateInfo.personalinformation.contact
						.per_current_residence_city,
				per_permanent_country:
					this.$store.state.candidateInfo.personalinformation.contact
						.per_permanent_country,
				per_permanent_city:
					this.$store.state.candidateInfo.personalinformation.contact
						.per_permanent_city,
				per_county: "1sdasd",
				per_permanent_post_code:
					this.$store.state.candidateInfo.personalinformation.contact
						.per_permanent_post_code,
				per_permanent_address:
					this.$store.state.candidateInfo.personalinformation.contact
						.per_permanent_address,
				mobile_number:
					this.$store.state.candidateInfo.personalinformation.contact
						.mobile_number,
				mobile_country_code:
					this.$store.state.candidateInfo.personalinformation.contact
						.mobile_country_code,
				per_email: this.$store.state.user.user.email,
			};
			console.log(_payload);
			//Form Validation
			if (
				_payload.per_current_residence_country == "" ||
				_payload.per_current_residence_country == null
			) {
				this.showError("Current Country can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_current_residence_city == "" ||
				_payload.per_current_residence_city == null
			) {
				this.showError("Current City can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_permanent_country == "" ||
				_payload.per_permanent_country == null
			) {
				this.showError("Permanent Country can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_permanent_city == "" ||
				_payload.per_permanent_city == null
			) {
				this.showError("Permanent City can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_permanent_post_code == "" ||
				_payload.per_permanent_post_code == null
			) {
				this.showError("Post Code can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_permanent_address == "" ||
				_payload.per_permanent_address == null
			) {
				this.showError("Permanent Address can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.mobile_number == "" || _payload.mobile_number == null) {
				this.showError("Mobile number can't be empty!");
				this.loadingButton = false;
				return;
			}

			await this.$store
				.dispatch("savePersonalContactInfo", _payload)
				.then((data) => {
					if (data.data.status && data.data.status !== "FAIL") {
						console.log("Data saved to DB");
						this.loadingButton = false;
						console.log(data.data);
						this.$success({
							title: "Success!",
							content: data.data.message,
							center: true,
						});
						this.$store.state.candidateInfo.activePanel++;
					}
					if (data.data.status && data.data.status == "FAIL") {
						const errorMessage = JSON.stringify(data.data.data);
						this.showError(errorMessage);
						this.loadingButton = false;
					}
				})
				.catch((error) => {
					this.loadingButton = false;
					console.log(error.response.data.message);
					this.showError(error.response.data.message);
				});
		},
		async saveMoreAboutInfo() {
			this.loadingButton = true;
			const _payload = {
				per_marital_status:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_marital_status,
				per_have_children: 0,
				per_children: [
					{
						type: 1,
						count: 1,
						age: 10,
					},
				],
				per_currently_living_with:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_currently_living_with,
				per_willing_to_relocate:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_willing_to_relocate,
				per_smoker:
					this.$store.state.candidateInfo.personalinformation.more_about.per_smoker.toString(),
				per_language_speak:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_language_speak,
				per_hobbies_interests:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_hobbies_interests,
				per_food_cuisine_like:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_food_cuisine_like,
				per_things_enjoy:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_things_enjoy,
				per_thankfull_for:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_thankfull_for,
				per_about:
					this.$store.state.candidateInfo.personalinformation.more_about
						.per_about,
			};

			//Form Validation
			if (
				_payload.per_currently_living_with == "" ||
				_payload.per_currently_living_with == null
			) {
				this.showError("Current Living Arrangement can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_willing_to_relocate == "" ||
				_payload.per_willing_to_relocate == null
			) {
				this.showError("Willing to relocate can't be empty!");
				this.loadingButton = false;
				return;
			}

			if (
				_payload.per_language_speak == "" ||
				_payload.per_language_speak == null
			) {
				this.showError("Language can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_hobbies_interests == "" ||
				_payload.per_hobbies_interests == null
			) {
				this.showError("Hobbies can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_food_cuisine_like == "" ||
				_payload.per_food_cuisine_like == null
			) {
				this.showError("Food and Cuisine can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_things_enjoy == "" ||
				_payload.per_things_enjoy == null
			) {
				this.showError("Things you enjoy can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.per_thankfull_for == "" ||
				_payload.per_thankfull_for == null
			) {
				this.showError("Thankful For can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.per_about == "" || _payload.per_about == null) {
				this.showError("About me can't be empty!");
				this.loadingButton = false;
				return;
			}
			console.log(_payload);
			await this.$store
				.dispatch("savePersonalMoreAboutInfo", _payload)
				.then((data) => {
					if (data.data.status && data.data.status !== "FAIL") {
						console.log("Data saved to DB");
						this.loadingButton = false;
						console.log(data.data);
						this.$success({
							title: "Success!",
							content: data.data.message,
							center: true,
						});
						this.$store.state.candidateInfo.activePanel++;
					}
					if (data.data.status && data.data.status == "FAIL") {
						const errorMessage = JSON.stringify(data.data.data);
						this.showError(errorMessage);
						this.loadingButton = false;
					}
				})
				.catch((error) => {
					this.loadingButton = false;
					console.log(error.response.data.message);
					this.showError(error.response.data.message);
				});
		},
	},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.personal-info {
	.section-heading {
		text-align: center;
		color: $color-brand;
		h5 {
			color: $color-brand;
		}
		p {
			font-size: 14px;
		}
	}
	
	.text-box {
		border-color: $color-secondary;
		border-radius: 5px;
		color: $color-secondary;
	}
	.custom-select {
		font-size: 12px !important;
	}
}
</style>
