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
	    <div class="row">
	      <vue-tel-input @input="onValueChange($event, 'contact')"
	                    v-model="contact"
	
	      
	      />
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
	          v-if="arr[11].first"
	          @click="toggle(11)"
	        >
	          Need Help?
	        </span>
	        <span v-else @click="toggle(11)">
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
		methods: {
			toggle(index) {
			     this.arr = this.arr.map((a, ind) => {
			       if (ind === index) {
			         a.first = !a.first;
			       } else {
			         a.first = true;
			       }
			       return a;
			     });
			   },
		}
	}
</script>

<style>
</style>
