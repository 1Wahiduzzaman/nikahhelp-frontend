<template>
  <div class="m-2 shadow-default gridCardDesign position-relative flip-card" :class="{'flip-card-toggle': rotated}">
    <div class="flip-card-inner">
      <div class="row no-gutters p-1 flip-card-front">
        <div class="col-12" id="flex-container">
          <img
              :src="connection.candidateInfo && connection.candidateInfo.candidate_image ? connection.candidateInfo.candidate_image : avatarSrc"
              alt=""
              id="card-image"
          />
        </div>
        <div class="col-12" id="flex-container-list">
          <div class="card-body py-2 d-flex flex-column h-full justify-content-between">
            <div>
              <h5 class="card-title">{{ connection.candidateInfo ? connection.candidateInfo.candidate_fname : 'Not found' }} {{ connection.candidateInfo ? connection.candidateInfo.candidate_lname : '' }}</h5>

              <ul class="desc-list">
                <!-- Team -->
                <li class="flex-between-start">
                  <span class="flex-30 label-text">Team</span>
                  <span class="flex-70">:
									<span class="ml-1"><router-link class="team-link" :to="{name: 'ManageTeam', query: {team_id: connection.to_team_id}}">{{ connection.to_team_name }}</router-link></span>
								</span>
                </li>
                <!-- Location -->
                <li class="flex-between-start">
                  <span class="flex-30 label-text">Location</span>
                  <span class="flex-70">:
									<span class="ml-1">{{ connection.candidateInfo ? connection.candidateInfo.candidate_location : 'N/A' }}</span>
								</span>
                </li>
                <!-- Age -->
                <li class="flex-between-start">
								<span class="flex-30 label-text">Age</span
                ><span class="flex-70"
                >:
									<span class="ml-1">{{ connection.candidateInfo ? getAge(connection.candidateInfo.candidate_age) : 'Not found' }} Yrs </span></span
                >
                </li>
                <!-- Religion -->
                <li class="flex-between-start">
								<span class="flex-30 label-text">Religion</span
                ><span class="flex-70"
                >:
									<span class="ml-1"
                  >{{ connection.candidateInfo ? connection.candidateInfo.candidate_religion : 'Not found' }}
									</span></span
                >
                </li>

                <li class="flex-between-start">
                  <span class="flex-30 label-text">Ethnicity</span>
                  <span class="flex-70">:
									<span class="ml-1">{{ connection.candidateInfo ? connection.candidateInfo.candidate_ethnicity : 'Not found' }} </span>
								</span>
                </li>
              </ul>

            </div>
            <div class="mt-2">
              <grid-buttons :type="type" @block="block"
                            @disconnectTeam="disconnectTeam"
                            @startConversation="startConversation"
                            @viewProfile="viewProfile"
                            @acceptRequest="acceptRequest"
                            @declineRequest="declineRequest"/>
            </div>
          </div>
        </div>
      </div>
      <div class="flip-card-back py-4 px-2 mt-4">
        <h6 class="pb-2">This Profile Connection Overview</h6>
        <table class="table table-borderless overview-table">
          <tr>
            <td class="td-60">Connection Status</td>
            <td class="text-end">:</td>
            <td class="text-capitalize">{{ connection.connection }}</td>
          </tr>
          <tr>
            <td class="td-60">Connected date</td>
            <td class="text-end">:</td>
            <td>{{ dateFromDateTime(connection.responded_at) }}</td>
          </tr>
          <tr>
            <td class="td-60">Connection requested by</td>
            <td class="text-end">:</td>
            <td>{{ connection.requested_by.full_name }}</td>
          </tr>
          <tr>
            <td class="td-60">Request Date</td>
            <td class="text-end">:</td>
            <td>{{ dateFromDateTime(connection.requested_at) }}</td>
          </tr>
        </table>

        <h6 class="pb-2">This Profile Team Overview</h6>
        <table class="table table-borderless overview-table">
          <tr>
            <td class="td-60">Team name</td>
            <td class="text-end">:</td>
            <td>{{ connection.to_team_name }}</td>
          </tr>
          <tr>
            <td class="td-60">Team members</td>
            <td class="text-end">:</td>
            <td>{{ connection.total_teamMember }}</td>
          </tr>
          <tr>
            <td class="td-60">Team creation date</td>
            <td class="text-end">:</td>
            <td>{{ dateFromTimeStamp(connection.team_created_date) }}</td>
          </tr>
          <tr>
            <td class="td-60">Team created by</td>
            <td class="text-end">:</td>
            <td>{{ connection.team_created_by }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="position-absolute candidate-top-right-corner"
         :class="{
             'connected-bg': type == 'connected',
             'request-received-bg': type == 'Request received',
             'request-sent-bg': type == 'Request send',}"></div>
    <div class="position-absolute icon-rotate-box cursor-pointer" @click="rotated = !rotated">
      <a-icon type="rollback" class="rotate-icon" size="large" />
    </div>
  </div>
