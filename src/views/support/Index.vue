<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="row mobile-version">
        <div class="col-12 col-lg-8">
          <div class="card p-4 br-10 card-faq">
            <div class="h1-flex justify-content-between w-full">
              <h4 class="fs-24">Support</h4>
              <div class="flex justify-content-end">
                <v-btn type="primary" color="indigo" class="text-white" rounded>Rating</v-btn>
                <v-btn type="primary" color="error" class="ml-2" rounded>Feedback</v-btn>
              </div>
            </div>
            <div class="none-mobile mt-2">
              <a-select
                  placeholder="Select help category"
                  class="ml-1 fs-14 w-25"
              >
                <a-select-option value=""> Select help category </a-select-option>
              </a-select>
              <a-input
                  size="medium"
                  type="text"
                  class="w-25 search-ml"
                  placeholder="Search FAQs"
                  autocomplete="off"
              />
            </div>

            <div class="mt-5">
              <a-collapse default-active-key="1" :bordered="false">
                <template #expandIcon="props">
                  <a-icon type="caret-right" class="color-primary" :rotate="props.isActive ? 90 : 0" />
                </template>
                <a-collapse-panel key="1" class="faq" header="This is panel header 1" :style="customStyle">
                  <p class="pl-5">{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel key="2" class="faq" header="This is panel header 2" :style="customStyle">
                  <p class="pl-5">{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel key="3" class="faq" header="This is panel header 3" :style="customStyle">
                  <p class="pl-5">{{ text }}</p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card br-10">
            <div class="flex justify-content-between py-1 px-1">
              <v-btn color="error" class="text-white w-50 br-10">Start a chat</v-btn>
              <v-btn text class="w-50 br-10 text-danger">Submit a ticket</v-btn>
            </div>
            <div class="chat-area px-4">
              <div class="position-relative">
                <div class="chat-messages py-4 pr-1" id="chat-messages">
                  <div class="position-relative">
                    <div
                        class="chat-message-right pb-4 position-relative">
                      <div class="text-right">
                        <img src="../../assets/info-img.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                      </div>
                      <div class="flex-shrink-1 py-2 px-3 mr-3 bg-me text-white br-10 white-space-pre">
                        hello
                      </div>
                      <div class="text-muted small text-nowrap mt-2 position-absolute msg-right-created-at">2021-12-31</div>
                    </div>

                    <div
                        class="chat-message-left pb-4 position-relative">
                      <div class="text-left">
                        <img src="../../assets/info-img.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                      </div>
                      <div class="flex-shrink-1 bg-light py-2 px-3 ml-3 br-10 white-space-pre">
                        Hello
                      </div>
                      <div class="text-muted small text-nowrap mt-2 position-absolute msg-left-created-at">2021-12-31</div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="footer">
<!--                <div class="footer-top"><strong>{{ chatheadopen.typer_name }}</strong> {{ chatheadopen.typing_text }}</div>-->
                <div class="footer-bottom px-4">
                  <form action="#">
                    <div class="left flex justify-content-end align-items-end">
                      <div class="message-box">
                        <textarea name="message" id="" cols="30" rows="4" placeholder="Enter message..."></textarea>
                        <div class="position-absolute msgbox-right">
                          <div class="flex flex-column justify-content-center align-items-center h-full">
                            <a-tooltip>
                              <template slot="title">
                                Coming soon
                              </template>
                              <button class="btn-emoji" title="Coming soon">&#128528;</button>
                            </a-tooltip>
                            <a-tooltip>
                              <template slot="title">
                                Coming soon
                              </template>
                              <button><img src="../../assets/icon/microphone.png" alt="icon" class="microphone" /></button>
                            </a-tooltip>
                            <a-tooltip>
                              <template slot="title">
                                Coming soon
                              </template>
                              <button><a-icon type="file-image" class="color-primary" /></button>
                            </a-tooltip>
                          </div>
                        </div>
                      </div>
                      <!-- <button :disabled="returnMsgSendBtnDeactiveStatus" class="btn btn-primary btn-submit js-msg-send">  -->
                      <button class="btn btn-primary btn-submit js-msg-send">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.68 18.77">
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="middle" fill="white">
                              <polygon class="cls-1" points="8.6 12.29 7.06 13.34 6.86 11.05 8.6 12.29"/>
                              <polygon class="cls-1" points="0 6.23 25.68 0 17.75 18.77 0 6.23"/>
                              <polygon class="cls-2" points="6.86 11.05 24.95 0.57 8.6 12.29 6.86 11.05"/>
                            </g>
                          </g>
                        </svg>
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      customStyle:
          'border: none; background: #ffffff',
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.br-10 {
  border-radius: 10px;
}
.card {
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 1px rgb(63 6 17 / 30%);
  height: calc(100vh - 98px);
  overflow-y: auto;
}
.chat-area {
  //min-height: 600px;
  min-height: calc(100vh - 148px);
  @media (min-width: 410px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 576px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 768px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 992px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 1200px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 1920px) {
    min-height: calc(100vh - 148px);
  }
}
.chat-messages {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  //max-height: 540px;
  max-height: calc(100vh - 230px);
  @media (min-width: 410px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 576px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 768px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 992px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 1200px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 1920px) {
    max-height: calc(100vh - 240px);
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .footer-top {
    font-size: 12px;
    color: #818181;
    margin-bottom: 12px;
  }

  .footer-bottom {
    .left {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .message-box {
        position: relative;
        width: 100%;

        input {
          height: 36px;
          width: 100%;
          border: 0;
          padding: 7px 54px 7px 40px;
          border-radius: 18px;
          background-color: #eceaf5;
          resize: none;
          //v-on:keyup.enter="sendMsg($event)"
          @media (max-width: 767px) {
            padding-left: 32px;
          }
        }

        textarea {
          width: 100%;
          border: 0;
          padding: 7px 24px 7px 7px;
          border-radius: 10px;
          background-color: #eceaf5;
          resize: none;
          max-height: 70px;
          overflow-y: hidden;
          @media (max-width: 767px) {
            padding-left: 32px;
          }
        }

        .btn-multimedia, .btn-files {
          position: absolute;
          top: -3px;
          right: 16px;
          margin-left: 10px;
          @media (max-width: 767px) {
            right: 6px;
          }
        }

        .btn-emoji {
          right: auto;
          left: -8px;
          top: 3px;
        }

        .btn-multimedia {
          right: 45px;
          @media (max-width: 767px) {
            right: 30px;
          }
        }

        svg {
          .cls-1 {
            fill: #fff;
          }

          .cls-2 {
            fill: #8983be;
          }

          .files {
            fill: #6159a8;
          }

          .multimedia {
            fill: #6159a8;
          }
        }
      }

      button {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        height: 36px;
        line-height: 28px;
        @media (max-width: 767px) {
          min-width: auto;
        }

        svg {
          width: 18px;
          float: left;
          margin-top: 9px;
          margin-left: 6px;

          .cls-1 {
            fill: #fff;
          }

          .cls-2 {
            fill: #8983be;
          }

          @media (max-width: 767px) {
            display: none;
          }
        }
      }
    }
  }
}
.microphone {
  width: 15px;
  height: 15px;
}
.msgbox-right {
  top: 0;
  right: 4px;
  height: 66px;
}
.chat-message-left,
.chat-message-right {
  display: flex;
  flex-shrink: 0
}

.chat-message-left {
  margin-right: auto
}

.chat-message-right {
  flex-direction: row-reverse;
  margin-left: auto
}
.msg-right-created-at {
  bottom: -4px;
  right: 6px;
}
.msg-left-created-at {
  bottom: -4px;
  left: 6px;
}
.flex-grow-0 {
  flex-grow: 0!important;
}
.border-top {
  border-top: 1px solid #dee2e6!important;
}
.bg-me {
  background-color: #3f9de7;
}
.w-25 {
  width: 100% !important;
  @media (min-width: 768px) {
    width: 25% !important;
  }
}
.search-ml {
  @media (min-width: 768px) {
    margin-left: 8px;
  }
}
.h1-flex {
  display: block;
  @media (min-width: 768px) {
    display: flex;
  }
}
.none-mobile {
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
}
.mobile-version {
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>