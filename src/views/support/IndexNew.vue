<template>
    <div>
        <Loader :isLoading="loading || isLoading" />
        <div class="page1" v-if="pageNo == 1">
            <div class="d-flex justify-content-between p-4">
                <span class="color-primary" style="font-size: 1.5rem; opacity: .5;">All ticket history</span>
                <ButtonComponent
                    class="text-large"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Add a new ticket"
                    :responsive="false"
                    icon="/assets/icon/gallery.svg"
                    @onClickButton="showTicketSubmissionForm = true"
                />
            </div>
            <div class="table px-5 py-2">
                <div class="table-header py-2 px-5 mb-3">
                    <span class="header-text p-0">TICKET ID</span>
                    <span class="header-text p-0">LAST UPDATED</span>
                    <span class="header-text p-0">TICKET STATUS</span>
                    <span class="header-text p-0">ISSUE TYPE</span>
                    <span class="header-text p-0">DETAILS</span>
                </div>
    
                <div class="table-item py-2 px-5" v-for="item in getUserTickets.slice().reverse()" :key="item.id" @click="pageNo = 2">
                    <span class="text-black-50 ticket-id">#{{ item.id }}</span>
                    <span class="text-black-50 ticket-time">{{ messageCreatedAt(item) }}</span>
                    <span class="font-weight-bold ticket-status"  :style="{ color: getTicketStatusColor(item) }">{{ ticketStatus(item) }}</span>
                    <span class="text-black-50 ticket-type">{{ item.issue_type }}</span>
                    <span class="text-black-50 ticket-issue">{{ item.issue }}</span>
                </div>
            </div>
    
            <!-- submit ticket modal -->
            <a-modal 
                :visible="showTicketSubmissionForm" 
                :centered="true"
                :closable="true"
                title="Submit a ticket"
                @ok="showTicketSubmissionForm = false"
                @cancel="showTicketSubmissionForm = false"
                :ok-button-props="{ disabled: true }"
                :cancel-button-props="{ disabled: true }"
            >
                <div>
                    <p class="text-black-50 text-center">Describe Issue Type</p>
                    <a-form-model-item>
                        <a-select 
                            style="width: 100%; margin-bottom: 0.5rem;"
                            class="text-black-50"
                            required
                            v-model="selectedIssue"
                        >
                            <a-select-option value="manageteam">
                                Manage Team
                            </a-select-option>
                            <a-select-option value="Chat">
                                Chat
                            </a-select-option>
                            <a-select-option value="connection">
                                Connections
                            </a-select-option>
                            <a-select-option value="shortList">
                                Short List
                            </a-select-option>
                            <a-select-option value="profile">
                                Profile
                            </a-select-option>
                            <a-select-option value="blocklist">
                                Block list
                            </a-select-option>
                            <a-select-option value="notification">
                                Notification
                            </a-select-option>
                            <a-select-option value="subscription">
                                Subscription
                            </a-select-option>
                            <a-select-option value="search">
                                Search
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
    
                    <p class="text-black-50 text-center mt-3">Describe your issue</p>
                    <a-form-model-item>
                        <textarea 
                            v-model="issue" 
                            row="5"
                            placeholder="Write your issue here" 
                            class="text-black-50 border rounded w-100 p-2">
                        </textarea>
                    </a-form-model-item>
                </div>
    
                <template slot="footer">
                    <a-button key="back" shape="round" @click="showTicketSubmissionForm=false">
                        Cancel
                    </a-button>
                    <a-button key="submit" type="primary" shape="round" @click="showTicketSubmissionForm = false; ticketSumbission();">
                        Submit
                    </a-button>
                </template>
            </a-modal>

            <!-- submit ticket success -->
            <a-modal 
                :visible="showSubmissionSuccess" 
                :centered="true"
                :closable="true"
                @ok="showSubmissionSuccess = false"
                @cancel="showSubmissionSuccess = false"
                :ok-button-props="{ disabled: true }"
                :cancel-button-props="{ disabled: true }"
            >
                <div>
                    
                    <span class="text-black-50 text-center w-100 mt-5 mb-3" style="font-size: 1.5rem;">Your ticket submission is successful</span>

                    <div class="image-div w-100 d-flex justify-content-center">
                        <img src="@/assets/Verification_Icons/Icon/SVG/Verified.svg" alt="" class="m-auto" height="150" widht="150">
                    </div>

                    <span class="text-center font-weight-bold w-100 mt-4" style="font-size: 1.5rem; color: rgba(0, 0, 0, .2)">Ticket id: #{{ lastSubmittedTicketId }}</span>
                </div>
    
                <template slot="footer">
                    <a-button key="submit" type="primary" shape="round" @click="showSubmissionSuccess = false">
                        ok
                    </a-button>
                </template>
            </a-modal>

            <!-- submit ticket failed -->
            <a-modal 
                :visible="showSubmissionFailed" 
                :centered="true"
                :closable="true"
                @ok="showSubmissionFailed = false"
                @cancel="showSubmissionFailed = false"
                :ok-button-props="{ disabled: true }"
                :cancel-button-props="{ disabled: true }"
            >
                <div>
                    
                    <span class="text-black-50 text-center w-100 mt-5 mb-3" style="font-size: 1.5rem;">Your ticket submission is unsuccessful</span>

                    <div class="image-div w-100 d-flex justify-content-center">
                        <img src="@/assets/Verification_Icons/Icon/SVG/Rejected.svg" alt="" class="m-auto" height="150" widht="150">
                    </div>

                    <!-- <span class="text-center font-weight-bold w-100 mt-4" style="font-size: 1.5rem; color: rgba(0, 0, 0, .2)">Ticket id: #{{ lastSubmittedTicketId }}</span> -->
                </div>
    
                <template slot="footer">
                    <a-button key="submit" type="primary" shape="round" @click="showSubmissionFailed = false">
                        ok
                    </a-button>
                </template>
            </a-modal>
        </div>
        <div class="page2" v-if="pageNo == 2">
            <div class="d-flex justify-content-between p-4">
                <ButtonComponent
                    class="text-large"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Back"
                    :responsive="false"
                    icon="/assets/icon/gallery.svg"
                    @onClickButton="pageNo = 1"
                />
                <ButtonComponent
                    class="text-large"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Delete"
                    :responsive="false"
                    icon="/assets/icon/gallery.svg"
                />
            </div>
        </div>

    </div>
