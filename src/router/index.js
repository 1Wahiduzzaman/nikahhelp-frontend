import Vue from "vue";
import VueRouter from "vue-router";

import DHome from "@/views/dashboard/DHome.vue";
import Home from "@/views/auth/Home.vue";
import About from "@/views/auth/About.vue";
import MatrimonySystem from "@/components/system/matrimony-system.vue";
import AboutPage from "@/components/landing-page/about.vue";
import HelpPage from "@/components/landing-page/help.vue";
import TermsAndConditionPage from "@/components/landing-page/terms-condition.vue";
import SafetyAndGuidancePage from "@/components/landing-page/safety-guidance.vue";
import Signup from "@/views/auth/Signup.vue";
import Login from "@/views/auth/Login.vue";
import EmailVerification from "@/views/auth/EmailVerification.vue";
import VerifyEmail from "@/views/auth/VerifyEmail.vue";
import Success from "@/views/auth/Success.vue";
import ForgetPassword from "@/views/auth/ForgetPassword.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
import CandidateRegistration from "@/views/candidate-registration/CandidateRegistration.vue";
import RepresentativeRegistration from "@/views/representative-registration/RepresentativeRegistration.vue";
import MemberTypeSelection from "@/views/MemberType/MemberTypeSelection.vue";
import MemberNameInput from "@/views/MemberType/MemberNameInput.vue";

import NotificationPage from "@/views/notification/NotificationPage.vue";
import BlockList from "@/views/blocklist/BlockList.vue";

//Shortlist Section
import Shortlist from "@/views/shortlist/Shortlist.vue";
import AllShortlist from "@/views/shortlist/AllShortlist.vue";
import AllTeamShortlist from "@/views/shortlist/AllTeamShortlist.vue";

//Subscription Section
import Subscription from "@/views/subscription/Subscription.vue";
import SubscriptionPayment from "@/views/subscription/SubscriptionPayment.vue";
import SubscriptionSuccess from "@/views/subscription/SubscriptionSuccess.vue";

//Manage Team Section
import ManageTeam from "@/views/team/ManageTeam.vue";
import CreateTeamPage2 from "@/views/team/CreateTeamPage2.vue";
import CreateTeamPage3 from "@/views/team/CreateTeamPage3.vue";
import CreateTeamPage4 from "@/views/team/CreateTeamPage4.vue";
import CreateTeamPage5 from "@/views/team/CreateTeamPage5.vue";
import JoinTeamPassword from "@/views/team/JoinTeamPassword.vue";

//Connections Section
import Connections from "@/views/connections/Connections.vue";

//Profile Section
import Profile from "@/views/profile/Profile.vue";
import ProfileView from "@/views/profile/ProfileView.vue";

//Admin Section
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import AdminFlag from "@/views/admin/flag.vue";
import AdminSystem from "@/views/admin/admin-system.vue";
import AdminUsers from "@/views/admin/users.vue";
import AdminTeams from "@/views/admin/teams.vue";
import AdminSupport from "@/views/admin/support.vue";
import AdminApproval from "@/views/admin/approval.vue";
import SystemAdmin from "@/views/admin/system-admin.vue";
import UsersList from "@/views/admin/user-list.vue";
import DeletedUsersList from "@/views/admin/deleted-user-list.vue";
import Test from "../components/development/Test.vue";
import TestChat from "../components/development/Chat.vue";

//Search Section
import Search from "@/views/search/Search.vue";
import AdvanceSearch from "@/views/search/AdvanceSearch.vue";
import UnAuthSearch from "@/views/search/UnAuthSearch.vue";

import Logout from "../components/logout/logout.vue";

import Settings from "../views/settings/Settings.vue";

import store from "../store";
import Header from "../components/header/header.vue";

import ChatWindow from "@/views/chat/ChatWindow.vue";

import PrivacyPolicy from "@/views/privacy-policy/PrivacyPolicy.vue";
import { InitRoute } from './guard/guard'

