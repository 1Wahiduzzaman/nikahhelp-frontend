<template>
  <div class="position-relative">

    <Layout>
      <router-view @openSystemHelpDialog="dialog=true;" />
      <instant-notification />
      
    </Layout>
    <div class="help-dialog">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="700"
        class="d-flex justify-center mb-4 mt-8"
        v-model="dialog"
        activator="parent"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon large  v-bind="attrs" v-on="on" class="question-mark" color="#6159a7">
            mdi-help-circle
          </v-icon>
        </template>
        <template v-slot:default="dialog">
          <v-card class="relative">
            <div class="w-100 flex justify-content-end">
              <v-icon 
                class="m-2"
                @click="dialog.value = false;"
              >
                mdi-close
              </v-icon>
            </div>
            
            <v-card-text class="d-flex flex-column align-center"> <!-- style="min-height:350px" -->
              <div class="d-flex justify-center w-100">

                <v-container class="d-flex justify-center">
                  <v-img
                    max-height="150"
                    max-width="150"
                    :src="imageSrc"
                    position="cover"
                  ></v-img>
                </v-container>
              </div>
              <div class="text-center my-2"><h5>{{ contentTitle }}</h5></div>
              <div class="text-center">{{ contentGuidance }}</div>
            </v-card-text>
            
            <!-- <v-divider light></v-divider> -->
            <div class="w-75 text-center mx-auto"><hr class="divider" style="margin: 14px auto;"></div>

            <v-card-actions class="justify-content-between">
              <div>
                <v-btn
                  :rounded="true"
                  color="#E51F76"
                  class="text-white"
                >
                  Watch tutorial
                </v-btn>
                <v-card-actions></v-card-actions>
              </div>
              
              <div>
                <v-btn
                  v-if="currentGuide > 0 && currentGuide <= 6 "
                  @click="changeContentPrev"
                  :rounded="true"
                  color="#6159a7"
                  class="mr-2 text-white"
                >
                  prev
                </v-btn>
                <v-btn
                  v-if="currentGuide <= 5"
                  @click="changeContent"
                  :rounded="true"
                  color="#6159a7"
                  class="text-white"
                >
                  next
                </v-btn>
  
                <v-btn
                  v-if="currentGuide === 6"
                  @click="goToFirstGuide(); dialog.value=false;"
                  :rounded="true"
                  color="#3ab549"
                  class="text-white"
                >
                  finish
                </v-btn>
                <v-card-actions></v-card-actions>
              </div>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    
  </div>
</template>

