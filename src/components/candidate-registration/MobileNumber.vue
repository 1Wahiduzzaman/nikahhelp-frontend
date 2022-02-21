<template>
	<div class="row pt-3 pb-2 border-bottom">
	  <div class="col-12 col-md-6 none-padding">
	    <div class="mb-2 font-weight-bold">
	      <a-icon
	        v-if="hasNumber"
	        class="color-success mr-2 fs-18 fw-500"
	        type="check"
	      />What is your mobile number?
	    </div>
	  </div>
	  <div class="col-12 col-md-6 mobile-margin">
	      <vue-tel-input 
	                    v-model="contact"
						class="col-12 rounded-pill"
						@input="validPhone"
						mode="international"
						:invalidMsg="invalidMessage"
	      />
		  <div v-if="contact" class="bg-danger">
			  {{invalidMessage}}
		  </div>
	  </div>
	  <div class="col-12 none-padding mobile-margin mobile-help">
	    <p>
	      <a
	        class="color-blue fw-700 fs-14"
	        data-toggle="collapse"
	        href="#collapsepersonalInfoContactNumber"
	        role="button"
	        aria-expanded="false"
	        aria-controls="collapseExample"
	      >
	        <span
	          v-if="!showHelp"
	          @click="showHelp = true"
	        >
	          Need Help?
	        </span>
	        <span v-else @click="showHelp = false">
	          Hide Help?
	        </span>
	      </a>
	    </p>
	    <div
	      class="collapse"
	      data-parent="#personalInfoAccordian"
	      id="collapsepersonalInfoContactNumber"
	    >
	      <div class="card card-body bubble">
	        Provide mobile number with country code
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>
	export default {
		name: 'mobileNumber',
		
		props: {
			hasNumber: {
				type: Boolean
			}
		},
		
		computed: {
			invalidMessage() {
				return this.valid ?  '' : 'not valid';
			}
		},
		
		data() {
			return {
				contact: '',
				showHelp: false,
				valid: false,
			}
		},
		
		watch: {
			contact() {
				if (this.valid) {
					this.$emit('input', this.contact);
				}
			}
		},
		
		methods: {
			validPhone(_, phoneNumber) {
				console.log(phoneNumber);
				this.valid = phoneNumber.valid;
			}
		}
	}
</script>

<style>
</style>