</template>

<script>
import firebase from "../../configs/firebase";
import {getAge, dateFromDateTime, dateFromTimeStamp} from "@/common/helpers.js";
import JwtService from "@/services/jwt.service";
import GridButtons from "./GridButtons";

export default {
  name: "CandidateGridView",
  components: {GridButtons},
  props: ["connection"],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      conversations: [],
      type: this.connection.connection_type,
      rotated: false
    };
  },
  mounted() {
    // var self = this;
    // firebase.collection("conversations").get().then(querySnapshot => {
    // 		console.log(`Found ${querySnapshot.size} documents.`);
    // 		querySnapshot.forEach(doc => {
    // 			var convDetails = doc.data();
    // 			convDetails.id = doc.id;
    // 			self.conversations.push(convDetails);
    // 		});
    // 	});
    this.conversations = this.$store.state.chat.conversations;
    console.log("conversations loaded");
    // this.$store.dispatch("getConwiseInfo");
  },
  computed: {
    // location() {
    // 	return this.$store.state.candidateInfo.countries[
    // 		this.connection.candidate_location
    // 	].name;
    // },
    classObject() {
      if (this.type == "connected") {
        return {
          connected: this.type,
        };
      } else if (this.type == "Request received") {
        return {
          received: this.type,
        };
      } else if (this.type == "Request send") {
        return {
          "request-sent": this.type,
        };
      } else if (this.type == "we declined") {
        return {
          "we-declined": this.type,
        };
      } else {
        return {
          "they-declined": this.type,
        };
      }
    },
  },
  methods: {
    getAge,
    dateFromDateTime, //From helpers.js
    dateFromTimeStamp,
    selectCandidate() {
      console.log(this.connection.team_name);
      this.selectedData = this.connection;
      this.$emit("selected-connection", this.connection);
    },
    viewProfile() {
      this.$router.push(
          `/user/profile/${this.connection.candidateInfo.candidate_userid}`
      );
    },
    acceptRequest() {
      this.$emit("accept-request", this.connection.connection_id);
    },
    disconnectTeam() {
      console.log(this.connection.connection_id);
      this.$emit("disconnect-team", this.connection);
    },
    declineRequest() {
      this.$emit("decline-request", this.connection.connection_id);
    },
    connectRequest() {
      let teamId = JwtService.getTeamIDAppWide();
      if (this.connection.from_team_id != teamId) {
        this.$emit("connect-request", this.connection.from_team_id);
      } else {
        this.$emit("connect-request", this.connection.to_team_id);
      }
    },
    block() {
      this.$emit(
          "block-candidate",
          this.connection.candidateInfo.candidate_userid
      );
    },
    startConversation() {
      console.log("start clicked");
      var con_id = this.connection.connection_id;
      var conwise_chatinfo = this.$store.state.chat.conwise_info;
      for (var i = 0; i < conwise_chatinfo.length; i++) {
        if (conwise_chatinfo[i].con_id == con_id) {
          var chat_title = conwise_chatinfo[i].title;
          var member_list = conwise_chatinfo[i].member_list;
          var chat_category = "connected_" + con_id.toString();
          var check = this.checkChatCategory(chat_category);
          if (check) {
            console.log("chat found");
            this.$store.dispatch("setCurrentConversation", check);
          } else {
            var newConv = {
              title: chat_title,
              type: "connected",
              members: member_list,
              last_msg: "",
              category_id: chat_category,
            };
            var convCollection = firebase.collection("conversations");
            var newconvid = "";
            var self = this;
            convCollection
                .add(newConv)
                .then(function (docRef) {
                  newconvid = docRef.id;
                  self.$store.dispatch("setCurrentConversation", docRef.id);
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                  console.error("Error adding document: ", error);
                });

            console.log("New conv ID:", newconvid);
            // this.$store.dispatch('setCurrentConversation',newconvid);
            alert("conv createed:" + chat_title);
          }
          this.$router.push("/chat-window");
        }
      }
    },
    checkChatCategory(categoryId) {
      console.log("inside");
      console.log(this.conversations.length);
      console.log(this.conversations);
      for (var i = 0; i < this.conversations.length; i++) {
        console.log("category given:", categoryId);
        console.log("category item:", this.conversations[i].category_id);
        if (this.conversations[i].category_id == categoryId) {
          console.log(this.conversations[i].id);
          return this.conversations[i].id;
        }
      }
      return false;
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.card {
  @media (max-width: 558px) {
    height: 280px;
  }
  .card-img {
    height: 250px;
    float: left;
    margin-right: 0px;
    width: 100%;
    @media (max-width: 671px) {
      height: 100%;
      display: block;
    }

    @media (max-width: 610px) {
      height: 100%;
      display: block;
    }

    @media (max-width: 588px) {
      height: 90%;
      display: block;
    }

    @media (max-width: 552px) {
      height: 85%;
    }


    @media (max-width: 537px) {
      height: 80%;
    }


    @media (max-width: 525px) {
      height: 70%;
    }

    @media (max-width: 409px) {
      height: 60%;
    }
  }
  .card-body {
    float: right;
    overflow: hidden;

    @media (max-width: 511px) {
      margin-left: -10px;
      margin-top: -8px;
    }
    .desc-list {
      line-height: 1.5;

      @media (max-width: 679px) {
        font-size: 12px;
        line-height: 1;
      }


      @media (max-width: 543px) {
        font-size: 10px;
        margin-top: -10px;

      }


      @media (max-width:365px) {
        font-size: 8px;
      }
    }
    .btn-brand {
      background: $color-brand;
    }
    .card-title {
      @media (max-width: 610px) {
        font-size: 15px;
        margin-bottom: -10px;
      }

      @media (max-width: 543px) {
        font-size: 11px;
      }

      @media (max-width: 387px) {
        font-size: 10px;
      }


      @media (max-width: 376px) {
        font-size: 9px;
      }


      @media (max-width: 365px) {
        font-size: 8px;
      }
    }
  }

  #flex-container {
    display: flex;
  }

  #flex-container-list {
    margin-right: -10px;
    display: flex;
  }
}



