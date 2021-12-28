<template>
	<div class="family-info">
		<div class="section-heading heading-text">
			<h5>Family Information</h5>
			<p>Your Family's Information</p>
		</div>
		<a-collapse
			:activeKey="$store.state.candidateInfo.activePanel"
			:bordered="false"
			expand-icon-position="right"
		>
			<template #expandIcon="props">
				<a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
			</template>
			<!-- 1. Family Details  -->
			<a-collapse-panel key="1" header="1. Family Details">
				<form class="form-ma">
					<a-row>
						
						<!-- Father's Profession -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.familyinformation
													.fathersProfession
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your father's Profession?
									</div>
									<!-- <need-help
										title="Select your father's profession"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										placeholder="Please select Fathet's Profession"
										v-model="
											$store.state.candidateInfo.familyinformation
												.fathersProfession
										"
										class="select-ma"
									>
										<a-select-option :value="null" disabled
											>Select your father's profession</a-select-option
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
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapseCandidateFatherProfession" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[4].first" @click="arr[4].first = !arr[4].first">
												Need Help?
											</span>
											<span v-else @click="arr[4].first = !arr[4].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapseCandidateFatherProfession">
										<div class="card card-body bubble">
											Select your father's profession
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Mother's Profession -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.familyinformation
													.mothersProfession
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>What is your mother's Profession?
									</div>
									<!-- <need-help
										title="Select your mothers' profession"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<!-- <a-input
										placeholder="Please enter Mother's Profession"
										v-model="
											$store.state.candidateInfo.familyinformation
												.mothersProfession
										"
									/> -->
									<a-select
										:showSearch="true"
										option-filter-prop="children"
										:filter-option="filterOption"
										:showArrow="true"
										placeholder="Please select Fathet's Profession"
										v-model="
											$store.state.candidateInfo.familyinformation
												.mothersProfession
										"
										class="select-ma"
									>
										<a-select-option :value="null" disabled
											>Select your mother's profession</a-select-option
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
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapseCandidateMotherProfession" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[3].first" @click="arr[3].first = !arr[3].first">
												Need Help?
											</span>
											<span v-else @click="arr[3].first = !arr[3].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapseCandidateMotherProfession">
										<div class="card card-body bubble">
											Select your mothers' profession
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Siblings -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.familyinformation.siblings
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Do you have any siblings?
									</div>
									<!-- <need-help title="Siblings information"></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-textarea
										placeholder="2 Brothers, 2 Sisters"
										:rows="3"
										v-model="
											$store.state.candidateInfo.familyinformation.siblings
										"
									></a-textarea>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapseSiblingsInfomation" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[2].first" @click="arr[2].first = !arr[2].first">
												Need Help?
											</span>
											<span v-else @click="arr[2].first = !arr[2].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapseSiblingsInfomation">
										<div class="card card-body bubble">
											Siblings information
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- About Family -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.familyinformation
													.otherFamilyInfo
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Would you like to share any other information about your
										family?
									</div>
									<!-- <need-help
										title="Any other family info you would like to share"
									></need-help> -->
								</a-col>
								<a-col :span="12">
									<a-textarea
										placeholder="Would you like to share any other information about your family"
										:rows="3"
										v-model="
											$store.state.candidateInfo.familyinformation
												.otherFamilyInfo
										"
									></a-textarea>
								</a-col>
								<a-col :span="12">
									<p>
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapseAnyotherFamilyLike" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[1].first" @click="arr[1].first = !arr[1].first">
												Need Help?
											</span>
											<span v-else @click="arr[1].first = !arr[1].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapseAnyotherFamilyLike">
										<div class="card card-body bubble">
											Any other family info you would like to share
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Country Of Origin -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="12">
									<div class="mb-2">
										<a-icon
											v-if="
												$store.state.candidateInfo.familyinformation
													.countryOfOrigin
											"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Is your ancestral home same as your country of birth?
									</div>
									<!-- <need-help title="Select your country of birth"></need-help> -->
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
											$store.state.candidateInfo.familyinformation
												.countryOfOrigin
										"
										class="select-ma w-100"
									>
										<a-select-option disabled :value="null">
											Select your country of birth</a-select-option
										>
										<a-select-option
											show-search
											:value="item.name"
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
										<a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#collapseSelectCountryOfBirth" role="button" aria-expanded="false" aria-controls="collapseExample">
											<span v-if="arr[0].first" @click="arr[0].first = !arr[0].first">
												Need Help?
											</span>
											<span v-else @click="arr[0].first = !arr[0].first"> Hide Help? </span>
										</a>
									</p>
									<div class="collapse" id="collapseSelectCountryOfBirth">
										<div class="card card-body bubble">
											Select your country of birth
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-button
						shape="round"
						type="primary"
						style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
						class="mt-3"
						:loading="loadingButton"
						@click="saveFamilyInfo"
					>
						Save & Continue
					</a-button>
				</form>
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>
<script>
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
export default {
	name: "FamilyInfo",
	components: { NeedHelp },
	data() {
		return {
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
				}
			],
			professions: [
				"Academic Librarian",
				"Academic Researcher",
				"Accommodation Manager",
				"Account Collector",
				"Account Controller",
				"Account Executive",
				"Account Manager",
				"Account Representative",
				"Accountant",
				"Accounting Analyst",
				"Accounting Director",
				"Accounting Staff",
				"Accounting Technician",
				"Accounts Payable/Receivable Clerk",
				"Acoustic Consultant",
				"Actor",
				"Actuarial Analyst",
				"Actuary",
				"Acupuncturist",
				"Addiction Counsellor",
				"Administrative Analyst",
				"Administrative Assistant",
				"Administrative Manager",
				"Administrative Specialist",
				"Administrator",
				"Adult guidance Worker",
				"Adult Nurse",
				"Advertising Account Executive",
				"Advertising Account Planner",
				"Advertising Art Director",
				"Advertising Cpywriter",
				"Advice Worker",
				"Aerospace Engineer",
				"Agricultural Consultant",
				"Air Cabin Crew",
				"Air Traffic Controller",
				"Airline Pilot",
				"Amenity Horticulturist",
				"Anaesthetist",
				"Analytical Chemist",
				"Anatomical pathology technologist",
				"Animal Breeder",
				"Animal Control Officer",
				"Animal Nutritionist",
				"Animal Physiotherapist",
				"Animal Shelter Board Member",
				"Animal Shelter Manager",
				"Animal Shelter Volunteer",
				"Animal Shelter Worker",
				"Animal Technician",
				"Animal Trainer",
				"Animator",
				"Application Analyst",
				"Application Developer",
				"Arbitrator",
				"Arboriculturist",
				"Archaeologist",
				"Architect",
				"Architectural Technologist",
				"Archivist",
				"Area Sales Manager",
				"Armed Forces Logistics Officer",
				"Armed Forces Operational Officer",
				"Armed Forces Technical Officer",
				"Armed forces training and education officer",
				"Art therapist",
				"Art worker",
				"Artificial Intelligence Engineer",
				"Artist",
				"Arts administrator",
				"Assistant Engineer",
				"Assistant Golf Professional",
				"Assistant Manager",
				"Assistant Professor",
				"Astronomer",
				"Atmospheric Scientist",
				"Attorney",
				"Auditing Clerk",
				"Auditor",
				"Automotive engineer",
				"B2B Sales Specialist",
				"Bailiff",
				"Bank Teller",
				"Barber",
				"Barista",
				"Barrister",
				"Barristers' clerk",
				"Beautician",
				"Bellhop",
				"Benefits Manager",
				"Biological Engineer",
				"Biologist",
				"Biomedical engineer",
				"Biomedical scientist",
				"Biostatistician",
				"Biotechnologist",
				"Board Member",
				"Board of Directors",
				"Boiler Engineer",
				"Boilermaker",
				"Bookkeeper",
				"Bookseller",
				"Border Force officer",
				"Branch Manager",
				"Brand Manager",
				"Brand Strategist",
				"Bricklayer",
				"Broadcast engineer",
				"Broadcast journalist",
				"Broadcast presenter",
				"Budget Analyst",
				"Building control surveyor",
				"Building Inspector",
				"Building services engineer",
				"Building surveyor",
				"Bus Assistant",
				"Bus Driver",
				"Bus Person",
				"Business adviser",
				"Business analyst",
				"Business development manager",
				"Business Manager",
				"Cab Driver",
				"Cabinet Minister",
				"CAD technician",
				"Cafeteria Worker",
				"Call centre manager",
				"Call Centre Representative",
				"Camera Operator",
				"Cardiologist",
				"Care manager",
				"Care worker",
				"Careers adviser",
				"Careers information officer",
				"Caregiver",
				"Carer",
				"Caretaker or House Sitter",
				"Carpenter",
				"Cartographer",
				"Cashier",
				"Casino Host",
				"Catering manager",
				"CCO—Chief Customer Officer",
				"CCTV Supervisor",
				"CDO—Chief Data Officer",
				"Celebrity",
				"CEO",
				"CEO—Chief Executive Officer",
				"Ceramics designer",
				"CFO—Chief Financial Officer",
				"Chairman",
				"Chairperson",
				"Chaplain",
				"Charity Board Member (Non-profit)",
				"Charity Chief Executive (Non-profit)",
				"Charity fundraiser",
				"Charity Manager (Non-profit)",
				"Charity officer",
				"Charity Volunteer",
				"Charity Worker (Non-profit)",
				"Chartered accountant",
				"Chartered certified accountant",
				"Chartered legal executive (England and Wales)",
				"Chartered loss adjuster",
				"Chartered management accountant",
				"Chartered public finance accountant",
				"Chef",
				"Chemical engineer",
				"Chemist",
				"Chemist",
				"Chief",
				"Chief Engineer",
				"Chief Executive Officer",
				"Chief Information Officer (CIO)",
				"Chief People Officer",
				"Chief Robot Whisperer",
				"Chief Technology Officer (CTO)",
				"Child psychotherapist",
				"Children's nurse",
				"Chiropractor",
				"Choreographer",
				"CHRO—Chief Human Resources Officer",
				"Church Volunteer",
				"CIO—Chief Information Officer",
				"Civil Engineer",
				"Civil Service administrator",
				"Civil Service Fast Streamer",
				"Client Service Specialist",
				"Clinical psychologist",
				"Clinical radiologist",
				"Clinical research associate",
				"Clinical scientist, audiology",
				"Clinical scientist, biochemistry",
				"Clinical scientist, cardiac sciences",
				"Clinical scientist, embryology",
				"Clinical scientist, genomics",
				"Clinical scientist, haematology",
				"Clinical scientist, histocompatibility and immunogenetics",
				"Clinical scientist, immunology",
				"Clinical scientist, medical physics",
				"Clinical scientist, physiological sciences",
				"Clinical technologist",
				"Clothing/textile technologist",
				"Cloud Architect",
				"CMO—Chief Marketing Officer",
				"CNA",
				"Colour technologist",
				"Columnist",
				"Commercial & residential surveyor",
				"Commercial art gallery manager",
				"Commercial horticulturist",
				"Commercial Loan Officer",
				"Commissioning editor",
				"Communications Director",
				"Communications engineer",
				"Community arts worker",
				"Community development worker",
				"Community education officer",
				"Community Food Project Worker",
				"Community Food Project Worker",
				"Community pharmacist",
				"Community Volunteer Jobs",
				"Community Volunteer Jobs",
				"Company secretary",
				"Compliance officer",
				"Computer Animator",
				"Computer Programmer",
				"Computer Scientist",
				"Concept artist",
				"Concierge",
				"Concierge Assistant",
				"Concierge Manager",
				"Conference centre manager",
				"Conservation Scientist",
				"Conservation Volunteer",
				"Conservation Volunteer",
				"Conservator",
				"Construction manager",
				"Construction Worker",
				"Consulting civil engineer",
				"Content Creator",
				"Content Marketing Manager",
				"Content Strategist",
				"Continuous Improvement Consultant",
				"Continuous Improvement Lead",
				"Contracting civil engineer",
				"Control and instrumentation engineer",
				"Controller",
				"COO—Chief Operating Officer",
				"Coordinator",
				"Copy Editor",
				"Copywriter",
				"Corporate investment banker",
				"Corporate treasurer",
				"Cosmetologist",
				"Costs lawyer",
				"Councillor",
				"Counselling psychologist",
				"Counsellor",
				"Couples Counsellor",
				"Courier",
				"Court Clerk",
				"Court Official",
				"CPO—Chief Product Officer",
				"Crane Operator",
				"Creative director",
				"Credit Advisor",
				"Credit Authorizer",
				"Credit Counsellor",
				"Crime scene investigator",
				"Cruise Director",
				"Cruise Ship Attendant",
				"CTO—Chief Technology Officer",
				"Culture Operations Manager",
				"Customer Care Associate",
				"Customer Service",
				"Customer Service Assistant",
				"Customer Service Manager",
				"Customer Service Officer",
				"Customer Support Officer",
				"Customer Support Representative",
				"Cyber security analyst",
				"Dance movement psychotherapist",
				"Dancer",
				"Data Analyst",
				"Data Analyst",
				"Data Entry Assistant",
				"Data Entry Clerk",
				"Data scientist",
				"Database administrator",
				"Debt Collector",
				"Delivery Driver",
				"Dental Hygienist",
				"Dental technician",
				"Dental therapist",
				"Dentist",
				"Deputy Headteacher",
				"Deputy Mayor",
				"Design engineer",
				"Designer",
				"Detective",
				"DevOps Engineer",
				"Diagnostic radiographer",
				"Dietitian",
				"Digital copywriter",
				"Digital marketer",
				"Digital Marketing Manager",
				"Digital Overlord",
				"Digital Product Manager",
				"Diplomatic service officer",
				"Direct Salesperson",
				"Director",
				"Director of Bean Counting",
				"Director of Ethical Hacking",
				"Director of First Impressions",
				"Director of Inside Sales",
				"Director of Maintenance",
				"Director of Photography",
				"Director of Storytelling",
				"Dispatcher for Trucks or Taxis",
				"Dispensing optician",
				"Doctor",
				"Dog Trainer",
				"Dog Walker / Pet Sitter",
				"Drafter",
				"Dramatherapist",
				"Drilling engineer",
				"Early years teacher",
				"Ecologist",
				"eCommerce Marketing Specialist",
				"Economist",
				"Editor",
				"Editorial Assistant",
				"Education administrator",
				"Education consultant",
				"Educational psychologist",
				"Electrical engineer",
				"Electrician",
				"Electronic Engineer",
				"Emergency planning/management officer",
				"Emergency Relief Worker",
				"Energy engineer",
				"Energy manager",
				"Engineer",
				"Engineering geologist",
				"Engineering Technician",
				"English as a foreign language teacher",
				"Entertainment Specialist",
				"Entrepreneur",
				"Environmental consultant",
				"Environmental education officer",
				"Environmental engineer",
				"Environmental health practitioner",
				"Environmental manager",
				"Epidemiologist",
				"Equality, diversity and inclusion officer",
				"Ergonomist",
				"Estate agent",
				"Estates manager",
				"Esthetician",
				"Estimator",
				"Event manager",
				"Event Planner",
				"Events Manager",
				"Executive",
				"Executive Assistant",
				"Exercise physiologist",
				"Exhibition designer",
				"External auditor",
				"Facilities manager",
				"Family support worker",
				"Farm manager",
				"Farm Worker",
				"Fashion designer",
				"Fast food restaurant manager",
				"Fast Food Worker",
				"Field trials officer",
				"File Clerk",
				"Film Critic",
				"Film director",
				"Film/video editor",
				"Finance Director",
				"Finance Manager",
				"Financial adviser",
				"Financial Analyst",
				"Financial Analyst",
				"Financial manager",
				"Financial Planner",
				"Financial risk analyst",
				"Financial Services Representative",
				"Financial trader",
				"Fine artist",
				"Fire risk assessor",
				"Firefighter",
				"Fish farm manager",
				"Fisheries officer",
				"Fitness centre manager",
				"Flight Attendant",
				"Food Kitchen Worker",
				"Food technologist",
				"Foreman",
				"Forensic accountant",
				"Forensic computer analyst",
				"Forensic psychologist",
				"Forensic scientist",
				"Forest/woodland manager",
				"Founder",
				"Freight forwarder",
				"Front Desk Associate",
				"Front Desk Manager",
				"Front-Line Employee",
				"Funeral Attendant",
				"Funeral Director",
				"Furniture conservator/restorer",
				"Furniture designer",
				"Further education teacher",
				"Game artist",
				"Game designer",
				"Game developer",
				"General practice doctor",
				"Genetic counsellor",
				"Geochemist",
				"Geographical information systems officer",
				"Geological Engineer",
				"Geologist",
				"Geophysicist",
				"Geoscientist",
				"Geotechnical engineer",
				"Ghostwriter",
				"Glass blower/designer",
				"Government social research officer",
				"Governor",
				"Grant Writer",
				"Graphic designer",
				"Group Sales",
				"Guidance Counselor",
				"Habitat for Humanity Builder",
				"Hair Stylist",
				"Handyman",
				"Head",
				"Headteacher",
				"Health and safety adviser",
				"Health and safety inspector",
				"Health play specialist",
				"Health promotion specialist",
				"Health psychologist",
				"Health service manager",
				"Health visitor",
				"Health Worker",
				"Heavy Equipment Operator",
				"Hedge Fund Manager",
				"Help Desk Assistant",
				"Help Desk Officer",
				"Help Desk Technician",
				"Help Desk Worker/Desktop Support",
				"Herbalist",
				"Heritage manager",
				"High intensity therapist",
				"Higher education careers adviser",
				"Higher education lecturer",
				"Historic buildings inspector/conservation officer",
				"Holiday representative",
				"Homeless Shelter Worker",
				"Homeopath",
				"Horticultural consultant",
				"Horticultural therapist",
				"Hospital doctor",
				"Hospital pharmacist",
				"Hospital Volunteer",
				"Hotel Front Door Greeter",
				"Hotel manager",
				"Hotel Receptionist",
				"Housekeeper",
				"Housing manager/officer",
				"Human Resources Assistant",
				"Human Resources Manager",
				"Human Resources Officer",
				"Human Resources Specialist",
				"HVAC Technician",
				"Hydrogeologist",
				"Hydrographic surveyor",
				"Hydrologist",
				"Illustrator",
				"Imam",
				"Influencer",
				"Information officer",
				"Information Security Analyst",
				"Information systems manager",
				"Insurance account manager",
				"Insurance broker",
				"Insurance claims handler",
				"Insurance risk surveyor",
				"Insurance underwriter",
				"Intelligence analyst",
				"Interior and spatial designer",
				"Interior Designer",
				"Internal auditor",
				"International development worker",
				"Interpreter",
				"Investment Analyst",
				"Iron Worker",
				"IT consultant",
				"IT Manager",
				"IT Professional",
				"IT sales professional",
				"IT Security Expert",
				"IT technical support officer",
				"IT trainer",
				"IT Worker ",
				"Jewellery designer",
				"Journalist",
				"Judge",
				"Khatib",
				"Land/geomatics surveyor",
				"Land-based engineer",
				"Landscape architect",
				"Landscaping Assistant",
				"Landscaping Worker",
				"Leader",
				"Learning disability nurse",
				"Learning mentor",
				"Lecturer, College",
				"Lecturer, University",
				"Lexicographer",
				"Librarian",
				"Librarian",
				"Library Assistant",
				"Licensed conveyancer",
				"Life coach",
				"Lighting technician ( broadcasting, film, video)",
				"Line Cook",
				"List of jobs",
				"Local Government Councillor",
				"Local government officer",
				"Location manager",
				"Locksmith",
				"Lodging Manager",
				"Logistics and distribution manager",
				"Machine learning engineer",
				"Machinery Operator",
				"Madrasah Teacher",
				"Magazine features editor",
				"Magazine journalist",
				"Magistrate",
				"Magistrate",
				"Mail Carrier",
				"Maintenance Engineer",
				"Makeup Artist",
				"Management Consultant",
				"Management Consultant",
				"Manager",
				"Managing Member",
				"Managing Partner",
				"Manicurist",
				"Manufacturing Assembler",
				"Manufacturing engineer",
				"Manufacturing systems engineer",
				"Marine biologist",
				"Marine scientist",
				"Market Development Manager",
				"Market Researcher",
				"Marketing Communications Manager",
				"Marketing Consultant",
				"Marketing Coordinator",
				"Marketing Director",
				"Marketing executive",
				"Marketing Manager",
				"Marketing Research Analyst",
				"Marketing Specialist",
				"Marketing Staff",
				"Masajid Volunteer",
				"Mason",
				"Massage Therapy",
				"Materials engineer",
				"Mathematician",
				"Maulana (Aalim)",
				"Mayor",
				"Meals on Wheels Driver",
				"Mechanic",
				"Mechanical engineer",
				"Media buyer",
				"Media planner",
				"Media Relations Coordinator",
				"Media researcher",
				"Mediator",
				"Medical Administrator",
				"Medical Assistant",
				"Medical Consultant",
				"Medical Doctor",
				"Medical Doctor, Clinic",
				"Medical Doctor, Hospital",
				"Medical Doctor, Provate Hospoital",
				"Medical illustrator",
				"Medical Laboratory Tech",
				"Medical Laboratory Tech",
				"Medical Researcher",
				"Medical sales representative",
				"Medical science liaison",
				"Medical Transcriptionist",
				"Medicinal chemist",
				"Meeting Planner",
				"Mental Health Counselor",
				"Mental health nurse",
				"Mentor",
				"Merchandising Associate",
				"Merchant Navy officer",
				"Metallurgist",
				"Meteorologist",
				"Microbiologist",
				"Midwife",
				"Minerals surveyor",
				"Mining Engineer",
				"Minister",
				"Molecular Scientist",
				"Mortgage adviser",
				"Mortgage Loan Processor",
				"Mosque Volunteer",
				"Motion Picture Director",
				"Mover",
				"Mudlogger",
				"Multimedia programmer",
				"Multimedia specialist",
				"Museum & gallery curator",
				"Museum & gallery exhibitions officer",
				"Museum education officer",
				"Music Producer",
				"Music therapist",
				"Musician",
				"Nail Technician",
				"Nanotechnologist",
				"Nature conservation officer",
				"Naturopath",
				"Naval architect",
				"Network Administrator",
				"Network engineer",
				"Neurologist",
				"Neuroscientist",
				"Newspaper journalist",
				"NGO Fundraiser",
				"NGO Manager",
				"NGO Worker",
				"Novelist/Writer",
				"Nuclear engineer",
				"Nuclear Engineer",
				"Nurse",
				"Nurse",
				"Nurse Practitioner",
				"Nursing Assistant",
				"Nutritional therapist",
				"Nutritionist",
				"Occupational hygienist",
				"Occupational psychologist",
				"Occupational therapist",
				"Oceanographer",
				"Office Assistant",
				"Office Clerk",
				"Office manager",
				"Office Volunteer",
				"Officer",
				"Online ESL Instructor",
				"Operational investment banker",
				"Operational researcher",
				"Operations Analyst",
				"Operations Assistant",
				"Operations Coordinator",
				"Operations Director",
				"Operations Manager",
				"Operations Professional",
				"Ophthalmologist",
				"Optician",
				"Options Analyst",
				"Optometrist",
				"Orderly",
				"Organizer",
				"Orthoptist",
				"Osteopath",
				"Other",
				"Outdoor activities manager",
				"Outside Sales Manager",
				"Over the Phone Interpreter",
				"Overseer",
				"Owner",
				"Painter",
				"Paralegal",
				"Paramedic",
				"Parking Attendant",
				"Passenger transport manager",
				"Patent attorney",
				"Patent examiner",
				"Pathologist",
				"Payroll Clerk",
				"Payroll Manager",
				"Penetration tester",
				"Pension scheme manager",
				"Pensions consultant",
				"Pensions Manager",
				"Personal Assistant",
				"Personal Trainer",
				"Petroleum engineer",
				"Pharmacist",
				"Pharmacologist",
				"Pharmacy Assistant",
				"Phlebotomist",
				"Phone Sales Specialist",
				"Phone Survey Conductor",
				"Photographer",
				"Physical Therapist",
				"Physical Therapy Assistant",
				"Physician associate",
				"Physicist",
				"Physiotherapist",
				"Physiotherapist",
				"Pipefitter",
				"Planning and development surveyor",
				"Plant breeder/geneticist",
				"Plant Engineer",
				"Plasterer",
				"Play therapist",
				"Playwright",
				"Plumber",
				"Podiatrist",
				"Police officer",
				"Political risk analyst",
				"Political Scientist",
				"Politician",
				"Politician's assistant",
				"Porter",
				"PPC specialist",
				"Preschool Teacher",
				"Presenter",
				"President",
				"President of Sales",
				"Press photographer",
				"Press sub-editor",
				"Primary school teacher",
				"Principal",
				"Print production planner",
				"Printmaker",
				"Prison officer",
				"Private music teacher",
				"Private tutor",
				"Probation officer",
				"Process development scientist",
				"Product designer",
				"Product manager",
				"Production designer",
				"Production Engineer",
				"Production manager",
				"Professor",
				"Program Administrator",
				"Program Manager",
				"Proofreader",
				"Property Investor",
				"Proposal Writer",
				"Proprietor",
				"Prosthetist & orthoptist",
				"Psychiatrist",
				"Psychological wellbeing practitioner",
				"Psychotherapist",
				"Public affairs consultant",
				"Public house manager",
				"Public librarian",
				"Public Relations",
				"Public relations account executive",
				"Public relations officer",
				"Public Relations Specialist",
				"Publishing copy-editor",
				"Publishing rights manager",
				"Purchasing manager",
				"Purchasing Staff",
				"Quality Control Coordinator",
				"Quality Controller",
				"Quality Engineer",
				"Quantity surveyor",
				"Quarry manager",
				"Raakhi (religious)",
				"Radiation protection practitioner",
				"Radio broadcast assistant",
				"Radio producer",
				"Real Estate Assistant",
				"Real Estate Broker",
				"Real Estate Investor",
				"Real Estate Manager",
				"Receptionist",
				"Records manager",
				"Recruiter",
				"Recruitment consultant",
				"Recyclables Collector",
				"Recycling officer",
				"Red Cross Volunteer",
				"Regulatory affairs officer",
				"Reiki Practitioner",
				"Religious Teacher",
				"Remote Online Service Assistant",
				"Remote Online Service Specialist",
				"Research Assistant",
				"Research scientist (life sciences)",
				"Research scientist (maths)",
				"Research scientist (medical)",
				"Research scientist (physical sciences)",
				"Researcher",
				"Reservationist",
				"Restaurant Chain Executive",
				"Restaurant Manager",
				"Retail banker",
				"Retail buyer",
				"Retail manager",
				"Retail merchandiser",
				"Retail Worker",
				"Risk manager",
				"Roofer",
				"Rural practice surveyor",
				"Safety Engineer",
				"Sales Analyst",
				"Sales Associate",
				"Sales Engineer",
				"Sales executive",
				"Sales Manager",
				"Sales promotion account executive",
				"Sales Representative",
				"Salon Manager",
				"School Bus Driver",
				"School Counsellor",
				"School Volunteer",
				"Science writer",
				"Scientific laboratory technician",
				"Screenwriter",
				"Scrum Master",
				"Secondary school teacher",
				"Secretary",
				"Security Guard",
				"Senior tax professional",
				"Senior Teacher",
				"Senior Teacher and Leader",
				"SEO Manager",
				"SEO specialist",
				"Server",
				"Service Dog Trainer",
				"Shareholder",
				"Sheet Metal Worker",
				"Shelf Stocker",
				"Shipping and Receiving Staff",
				"Shop Assistant",
				"Site engineer",
				"Skin Care Specialist",
				"Social Media Assistant",
				"Social Media Influencer",
				"Social media manager",
				"Social Media Specialist",
				"Social researcher",
				"Social worker",
				"Sociologist",
				"Software engineer",
				"Software Ninjaneer",
				"Software tester",
				"Soil scientist",
				"Solar Photovoltaic Installer",
				"Solicitor",
				"Sound engineer",
				"Sound technician",
				"Spa Manager",
				"Special educational needs coordinator ",
				"Special educational needs teacher",
				"Special effects technician",
				"Speech and language therapist",
				"Speech Pathologist",
				"Speechwriter",
				"Sport and exercise psychologist",
				"Sports administrator",
				"Sports coach",
				"Sports development officer",
				"Sports therapist",
				"Sports Volunteer",
				"SQL Developer",
				"Statistician",
				"Stockbroker",
				"Store Manager",
				"Structural engineer",
				"Stylist",
				"Substitute Teacher",
				"Suicide Hotline Volunteer",
				"Superintendent",
				"Supervisor",
				"Supply chain manager",
				"Surgeon",
				"Sustainability consultant",
				"Synagogue Volunteer",
				"Systems analyst",
				"Talent agent",
				"Taper",
				"Tax adviser",
				"Teacher",
				"Teacher, High School",
				"Teacher, Primary School",
				"Teacher, Secondary School",
				"Teaching assistant",
				"Teaching laboratory technician",
				"Team Leader",
				"Technical author",
				"Technical brewer",
				"Technical sales engineer",
				"Technical Specialist",
				"Technical Support Specialist",
				"Technical Writer",
				"Telecommunications researcher",
				"Telemarketer",
				"Telephone Operator",
				"Television camera operator",
				"Television floor manager",
				"Television production coordinator",
				"Television, film, video producer",
				"Telework Nurse/Doctor",
				"Temple Volunteer",
				"Test Scorer",
				"Textile designer",
				"Theatre director",
				"Theatre manager",
				"Theatre stage manager",
				"Theatre, television, film worker",
				"Theme park manager",
				"Therapeutic radiographer",
				"Therapist",
				"Third Sector Manager",
				"Title Analyst",
				"Title Researcher",
				"Tour manager",
				"Tourism officer",
				"Tourist information centre manager",
				"Tow Truck Operator",
				"Town planner",
				"Toxicologist",
				"Trade mark attorney",
				"Trade Union Official",
				"Trade union research officer",
				"Trade Union Worker",
				"Trader",
				"Trading standards officer",
				"Training and development officer",
				"Translator",
				"Transport planner",
				"Travel agency manager",
				"Travel Agent",
				"Travel Nurse",
				"Travel Writer",
				"Treasurer",
				"Truck Driver",
				"Tutor/Online Tutor",
				"Uber Driver",
				"UI Specialist",
				"UPS Driver",
				"Urban designer",
				"UX designer",
				"UX Designer & UI Developer",
				"UX researcher",
				"UX Specialist",
				"Valet",
				"Vehicle or Equipment Cleaner",
				"Veterinary Assistant",
				"Veterinary nurse",
				"Veterinary surgeon",
				"VFX artist",
				"Vice President of Marketing",
				"Vice President of Operations",
				"Vice-president",
				"Video Editor",
				"Video Game Writer",
				"Video or Film Producer",
				"Virtual Assistant",
				"Visual Merchandiser",
				"Voluntary Sector Manager",
				"Volunteer Coordinator",
				"VP of Miscellaneous Stuff",
				"Wait Staff Manager",
				"Waiter/Waitress",
				"Warehouse manager",
				"Warehouse Worker",
				"Waste management officer",
				"Water engineer",
				"Water quality scientist",
				"Web content manager",
				"Web Designer",
				"Web Developer",
				"Wedding Coordinator",
				"Welder",
				"Welding Specialist",
				"Well Driller",
				"Wellsite geologist",
				"Women’s Shelter Worker ",
				"Writer",
				"Yoga Instructor",
				"Youth Volunteer",
				"Youth worker",
				"Youtuber",
				"Zookeeper",
				"Zoologist",
			],
			loadingButton: false,
		};
	},
	created() {
		this.$store.state.candidateInfo.activePanel = 1;
	},
	mounted() {
		console.log("family info mounted");
		console.log(this.$store.state);
		let payload = {
			userId: this.$store.state.user.user.id,
			token: this.$store.state.auth.token,
		};
		console.log(payload);
		try {
			this.$store.dispatch("getFamilyInfo", payload);
		} catch (e) {
			console.log(e);
		}
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
		async saveFamilyInfo() {
			this.loadingButton = true;
			let _payload = {
				uid: this.$store.state.user.user.id,
				father_name: "x",
				father_profession:
					this.$store.state.candidateInfo.familyinformation.fathersProfession,
				mother_name: "x",
				mother_profession:
					this.$store.state.candidateInfo.familyinformation.mothersProfession,
				siblings_desc:
					this.$store.state.candidateInfo.familyinformation.siblings,
				country_of_origin:
					this.$store.state.candidateInfo.familyinformation.countryOfOrigin,
				family_info:
					this.$store.state.candidateInfo.familyinformation.otherFamilyInfo,
				is_publish: 1,
			};
			if (
				_payload.father_profession == "" ||
				_payload.father_profession == null
			) {
				this.showError("Father's profession can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.mother_profession == "" ||
				_payload.mother_profession == null
			) {
				this.showError("Mother's profession can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.siblings_desc == "" || _payload.siblings_desc == null) {
				this.showError("Sibling description can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (_payload.family_info == "" || _payload.family_info == null) {
				this.showError("Family info can't be empty!");
				this.loadingButton = false;
				return;
			}
			if (
				_payload.country_of_origin == "" ||
				_payload.country_of_origin == null
			) {
				this.showError("Country of origin can't be empty!");
				this.loadingButton = false;
				return;
			}
			this.$store
				.dispatch("updateFamilyInfo", _payload)
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

			// try {
			// 	await this.$store.dispatch("updateFamilyInfo", _payload);

			// 	this.openNotification();
			// 	this.$store.state.candidateInfo.activePanel++;
			// } catch (error) {
			// 	this.$store.state.candidateInfo.successMessageTitle = "Failed!";
			// 	this.$store.state.candidateInfo.successMessage =
			// 		"Error: " + error.message;
			// }
		},
		async handleSubmit() {
			console.log("submit called");
			// Validate form
			let validInput = true;

			if (
				this.$store.state.candidateInfo.familyinformation.fathersName === ""
			) {
				validInput = false;
				alert("Fathers Name can not be empty");
			}
			if (
				this.$store.state.candidateInfo.familyinformation.mothersName === ""
			) {
				validInput = false;
				alert("Mothers Name can not be empty");
			}
			if (
				this.$store.state.candidateInfo.familyinformation.fathersProfession ===
				""
			) {
				validInput = false;
				alert("Fathers Profession can not be empty");
			}
			if (
				this.$store.state.candidateInfo.familyinformation.mothersProfession ===
				""
			) {
				validInput = false;
				alert("Mothers Profession can not be empty");
			}
			if (this.$store.state.candidateInfo.familyinformation.siblings === "") {
				validInput = false;
				alert("Siblings info can not be empty");
			}
			if (
				this.$store.state.candidateInfo.familyinformation.countryOfOrigin === ""
			) {
				validInput = false;
				alert("Country of origin can not be empty");
			}
			// console.log(validInput);

			if (validInput) {
				console.log("state", this.$store.state.candidateInfo.familyinformation);
				// Prepare payload
				let data = {
					uid: this.$store.state.user.user.id,
					father_name:
						this.$store.state.candidateInfo.familyinformation.fathersName,
					father_profession:
						this.$store.state.candidateInfo.familyinformation.fathersProfession,
					mother_name:
						this.$store.state.candidateInfo.familyinformation.mothersName,
					mother_profession:
						this.$store.state.candidateInfo.familyinformation.mothersProfession,
					siblings_desc:
						this.$store.state.candidateInfo.familyinformation.siblings,
					country_of_origin:
						this.$store.state.candidateInfo.familyinformation.countryOfOrigin,
					family_info:
						this.$store.state.candidateInfo.familyinformation.otherFamilyInfo,
					is_publish: 1,
				};

				let payload = {
					token: this.$store.state.auth.token,
					data: data,
				};

				await this.$store.dispatch("updateFamilyInfo", payload);
				console.log(
					this.$store.state.candidateInfo.familyinformation.updateApiStatus
				);
				if (this.$store.state.candidateInfo.familyinformation.updateApiStatus) {
					return true;
				} else {
					return false;
				}
			}
			// return true;
		},
	},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.family-info {
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
	
    
}
</style>