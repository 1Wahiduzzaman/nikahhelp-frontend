<template>
  <div>
    <div>
      <div class="container-fluid mt-5 section-padding-payment">
        <div class="d-flex flex-mb-direction">
          <div class="w-d-50 bg-1 col-flex position-relative shadow-default"
               :class="{'mobile-block': activeStep !== 1, 'custom-height': cardStat}">
            <div class="div-1">
              <div class="section-heading">
                <h4 class="heading-title-payment">Team Subscription & Payment</h4>
                <p class="text-center heading-desc-payment">
                  We don't want people to be looking for someone for too
                  long. <br/>
                  The sooner you find someone suitable we feel we have
                  achieved both your and our goal
                </p>
              </div>
              <div class="card-info-div mt-4">
                <h6 class="text-center validate-text">Validate Your Card</h6>
                <div class="card-info-form">
                  <card-input
                      ref="card_input"
                      :clientSecret="clientSecret"
                      @get-payment-method="setPaymentMethod"
                  ></card-input>
                </div>
              </div>
              <button class="btn btn-block next-payemnt-screen btn-success py-2 br-30 only-mobile" v-if="agree" @click="cartScreen()">Next </button>
              <button class="btn btn-danger next-payemnt-screen btn-block py-2 br-30 only-mobile mt-3" v-if="agree" @click="paymentScreen()">Back </button>
            </div>
          </div>
          <div class="w-d-50 desktop-non-margin col-flex shadow-default border-right position-relative"
               :class="{'mobile-block': activeStep !== 2, 'mobile-mode': activeStep === 2}">
            <div class="div-2 desktop-pl">
              <div class="section-heading"
                   v-if="subscriptionName == 'Free 1 day Subscription Plan'"
              >
                <h6 class="title-signup">It's free to Signup!</h6>
                <hr/>
              </div>
              <div class="description fs-14"
                   v-if="subscriptionName == 'Free 1 day Subscription Plan'"
              >
                Why do we need a credit card for a free 1 day plan?
                <br/>
                It helps us prevent spammers from signing up, which means
                better deliverablity for you and everyone else. You won't be
                charged unless you choose to take up a monthly plan.
                <br/>
                <h6 class="mt-4">This is a secure 256-bit SSL encrypted from. You're safe. </h6>
              </div>

              <div class="cart mt-3 px-4">
                <div class="cart-heading">
                  <h5 class="fs-18">Item in Cart</h5>
                  <hr/>
                </div>
                <div class="cart-description">
                  <div class="d-flex justify-content-between fs-18">
                    <h6 class="text-white">{{ subscriptionName }}</h6>
                    <h6 class="text-white">£ {{ subscriptionAmount }}</h6>
                  </div>
                  <!--
                  <p>
                    Discount 0%
                    <span style="float: right">£ 0.0</span>
                  </p>  -->
                  <hr/>
                  <p class="fs-18">
												<span style="float: right">
													Total Pay
													<span class="ml-5">£ {{ subscriptionAmount }} </span>
												</span>
                  </p>
                  <br/>
                  <br/>
                  <p class="details fs-18">Details:</p>
                  <br/>
                  <div class="d-flex justify-content-between fs-18">
                    <h6 class="text-white">{{ subscriptionName }} Team -<b> {{ teamName }}</b></h6>
                    <h6 class="text-white"></h6>
                  </div>
                </div>
              </div>
              <div class="agree-terms mt-4">
                <p class="mt-1 agreement-text">
                  By clicking "Agree and Subscribe", you agree:
                  <b
                  >You will be charged UK £0.00 daily and at the end of
                    your plan, your subscription will automatically renew
                    monthly until cancel(price subject to change). Cancel
                    anytime via Manage team > Team Setting > Subscription
                    details or Customer Support.
                  </b>
                  You also agree to the Terms of Use and the Subscription
                  and Cancellation Terms.
                </p>
                <div class="text-center pb-4">