<script>
import ApiService from '@/services/api.service';
import InstantNotification from "../notification/InstantNotification";
import { mapActions } from 'vuex';
export default {
  components: {
    InstantNotification,
    Layout: () => import("@/views/design/Layout"),
  },

  created() {
    ApiService.get('/v1/user').then((data) => {
      console.log(data);
      // if (data.data.user.status != 3) {
      //   this.logout();
      // }
      this.$store.commit('setUserInfo', data.data.data.user);

      // update status in localStorage
      let localStorageUser = JSON.parse(localStorage.getItem("user"));
      localStorageUser.status = data.data.data.user.status;
      localStorage.setItem("user", JSON.stringify(localStorageUser));

   }).catch(() => {
    //  this.logout();
   });

  },

 

  methods: {
    ...mapActions([
      'logout'
    ]),

    changeContentPrev() {
      this.currentGuide = this.currentGuide > 0 ? this.currentGuide - 1 : 0;

      if(this.currentGuide == 0) {
        this.imageSrc = require('@/assets/Icons/MA logo for start modal.svg');
        this.contentTitle = 'Welcome to MatrimonyAssist';
        this.contentGuidance = "Here you can create team, invite family and friends, shortlist potential candidates and connect and chat with respective teams."
      } else if(this.currentGuide == 1) {
        this.imageSrc = require('@/assets/help_guide_pics/Join_or_create_a_team.svg');
        this.contentTitle = 'Join or create a team';
        this.contentGuidance = "Having a team is a must requirement in MartimonyAssist. Someone who is already registered with MatrimonyAssist, can send you an invite link to join their team. Alternatively, you can create a team and generate an invite link and then share it to your potential member(s) to join your team.";
      } else if(this.currentGuide == 2) {
          this.imageSrc = require('@/assets/help_guide_pics/Chose_a_subscription_plan.svg');
          this.contentTitle = 'Chose a subscription plan';
          this.contentGuidance = 'In MattrimonyAssist subscription is team based. Anyone can pay for subscription and the rest of the members use it for free.';
      } else if(this.currentGuide == 3) {
          this.imageSrc = require('@/assets/help_guide_pics/Search_for_suitable_prospect.svg');
          this.contentTitle = ' Search for suitable prospect';
          this.contentGuidance = 'Here you search according to your search criteria to find prospect of your choice. ';
      } else if (this.currentGuide == 4) {
          this.imageSrc = require('@/assets/help_guide_pics/Shortlist_and_connect_with_prospect’s_team.svg');
          this.contentTitle = 'Shortlist and connect with prospect’s team';
          this.contentGuidance = 'From the search results, you can create your own shortlist of prospects. ';
      } else if(this.currentGuide == 5) {
          this.imageSrc = require('@/assets/help_guide_pics/Chat_and_exchange_information_with_connected_team.svg');
          this.contentTitle = 'Use chat feature of MatrimonyAssist to communicate with prospect team and find out more about the prospect. ';
          this.contentGuidance = 'Chat and exchange information with connected team';  
      } else if(this.currentGuide == 6) {
          this.imageSrc = require('@/assets/help_guide_pics/Evaluate_information_and_make_decision.svg');
          this.contentTitle = 'Evaluate information and make decision';
          this.contentGuidance = 'Finally, when you are absolutely confident, only then make decision. ';
      }
    },

    changeContent() {
      this.currentGuide = this.currentGuide < 6 ? this.currentGuide + 1 : 0;
      
      if(this.currentGuide == 0) {
        this.imageSrc = require('@/assets/Icons/MA logo for start modal.svg');
        this.contentTitle = 'Welcome to MatrimonyAssist';
        this.contentGuidance = "Here you can create team, invite family and friends, shortlist potential candidates and connect and chat with respective teams."
      } else if(this.currentGuide == 1) {
        this.imageSrc = require('@/assets/help_guide_pics/Join_or_create_a_team.svg');
        this.contentTitle = 'Join or create a team';
        this.contentGuidance = "Having a team is a must requirement in MartimonyAssist. Someone who is already registered with MatrimonyAssist, can send you an invite link to join their team. Alternatively, you can create a team and generate an invite link and then share it to your potential member(s) to join your team.";
      } else if(this.currentGuide == 2) {
          this.imageSrc = require('@/assets/help_guide_pics/Chose_a_subscription_plan.svg');
          this.contentTitle = 'Chose a subscription plan';
          this.contentGuidance = 'In MattrimonyAssist subscription is team based. Anyone can pay for subscription and the rest of the members use it for free.';
      } else if(this.currentGuide == 3) {
          this.imageSrc = require('@/assets/help_guide_pics/Search_for_suitable_prospect.svg');
          this.contentTitle = ' Search for suitable prospect';
          this.contentGuidance = 'Here you search according to your search criteria to find prospect of your choice. ';
      } else if (this.currentGuide == 4) {
          this.imageSrc = require('@/assets/help_guide_pics/Shortlist_and_connect_with_prospect’s_team.svg');
          this.contentTitle = 'Shortlist and connect with prospect’s team';
          this.contentGuidance = 'From the search results, you can create your own shortlist of prospects. ';
      } else if(this.currentGuide == 5) {
          this.imageSrc = require('@/assets/help_guide_pics/Chat_and_exchange_information_with_connected_team.svg');
          this.contentTitle = 'Use chat feature of MatrimonyAssist to communicate with prospect team and find out more about the prospect. ';
          this.contentGuidance = 'Chat and exchange information with connected team';  
      } else if(this.currentGuide == 6) {
          this.imageSrc = require('@/assets/help_guide_pics/Evaluate_information_and_make_decision.svg');
          this.contentTitle = 'Evaluate information and make decision';
          this.contentGuidance = 'Finally, when you are absolutely confident, only then make decision. ';
      }
    },
    goToFirstGuide() {
      this.currentGuide = 0;
      this.imageSrc = require('@/assets/Icons/MA logo for start modal.svg');
      this.contentTitle = 'Welcome to MatrimonyAssist';
      this.contentGuidance = "Here you can create team, invite family and friends, shortlist potential candidates and connect and chat with respective teams."
    }
  },

  data() {
    return {
      imageSrc: require('@/assets/Icons/MA logo for start modal.svg'),
      contentTitle: 'Welcome to MatrimonyAssist',
      contentGuidance: "Here you can create team, invite family and friends, shortlist potential candidates and connect and chat with respective teams.",
      currentGuide: 0,
      // imageSrc: require('@/assets/help_guide_pics/Join_or_create_a_team.svg'),
      prevcount: 0,
      dialog: false,
      // notifications: [],
      // chatHistory: [],
      // active_team_id: null
    };
  },
  // methods: {
  //   async loadChatHistory() {
  //     try {
  //       let {data} = await ApiService.get('/v1/chat-history').then(res => res.data);
  //       this.$store.state.chat.chats = this.processChatHistoryResponse(data);
  //     } catch (e) {
  //       console.error(e);
  //       this.$store.dispatch('logout');
  //     }
  //   },

  //   processChatHistoryResponse(data) {
  //     let singleChat = map(data.single_chat, item => {
  //       return {
  //         label: 'Team member',
  //         state: 'seen',
  //         name: item.user?.full_name || 'user name',
  //         logo: item.user?.avatar,
  //         user_id: item.user.id,
  //         other_mate_id: item.user_id,
  //         typing_status: 0,
  //         typing_text: '',
  //         message: pick(item.last_message, messageKeys)
  //       }
  //     });

  //     let privateChat = map(data.private_chat, item => {
  //       return {
  //         label: 'Private chat',
  //         state: 'seen',
  //         name: item.private_receiver_data?.full_name || 'user name',
  //         logo: item.private_receiver_data?.avatar,
  //         to_team_id: item.to_team_id,
  //         from_team_id: item.from_team_id,
  //         private_receiver_id: item.receiver,
  //         team_private_chat_id: item.id,
  //         other_mate_id: item.receiver,
  //         typing_status: 0,
  //         typing_text: '',
  //         message: pick(item.last_private_message, messageKeys)
  //       }
  //     });

  //     let lastGroupMsg = data.last_group_msg ? [{
  //       label: 'Group chat',
  //       state: 'Typing...',
  //       name: data.last_group_msg.team.name,
  //       logo: data.last_group_msg.team.logo,
  //       typing_status: 0,
  //       typing_text: '',
  //       message: pick(data.last_group_msg, messageKeys)
  //     }] : []

  //     let connectedMsg = data.connected_team_msgs.map(item => {
  //       item.label = 'Connected Team';
  //       item.typing_status = 0;
  //       item.typing_text = '';
  //       item.message = item.team_chat && item.team_chat.last_message ? item.team_chat.last_message : {};
  //       item.is_friend = item.team_private_chat ? item.team_private_chat.is_friend : 0;
  //       return item;
  //     });

  //     return [...lastGroupMsg, ...connectedMsg, ...singleChat, ...privateChat];
  //   },
  //   async loadTeamChat() {
  //     try {
  //       let {data} = await ApiService.get(`/v1/team-chat?team_id=${this.active_team_id}`).then(res => res.data);
  //       if (data && data.team_members) {
  //         this.$store.state.chat.teamMembers = map(data.team_members, item => {
  //           return item.user_id.toString();
  //         });
  //       }
  //       this.processTeamChatResponse(data);
  //     } catch (e) {
  //       console.error(e);
  //       this.$store.dispatch('logout');
  //     }
  //   },
  //   processTeamChatResponse(data) {
  //     // let group = pick(data, ['id', 'name', 'logo']);
  //     this.$store.state.chat.activeTeam = data.id;
  //     let group = data;
  //     group.message = pick(data.last_group_message, messageKeys);
  //     group.label = 'Group chat';
  //     group.state = 'Typing...';
  //     group.typing_status = 0;
  //     group.typing_text = '';

  //     return [group, ...map(data.team_members, item => {
  //       return {
  //         label: 'Team member',
  //         user_id: item.user_id,
  //         state: 'seen',
  //         name: item.user?.full_name || 'user name',
  //         logo: item.user?.avatar,
  //         other_mate_id: item.user_id,
  //         typing_status: 0,
  //         typing_text: '',
  //         message: pick(item.last_message, messageKeys)
  //       }
  //     })];
  //   },
  //   async loadShortListedCandidates() {
  //     let {data} = await ApiService.get('/v1/short-listed-candidates').then(res => res.data);
  //     this.$store.state.shortList.shortlistedItems = data;
  //   }
  // },
  // mounted() {
  //   let loggedUser = JSON.parse(localStorage.getItem('user'));
  //   if (loggedUser) {
  //     this.$socket.emit('ping', {user_id: loggedUser.id});

  //     this.sockets.subscribe('ping_success', function (res) {
  //       if (res && res.online_users) {
  //         this.$store.state.chat.online_users = res.online_users;
  //       }
  //     });

  //     this.sockets.subscribe('receive_message', function (res) {
  //       if(res && !res.support) {
  //         // this.$store.state.chat.chats.unshift(res);
  //         this.loadChatHistory();
  //         this.loadTeamChat();
  //       }
  //     });
  //   }
  // },
  // created() {
  //   this.active_team_id = JwtService.getTeamIDAppWide();
  //   if(this.active_team_id) {
  //     this.loadChatHistory();
  //     this.loadTeamChat();
  //     this.loadShortListedCandidates();
  //   }
  // },
};
</script>



<style lang="scss">

.help-dialog {
  position: fixed;
  bottom: 0;
  right: 0;
  // margin-right: 4rem;
  z-index: 9;
  //border-radius: 60% 0 0 0;
  //background-color: #522e8e;
  //width: 5rem;

  @media (max-width: 575px) {
    top: 13px;
    right: 35px;
    height: 0;
    width: 0;
  }

  .question-mark {
    position: absolute;
    right: 0.5em;
    top: -.5rem;
    box-shadow: 0 0 4px 1.3px rgb(0 0 0 / 30%);
    border-radius: 50%;
    @media (max-width: 575px) {
      font-size: 18px !important;
      right: 0.9rem;
      top: 0.4rem;
      color: white !important;
    }
  }
}
.divider {
  border-top: 1px solid rgb(0, 0, 0, 0.06);
}
</style>
