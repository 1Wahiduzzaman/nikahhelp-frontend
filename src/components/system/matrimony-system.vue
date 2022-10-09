<template>
  <div class="position-relative">

    <Layout>
      <router-view />
      <instant-notification />
      
    </Layout>
    <div class="help-dialog">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        class="d-flex justify-center mb-4 mt-8"
      >
      <template v-slot:activator="{ on, attrs }">
								<v-icon large bg v-bind="attrs" v-on="on" :z-index="999" color="#522e8e">
                  mdi-help-circle
								</v-icon>
        </template>
        <template v-slot:default="dialog">
          <v-card class="relative">
            
            <v-card-text class="d-flex flex-column align-center">
              <img 
                class="mt-3"
                src="@/assets/form.jpg" alt="">
              <v-card-text class="text-center">
              {{ currentGuide }}. {{ contentTitle }}
            </v-card-text>
              <div class="text-center">{{ contentGuidance }}</div>
              
            </v-card-text>
            <v-btn
                rounded
                absolute
                bottom
                left
                text
                class="mb-2"
                @click="dialog.value = false;"
              >Skip</v-btn>
            <v-card-actions class="justify-end">
              
              <v-btn
                v-if="currentGuide > 0 "
                text
               
                @click="changeContentPrev"
                class="mr-3"
              >
            <v-icon
             color="grey"
            >
              mdi-arrow-left-circle
            </v-icon>
            </v-btn>
              <v-btn
                text
                @click="changeContent"
              >
              <v-icon
              color="#6159A7"
              >
                mdi-arrow-right-circle
              </v-icon>
            
            </v-btn>
            </v-card-actions>
            <v-card-actions class="justify-end">
              
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
   }).catch(() => {
     this.logout();
   });

  },

 

  methods: {
    ...mapActions([
      'logout'
    ]),

    changeContentPrev() {
       switch (this.currentGuide) {
        case 1:
          this.contentTitle = 'Join or create a team';
          this.contentGuidance = 'Having a team is a must requirement in MartimonyAssist. Someone who is already registered with MatrimonyAssist, can send you an invite link to join their team. Alternatively, you can create a team and generate an invite link and then share it to your potential member(s) to join your team.';
          this.currentGuide = 0;
          break;
        case 2:
          this.contentTitle = 'Chose a subscription plan';
          this.contentGuidance = 'In MattrimonyAssist subscription is team based. Anyone can pay for subscription and the rest of the members use it for free.';
          this.currentGuide = 1;
          break;
        case 3:
          this.contentTitle = ' Search for suitable prospect';
          this.contentGuidance = 'Here you search according to your search criteria to find prospect of your choice. ';
          this.currentGuide = 2;
          break;
        case 4:
          this.contentTitle = 'Shortlist and connect with prospect’s team';
          this.contentGuidance = 'From the search results, you can create your own shortlist of prospects. ';
          this.currentGuide = 3;
          break;
        case 5:
          this.contentTitle = 'Use chat feature of Matrimony Assist to communicate with prospect team and find out more about the prospect. ';
          this.contentyGuidance = 'Chat and exchange information with connected team';  
          this.currentGuide = 4;
          break;    
        default:
          this.contentTitle = 'Evaluate information and make decision';
          this.contentGuidance = 'Finally, when you are absolutely confident, only then make decision. ';
          this.currentGuide = 0;
          this.prevcount = 1;
          break;
       }
    },

    changeContent() {
      this.currentGuide = this.currentGuide + 1;

      switch (this.currentGuide) {
        case 1:
          this.prevcount = 0;
          this.contentTitle = 'Chose a subscription plan';
          this.contentGuidance = 'In MattrimonyAssist subscription is team based. Anyone can pay for subscription and the rest of the members use it for free.';
          break;
        case 2:
          this.contentTitle = ' Search for suitable prospect';
          this.contentGuidance = 'Here you search according to your search criteria to find prospect of your choice. ';
          break;
        case 3:
          this.contentTitle = 'Shortlist and connect with prospect’s team';
          this.contentGuidance = 'From the search results, you can create your own shortlist of prospects. ';
          break;
        case 4:
          this.contentTitle = 'Use chat feature of Matrimony Assist to communicate with prospect team and find out more about the prospect. ';
          this.contentGuidance = 'Chat and exchange information with connected team';  
          break;    
        default:
          this.contentTitle = 'Evaluate information and make decision';
          this.contentGuidance = 'Finally, when you are absolutely confident, only then make decision. ';
          break;
       }
    },
  },

  data() {
    return {
      contentTitle: 'Join or create a team',
      contentGuidance: 'Having a team is a must requirement in MartimonyAssist. Someone who is already registered with MatrimonyAssist, can send you an invite link to join their team. Alternatively, you can create a team and generate an invite link and then share it to your potential member(s) to join your team.',
      currentGuide: 0,
      imageSrc: '@/assets/form.jpg',
      prevcount: 0
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
  margin-right: 4rem;
  z-index: 9;
  border-radius: 50%;
}
</style>