Vue.use(VueRouter);
import design from './design'
const AppRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,

        },
        {
            path: "",
            name: 'root',
            component: MatrimonySystem,
            redirect: '/dashboard',
            beforeEnter: InitRoute,
            children: [

                {
                    path: "/dashboard",
                    name: "DHome",
                    component: DHome,

                },
                {
                    path: "/candidate-registration",
                    name: "CandidateRegistration",
                    component: CandidateRegistration,


                },
                {
                    path: "/representative-registration",
                    name: "RepresentativeRegistration",
                    component: RepresentativeRegistration,


                },
                {
                    path: "/jointeampassword",
                    name: "Join Team Password",
                    component: JoinTeamPassword,
                },

                {
                    path: "/ui",
                    name: "UI",
                    component: Test,
                },
                {
                    path: "/ui-chat",
                    name: "UI-Chat",
                    component: TestChat,

                },
                {
                    path: "/chat-window",
                    name: "ChatWindow",
                    component: ChatWindow,

                },

                {
                    path: "/shortlist",
                    name: "Shortlist",
                    component: Shortlist,

                },
                {
                    path: "/shortlist/all",
                    name: "AllShortlist",
                    component: AllShortlist,

                },
                {
                    path: "/shortlist/all/team",
                    name: "AllTeamShortlist",
                    component: AllTeamShortlist,

                },
                {
                    path: "/notifications",
                    name: "NotificationPage",
                    component: NotificationPage,

                },
                {
                    path: "/blocklist",
                    name: "BlockList",
                    component: BlockList,

                },
                {
                    path: "/manageteam",
                    name: "ManageTeam",
                    component: ManageTeam,
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/subscription",
                    name: "Subscription",
                    component: Subscription,

                },
                {
                    path: "/subscription/:id?",
                    name: "Subscription",
                    component: Subscription,

                },
                {
                    path: "/subscription/payment/:team/:id/:subId",
                    name: "SubscriptionPayment",
                    component: SubscriptionPayment,

                },
                {
                    path: "/subscription/complete/success/:subName/:team",
                    name: "SubscriptionSuccess",
                    component: SubscriptionSuccess,

                },
                {
                    path: "/manageteam",
                    name: "ManageTeam",
                    component: ManageTeam,

                },

                {
                    path: "/create-team-2",
                    name: "CreateTeamPage2",
                    component: CreateTeamPage2,

                },
                {
                    path: "/create-team-3",
                    name: "CreateTeamPage3",
                    component: CreateTeamPage3,

                },
                {
                    path: "/create-team-4",
                    name: "CreateTeamPage4",
                    component: CreateTeamPage4,

                },
                {
                    path: "/create-team-5/:team_id?",
                    name: "CreateTeamPage5",
                    component: CreateTeamPage5,

                },
                {
                    path: "/connections",
                    name: "Connections",
                    component: Connections,

                },
                {
                    path: "/profile",
                    name: "Profile",
                    component: Profile,

                },
                {
                    path: "/user/profile/:id",
                    name: "ProfileView",
                    component: ProfileView,

                },

                {
                    path: "/search",
                    name: "Search",
                    component: Search,

                },
                {
                    path: "/search/advance",
                    name: "AdvanceSearch",
                    component: AdvanceSearch,

                },
                {
                    path: "/visitor/search",
                    name: "UnAuthSearch",
                    component: UnAuthSearch,
                    props: true,

                },
                {
                    path: "/settings",
                    name: "Settings",
                    component: Settings,

                },
                {
                    path: "/admin",
                    name: "Admin",
                    component: AdminSystem,


                    children: [{
                        path: "",
                        component: AdminDashboard,

                    },
                    {
                        path: "dashboard",
                        component: AdminDashboard,

                    },
                    {
                        path: "users",
                        component: AdminUsers,

                    },
                    {
                        path: "teams",
                        component: AdminTeams,

                    },
                    {
                        path: "approval",
                        component: AdminApproval,

                    },
                    {
                        path: "support",
                        component: AdminSupport,

                    },
                    {
                        path: "flag",
                        component: AdminFlag,

                    },
                    {
                        path: "system_admin",
                        component: SystemAdmin,

                    },
                    {
                        path: "active_users",
                        component: UsersList,

                    },
                    {
                        path: "deleted_users",
                        component: DeletedUsersList,

                    },
                    ],
                },
            ]
        },


        {
            path: "/signup",
            name: "Signup",
            component: Signup,

        },
        {
            path: "/login",
            name: "Login",
            component: Login,

        },

        {
            path: "/email-verification",
            name: "EmailVerification",
            component: EmailVerification,
        },

        {
            path: "/email-verification-success",
            name: "Success",
            component: Success,

        },
        {
            path: "/emailVerify/:token",
            name: "VerifyEmail",
            component: VerifyEmail,

        },
        {
            path: "/forgot-password",
            name: "ForgetPassword",
            component: ForgetPassword,
        },
        {
            path: "/password-reset-token-verification/:token",
            name: "ResetPassword",
            component: ResetPassword,
        },

        {
            path: "/about",
            name: "About",
            component: AboutPage,

        },
        {
            path: "/help",
            name: "Help",
            component: HelpPage,

        },
        {
            path: "/safety_guidance",
            name: "Safety_Guidance",
            component: SafetyAndGuidancePage,

        },
        {
            path: "/terms_condition",
            name: "Terms_Condition",
            component: TermsAndConditionPage,

        },


        {
            path: "/privacy-policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
        },

    ]
})

export default AppRouter;
window.AppRouter = AppRouter;