</template>

<script>
import {format} from "timeago.js";
import {mapActions, mapGetters} from "vuex";
import ButtonComponent from "../../components/atom/ButtonComponent.vue";
import ApiService from '../../services/api.service';
export default {
    name: "Support",
	components: {
        ButtonComponent,
    },
	
    data() {
        return {
            showTicketSubmissionForm: false,
            showSubmissionSuccess: false,
            showSubmissionFailed: false,
            selectedIssue: 'Select your issue type',
            issue: '',
            noTickets: true,
            isLoading: false,
            pageNo: 1,
            lastSubmittedTicketId: null,
        }
    },

    created() {
		this.$store.dispatch('getMyTickets', this.getAuthUserId);
	},

    watch: {
        getUserTickets() {
            this.noTickets = this.getUserTickets.length > 0;

        }
    },

    computed: {
        ...mapGetters([
            'currentTicketComponents',
            'getUserTickets',
		]),
        getAuthUserId() {
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            if (loggedUser) {
                return loggedUser.id;
            }
            return null;
        },
        getAuthUser() {
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            if (loggedUser) {
                return loggedUser;
            }
            return null;
        },
        loading() {
            return this.getUserTickets.length < 1 && this.noTickets;
        },
    },

    methods: {
        messageCreatedAt(item) {
            if(item?.process_ticket?.length > 0) {
                let time = item.process_ticket[item.process_ticket.length-1].created_at;
                return format(time);
            }
            return format(item.created_at);
        },

        ticketSumbission() {
            this.isLoading = true;
            ApiService.post('v1/ticket-submission', {
                issue_type: this.selectedIssue,
                issue: this.issue,
                user: localStorage.getItem('user'),
                }).then((res) => {
                    let submittedTicket = res.data.data.ticket;
                    submittedTicket.process_ticket = [];
                    submittedTicket.resolve = 0;
                    let allTickets = this.getUserTickets;
                    allTickets.push(submittedTicket);
                    this.$store.commit('getMyTickets', allTickets);
                    this.lastSubmittedTicketId = submittedTicket.id;
                    this.isLoading = false;
                    this.showSubmissionSuccess = true;

                })
                .catch(e => {
                    this.isLoading = false;
                    this.showSubmissionFailed = true;
                    console.log(e);
                })
        },
        ticketStatus(item) {
            if(item.resolve == 0) {
                if(item.process_ticket.length > 0) {
                    let user = JSON.parse(item.process_ticket[item.process_ticket.length-1].user);
                    return user.hasOwnProperty('roles')  ? 'Need your reply' : 'Pending';
                }
                return 'Pending';
            } else {
                return 'Resolved';
            }
        },
        getTicketStatusColor(item) {
            if(item.resolve == 0) {
                if(item.process_ticket.length > 0) {
                    let user = JSON.parse(item.process_ticket[item.process_ticket.length-1].user);
                    return user.hasOwnProperty('roles')  ? '#522e8e' : '#ff9800';
                }
                return '#ff9800';
            } else {
                return '#4caf50';
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;600&display=swap');
$primary: #362787;
$primary_lite_1: #594e9e;
$primary_lite_2: #8078b5;
$primary_lite_3: #a8a3cd;
$primary_lite_4: #d3d1e6;
$primary_lite_5: #f4f4f9;
$primary_dark_1: #120f22;
$primary_dark_2: #1d1741;
$primary_dark_3: #291e63;


.table {

    .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 4fr;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            display: block;
            width: calc(100% - 40px);
            height: 1px;
            bottom: 0;
            background-color: rgba(0, 0, 0, .1);
        }

        @media screen and (max-width: 992px) {
            display: none;
        }
    }
    .header-text {
        font-family: 'Open sans', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        color: rgba(0, 0, 0, .3);
    }

    .table-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 4fr;
        padding: 5px;
        margin: 8px 0px;
        background-color: $primary_lite_5;
        border-radius: 10px;
        font-size: .9rem;
        cursor: pointer;

        span {
            padding: 5px 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 .2rem .5rem rgba(0,0,0,.15);
            background-color: $primary_lite_4;
        }
        
        @media screen and (max-width: 992px) {
            position: relative;
            display: flex;
            flex-direction: column;
            
            span {
                padding: 0;
            }
            .ticket-id {
                order: 1;
                background: #b3b3b3;
                max-width: fit-content !important;
                padding: 2px 3px;
                color: #fff !important;
                border-radius: 5px;
            }
            .ticket-type {
                order: 2;
                font-size: 1.1rem;

            }
            .ticket-issue {
                order: 3;
                color: rgba(0, 0, 0, .3);

            }
            .ticket-status {
                order: 4;
                font-size: 1rem;
                margin-top: 2px;
            }

            .ticket-time {
                position: absolute;
                right: 2%;
                bottom: 8%;
                display: block;
                order: 5;
                float: right !important;
            }
        }
    }
}
</style>