#viewMoreDetails {
  align-items: center;
  width: 80%;
  padding: 3px 0;
  position: absolute;
  bottom: 5px;


  @media (max-width: 671px) {
    bottom: -60px;
  }


  @media (max-width: 584px) {
    font-size: 12px;
  }

  @media (max-width: 542px) {
    font-size: 10px;
    bottom: -100px;
  }


  @media (max-width: 501px) {
    font-size: 10px;
    bottom: -115px;
  }
  @media (max-width: 482px) {
    font-size: 10px;
    bottom: -100px;
    padding: 1px 2px;
  }
}

#connectButton {
  margin: 7px;
  padding-left: 9px;
  padding-right: 9px;
  margin-bottom: 0px;
  position: absolute;
  right: 25px;
  bottom: 35px;



  @media (max-width: 772px) {
    bottom: 35px;
  }



  @media (max-width: 671px) {
    bottom: -30px;
    margin-left: -100px;
    left: 128px;
  }

  @media (max-width: 542px) {
    font-size: 10px;
    bottom: -75px;
  }

  @media (max-width: 511px) {
    margin-left: -110px;
  }
  @media (max-width: 482px) {
    font-size: 8px;
    bottom: -60px;
    padding: 1px 2px;
  }
}


#shortlistButton {
  margin-left: 7px;
  padding-left: 9px;
  padding-right: 9px;
  margin-bottom: 0px;
  position: absolute;
  bottom: 35px;

  @media (max-width: 772px) {
    bottom: 60px;
  }


  @media (max-width: 671px) {
    bottom: -7px;
  }

  @media (max-width: 542px) {
    font-size: 10px;
    bottom: -55px;
  }
  @media (max-width: 482px) {
    font-size: 8px;
    bottom: -40px;
    padding: 1px 2px;
  }

}


