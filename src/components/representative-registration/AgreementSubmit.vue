<template>
	<div class="agreement">
		<div class="text">
			<p>
				To keep your account safe, we need to verify your identiy. This is a
				legal requirement that helps us to keep your account secure
			</p>
			<p>
				We accept photos/scans of a driving license, passport, national ID card
				or residence permit issued in European Economic Are(EEA).
			</p>
			<p>Follow these tips to make sure your documents are accepted.</p>
		</div>
    <div class="flex align-baseline confirm">
      <a-checkbox v-model="agreementChecked" @change="onChange" class="mt-3"></a-checkbox>
      <span class="fs-16 ml-2">I have consent for the candidate to represent</span>
    </div>

<!--		<div class="confirm mt-3">-->
<!--			<a-checkbox v-model="agreementChecked" @change="onChange">-->
<!--				<span class="fs-16"-->
<!--					>I have consent for the candidate to represent-->
<!--				</span>-->
<!--			</a-checkbox>-->
<!--		</div>-->
	</div>
</template>

<script>
export default {
	props: ["repData"],
	data() {
		return {
			agreementChecked: false,
		};
	},
	mounted() {
		if (this.repData) {
			this.agreementChecked = this.repData.is_agree;
			this.$emit("checked", this.agreementChecked);
		}
	},
	methods: {
		onChange(e) {
			console.log(e);
			this.agreementChecked = e.target.checked;
			this.$emit("checked", e.target.checked);
			// console.log(`checked = ${e.target.checked}`);
		},
	},
};
</script>

<style scoped lang="scss">
.agreement {
	width: 90%;
	margin: 0px auto;
	.section-heading {
		text-align: center;
		color: rgb(218, 15, 140);
		h4 {
			color: rgb(218, 15, 140);
		}
	}
	.text {
		background-color: #f4f4f9;
		border-radius: 5px;
		padding: 30px;
		p {
			font-size: 16px;
		}
	}
}
.mobile-margin {
  margin-top: 0.5rem;
}
.mobile-center {
  text-align: center;
}
.mobile-switch {
  margin-top: 12px;
}
@media (min-width: 768px) {
  .form-right-content {
    float: right;
    padding-right: 0;
  }
  .mobile-margin {
    margin-top: 0;
  }
  .non-padding-mobile-margin {
    margin-top: 0;
  }
  .mobile-center {
    text-align: left;
  }
  .mobile-switch {
    margin-top: 0;
  }
}
</style>