<!--                  <spinner v-if="isLoading"></spinner>-->
                  <button
                      v-if="agree"
                      class="btn bg-success text-white agree-button br-30 btn-block"
                      @click="subscribe"
                  >
                    <a-icon type="loading" class="fs-24" v-if="isLoading" /> Agree and Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div class="position-absolute buttons-position">
              <div class="d-flex">
                <button class="btn bg-danger px-4 py-2 text-white br-20 w-full" @click="nextStep(1)">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import CardInput from "@/components/subscription/CardInput.vue";
import Spinner from "@/components/ui/Spinner.vue";

export default {
  name: "SubscriptionPayment",
  components: {
    Header,
    Sidebar,
    Footer,
    CardInput,
    Spinner,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      subscriptionId: null,
      subscriptionName: null,
      subscriptionAmount: null,
      clientSecret: null,
      teamName: null,
      teamId: null,
      agree: false,
      activeStep: 1,
      cardStat: false
    };
  },
  created() {

    this.getSubscriptionId();
    this.getClientSecret();
    this.$store.dispatch("getCountries");
  },

  methods: {
    nextStep(step) {
      this.activeStep = step;
      if(this.activeStep == 1) {
        this.cardStat = false;
        this.agree = false;
        this.$refs.card_input.setValidationFalse();
      }
    },
    setPaymentMethod(paymentMethod) {
      this.agree = true;
      this.cardStat = paymentMethod;
      let myDeviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      if(myDeviceWidth >= 768) {
        this.activeStep = 2;
      }
    },
    cartScreen() {
      this.activeStep = 2;
    },
    paymentScreen() {
      this.activeStep = 1;
      this.agree = false;
      this.cardStat = false;
      this.$refs.card_input.setValidationFalse();
    },
    async subscribe() {
      console.log(this.$store.state.user.payment_method);
      const _payload = {
        stripeToken: this.$store.state.user.payment_method,
        team_id: this.teamId,
        auto_renewal: 1,
        plane: this.subscriptionId,
      };
      console.log(_payload);

      if(!this.$route.query.cupon || (this.$route.query.cupon && this.$route.query.cupon === '123456')) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("createSubscription", _payload); // Action in the User module in store
          this.isLoading = false;
          this.$router.push(
              `/subscription/complete/success/${this.subscriptionName}/${this.teamName}`
          );
        } catch (error) {
          this.$error({
            title: "Subscription Payment Error!",
            content: error.response.data.message,
            centered: true,
          });
          this.isLoading = false;
        }
      } else {
        this.$error({
          title: "You are trying to do something illegal!",
          centered: true,
        });
      }
    },
    getPaymentMethod(data) {
      console.log(data);
    },
    async getClientSecret() {
      await this.$store.dispatch("getClientSecret");
      this.clientSecret = this.$store.getters["clientSecret"];
      console.log(this.clientSecret);
    },

    getSubscriptionId() {
      const team = this.$route.params.team;
      const subId = this.$route.params.subId;
      const teamId = this.$route.params.id;
      this.teamId = teamId;
      this.teamName = team;
      this.subscriptionId = parseInt(subId);
      if (this.subscriptionId == 1) {
        this.subscriptionName = "1 Month Subscription Plan";
        this.subscriptionAmount = 10.0;
      } else if (this.subscriptionId == 2) {
        this.subscriptionName = "3 Month Subscription Plan";
        this.subscriptionAmount = 24.0;
      } else if (this.subscriptionId == 3) {
        this.subscriptionName = "6 Month Subscription Plan";
        this.subscriptionAmount = 42.0;
      } else if (this.subscriptionId == 0) {
        this.subscriptionName = "Free 1 day Subscription Plan";
        this.subscriptionAmount = 0.0;
      }
      console.log(this.subscriptionName);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.bg-1 {
  background-image: linear-gradient(
          to right top,
          #522e8e,
          #602d8d,
          #6e2b8c,
          #7a2a8a,
          #852888,
          #912787,
          #9d2585,
          #a82483,
          #b72181,
          #c51f7e,
          #d31f7b,
          #e02076
  );
}

.bg-2 {
  background: $bg-white;
}

.col-flex {
  flex: 1;
}

.div-1 {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 20px;

  .section-heading {
    h4 {
      color: white;
      text-align: center;
      font-weight: 800;
    }

    p {
      text-align: justify;
      color: white;
    }
  }

  .card-info-div {
    border-radius: 5px;
    height: 77%;
    @media (min-width: 768px) {
      padding: 15px;
      background-color: white;
    }

    .card-info-form {
      height: 93%;
      border-radius: 5px;
      @media (min-width: 768px) {
        padding: 10px;
        background-image: linear-gradient(
                to right top,
                #522e8e,
                #602d8d,
                #6e2b8c,
                #7a2a8a,
                #852888,
                #912787,
                #9d2585,
                #a82483,
                #b72181,
                #c51f7e,
                #d31f7b,
                #e02076
        );
      }
    }

    .form-group {
      line-height: 0.5;

      label {
        color: white;
      }

      input {
        padding: 5px;
      }

      input[type="text"]:focus {
        border-radius: 5px;
      }
    }
  }
}

.div-2 {
  padding: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  .section-heading {
    h6 {
      font-weight: 400;
    }

    hr {
      background-color: #222;
    }
  }

  .description {
    font-size: 12px;
    line-height: 1.1;
    margin-right: 20px;
    text-align: justify;
  }

  .cart {
    margin-right: 20px;
    background-image: linear-gradient(
            to right top,
            #522e8e,
            #602d8d,
            #6e2b8c,
            #7a2a8a,
            #852888,
            #912787,
            #9d2585,
            #a82483,
            #b72181,
            #c51f7e,
            #d31f7b,
            #e02076
    );
    border-radius: 5px;
    padding: 10px;

    .cart-heading {
      line-height: 0.2;

      h5 {
        font-size: 30px;
        color: white;
        font-weight: 500;
      }

      hr {
        background-color: white;
      }
    }

    .cart-description {
      padding-top: 16px;
      line-height: 0.5;
      color: white;

      p {
        font-size: 14px;
      }

      hr {
        background-color: white;
      }
    }

    .agree-terms {
      p {
        font-size: 12px;
      }
    }
  }

  .agree-terms {
    margin-top: 10px;
    margin-right: 20px;
    text-align: justify;

    p {
      line-height: 1.1;
      //font-size: 12px;
    }
  }
}

.p-nmt {
  margin-top: -12px;
}

.br-30 {
  border-radius: 30px;
}

.agree-button {
  border: 2px solid $color-white;
  outline-style: solid;
  outline-color: #cfcece;
  font-size: 16px;
  margin-top: 46px;
}

.border-right {
  border-right: 20px solid $border-primary !important;
}

.w-d-50 {
  width: 100%;
}

.flex-mb-direction {
  flex-direction: column;
}

.agreement-text {
  font-size: 14px;
}

.main-content-wrapper {
  .main-content {
    width: 80%;
    margin: 15px;

    .custom-card {
      height: 570px;
      border-radius: 5px;

      .row {
        height: 100%;

        .div-1 {
          background-image: linear-gradient(
                  to right top,
                  #522e8e,
                  #602d8d,
                  #6e2b8c,
                  #7a2a8a,
                  #852888,
                  #912787,
                  #9d2585,
                  #a82483,
                  #b72181,
                  #c51f7e,
                  #d31f7b,
                  #e02076
          );
          height: 100%;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding: 20px;

          .section-heading {
            h4 {
              color: white;
              text-align: center;
              font-weight: 800;
            }

            p {
              text-align: justify;
              font-size: 14px;
              color: white;
            }
          }

          .card-info-div {
            padding: 15px;
            background-color: white;
            border-radius: 5px;
            height: 77%;

            .card-info-form {
              padding: 10px;
              background-image: linear-gradient(
                      to right top,
                      #522e8e,
                      #602d8d,
                      #6e2b8c,
                      #7a2a8a,
                      #852888,
                      #912787,
                      #9d2585,
                      #a82483,
                      #b72181,
                      #c51f7e,
                      #d31f7b,
                      #e02076
              );
              height: 93%;
              border-radius: 5px;
            }

            .form-group {
              line-height: 0.5;

              label {
                color: white;
              }

              input {
                padding: 5px;
              }

              input[type="text"]:focus {
                border-radius: 5px;
              }
            }
          }
        }

        .div-2 {
          padding: 5px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;

          .section-heading {
            width: 35%;

            h6 {
              font-weight: 400;
            }

            hr {
              background-color: #222;
            }
          }

          .description {
            font-size: 12px;
            line-height: 1.1;
            margin-right: 20px;
            text-align: justify;
          }

          .cart {
            height: 50%;
            margin-right: 20px;
            background-image: linear-gradient(
                    to right top,
                    #522e8e,
                    #602d8d,
                    #6e2b8c,
                    #7a2a8a,
                    #852888,
                    #912787,
                    #9d2585,
                    #a82483,
                    #b72181,
                    #c51f7e,
                    #d31f7b,
                    #e02076
            );
            border-radius: 5px;
            padding: 10px;

            .cart-heading {
              width: 45%;
              line-height: 0.2;

              h5 {
                font-size: 30px;
                color: white;
                font-weight: 500;
              }

              hr {
                background-color: white;
              }
            }

            .cart-description {
              padding-left: 10px;
              padding-right: 10px;
              padding-top: 30px;
              line-height: 0.5;
              color: white;

              p {
                font-size: 14px;
              }

              hr {
                background-color: white;
              }
            }

            .agree-terms {
              p {
                font-size: 12px;
              }
            }
          }

          .agree-terms {
            margin-top: 10px;
            margin-right: 20px;
            text-align: justify;

            p {
              line-height: 1.1;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

.details {
  margin-top: 30px;
}

.title-signup {
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: -10px;
  font-style: italic;
}

.mobile-block {
  display: none;
}
.mobile-mode {
  margin-top: 40px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
}
.buttons-position {
  top: -44px;
  left: 8px;
  //z-index: 9;
  width: 100%
}

.heading-title-payment {
  font-size: 16px;
}

.heading-desc-payment {
  font-size: 12px;
}

.validate-text {
  color: #f9f9f9;
  padding-bottom: 8px;
}

@media (min-width: 768px) {
  .validate-text {
    color: #000000;
    padding-bottom: 0;
  }
  .desktop-non-margin {
    //margin-left: -1.75rem;
  }
  .desktop-pl {
    padding-left: 1.25rem;
  }
  .agree-button {
    font-size: 22px;
  }
  .w-d-50 {
    width: 50%;
  }
  .flex-mb-direction {
    flex-direction: row;
  }
  .agreement-text {
    font-size: 16px;
  }
  .mobile-block {
    display: block;
  }
  .buttons-position {
    display: none;
  }
  .section-padding-payment {
    padding: 0 1.5rem;
  }
  .heading-title-payment {
    font-size: 30px;
  }
  .heading-desc-payment {
    font-size: 14x;
  }
}
.custom-height {
  @media (min-width: 1200px) {
    height: 638px;
  }
}
.next-payemnt-screen {
  padding: 1px 60px;
  font-size: 16px;
  margin-top: 30px;
  height: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #747373;
  outline-style: solid;
  outline-color: #cfcece;
}
.br-30 {
  border-radius: 30px;
}
.only-mobile {
  @media (min-width: 768px) {
    display: none;
  }
}
</style>