.gridCardDesign {

  @media (max-width: 666px) {
    margin-right: 0px;
    margin-left: 5px;
  }

  @media (max-width: 463px) {
    height: 270px;
  }
  @media (max-width: 444px) {
    margin: 4px -25px 4px -20px;

  }



  @media (max-width: 380px) {
    margin: 2px -25px 4px -40px;
  }


  @media (max-width: 370px) {
    height: 290px;
    margin: 4px -25px 4px -40px;

  }


  @media (max-width: 359px) {
    margin: 4px -35px 4px -50px;

  }

  @media (max-width: 335px) {
    margin: 4px -40px 4px -40px;

  }

  @media (max-width: 330px) {
    margin: 4px -50px 4px -40px;

  }
}

.candidate-top-right-corner {
  width: 45px;
  height: 45px;
  border-radius: 5px;
  overflow: hidden;
  top: 0;
  right: 0;
}

.candidate-top-right-corner:after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 40px 40px 0;
  border-color: transparent transparent transparent transparent;
  right: 0;
  top: 0;
  position: absolute;
}

.block-button {
  background: $bg-brand;
}

.grid-action-btn {
  border-color: #f9f9f9;
}


#card-image {
  height: 190px;
  width: 100%;
  //float: left;
  display: flex;
  //@media (max-width: 768px) {
  //  width: 100%;
  //}
  //@media (max-width: 368px) {
  //  height: 80%;
  //  width: 80%;
  //  display: block;
  //}
  //@media (max-width: 358px) {
  //  height: 80%;
  //  width: 80%;
  //  display: block;
  //}
}

.connected-bg:after {
  border-color: transparent #3ab549 transparent transparent;
}

.request-received-bg:after {
  border-color: transparent #fbb03b transparent transparent;
}

.request-sent-bg:after {
  border-color: transparent #1bb9c2 transparent transparent;
}

.self-declined-bg:after {
  border-color: transparent #fa4942 transparent transparent;
}

.they-declined-bg:after {
  border-color: transparent #522e8e transparent transparent;
}
.grid-item {
  border: 3px solid #ffffff;
}
.grid-item:hover {
  border: 3px solid #3f9de7;
  //border-top-right-radius: 7px;
}
.btn-success {
  background: #3ab549;
  color: #FFFFFF;
}
.badge-primary {
  min-width: 0;
}
.team-link {
  color: $color-primary;
  border-bottom: 1px solid $border-primary;
}
.team-link:hover {
  color: $color-brand;
  border-bottom: 1px solid $border-brand;
}
.flip-card {
  background-color: #FFFFFF;
  width: 100%;
  min-height: 430px;
  perspective: 1000px;
}
.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.flip-card-toggle .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card-back {
  color: white;
  transform: rotateY(180deg);
}
.icon-rotate-box {
  left: 10px;
  top: 5px;
}
.rotate-icon:hover {
  color: $color-brand;
}
.td-60 {
  width: 60%;
}
.overview-table td, .overview-table th {
  padding: 0.25rem 0.75rem;
}
.mobile-margin {
  margin-left: -10px;
  @media (min-width: 768px) {
    margin-left: 0;
  }
}
</style>
