<template>
  <div class="position-relative">
    <Layout>
      <router-view />
      <instant-notification />
    </Layout>
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
    ])
  }
  // data() {
  //   return {
  //     notifications: [],
  //     chatHistory: [],
  //     active_team_id: null
  //   };
  // },
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
</style>
