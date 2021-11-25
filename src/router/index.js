import Vue from "vue";
import VueRouter from "vue-router";

import DHome from "@/views/dashboard/DHome.vue";
import Home from "@/views/auth/Home.vue";
import About from "@/views/auth/About.vue";
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
import AdminHome from "@/views/admin/AdminHome.vue";
import AddAdmin from "@/views/admin/AddAdmin.vue";
import UserReport from "@/views/admin/UserReport.vue";
import PendingUserList from "@/views/admin/PendingUserList.vue";
import SubscriptionReport from "@/views/admin/SubscriptionReport.vue";

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
const routes = [
    ...design,
    {
        path: "/jointeampassword",
        name: "Join Team Password",
        component: JoinTeamPassword,
    },
    {
        path: "/dashboard",
        name: "DHome",
        component: DHome,
        beforeEnter: InitRoute,
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
        beforeEnter: InitRoute,
    },
    {
        path: "/chat-window",
        name: "ChatWindow",
        component: ChatWindow,
        beforeEnter: InitRoute,
    },
    {
        path: "/candidate-registration",
        name: "CandidateRegistration",
        component: CandidateRegistration,
        beforeEnter: InitRoute,
    },
    {
        path: "/representative-registration",
        name: "RepresentativeRegistration",
        component: RepresentativeRegistration,
        beforeEnter: InitRoute,
    },
    {
        path: "/shortlist",
        name: "Shortlist",
        component: Shortlist,
        beforeEnter: InitRoute,
    },
    {
        path: "/shortlist/all",
        name: "AllShortlist",
        component: AllShortlist,
        beforeEnter: InitRoute,
    },
    {
        path: "/shortlist/all/team",
        name: "AllTeamShortlist",
        component: AllTeamShortlist,
        beforeEnter: InitRoute,
    },
    {
        path: "/notifications",
        name: "NotificationPage",
        component: NotificationPage,
        beforeEnter: InitRoute,
    },
    {
        path: "/blocklist",
        name: "BlockList",
        component: BlockList,
        beforeEnter: InitRoute,
    },
    // {
    //   path: "/manageteam",
    //   name: "ManageTeam",
    //   component: ManageTeam,
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
        path: "/subscription",
        name: "Subscription",
        component: Subscription,
        beforeEnter: InitRoute,
    },
    {
        path: "/subscription/:id?",
        name: "Subscription",
        component: Subscription,
        beforeEnter: InitRoute,
    },
    {
        path: "/subscription/payment/:team/:id/:subId",
        name: "SubscriptionPayment",
        component: SubscriptionPayment,
        beforeEnter: InitRoute,
    },
    {
        path: "/subscription/complete/success/:subName/:team",
        name: "SubscriptionSuccess",
        component: SubscriptionSuccess,
        beforeEnter: InitRoute,
    },
    {
        path: "/manageteam",
        name: "ManageTeam",
        component: ManageTeam,
        beforeEnter: InitRoute,
    },

    {
        path: "/create-team-2",
        name: "CreateTeamPage2",
        component: CreateTeamPage2,
        beforeEnter: InitRoute,
    },
    {
        path: "/create-team-3",
        name: "CreateTeamPage3",
        component: CreateTeamPage3,
        beforeEnter: InitRoute,
    },
    {
        path: "/create-team-4",
        name: "CreateTeamPage4",
        component: CreateTeamPage4,
        beforeEnter: InitRoute,
    },
    {
        path: "/create-team-5/:team_id?",
        name: "CreateTeamPage5",
        component: CreateTeamPage5,
        beforeEnter: InitRoute,
    },
    {
        path: "/connections",
        name: "Connections",
        component: Connections,
        beforeEnter: InitRoute,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        beforeEnter: InitRoute,
    },
    {
        path: "/user/profile/:id",
        name: "ProfileView",
        component: ProfileView,
        beforeEnter: InitRoute,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
       // beforeEnter: InitRoute,
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
        beforeEnter: InitRoute,
    },
    {
        path: "/search/advance",
        name: "AdvanceSearch",
        component: AdvanceSearch,
        beforeEnter: InitRoute,
    },
    {
        path: "/visitor/search",
        name: "UnAuthSearch",
        component: UnAuthSearch,
        props: true,
        beforeEnter: InitRoute,
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
        path: "/member-type",
        name: "MemberTypeSelection",
        component: MemberTypeSelection,
        beforeEnter: InitRoute,
    },
    {
        path: "/member-name/:type",
        name: "MemberNameInput",
        component: MemberNameInput,
        beforeEnter: InitRoute,
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
        beforeEnter: InitRoute,
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
        path: "/header",
        name: "Header",
        component: Header,
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
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
        path: "/settings",
        name: "Settings",
        component: Settings,
        beforeEnter: InitRoute,
    },

    {
        path: "/privacy-policy",
        name: "PrivacyPolicy",
        component: PrivacyPolicy,
    },
    //Admin Routes
    {
        path: "/admin",
        name: "AdminDashboard",
        component: AdminDashboard,
        beforeEnter: InitRoute,

        children: [{
            path: "",
            component: AdminHome,

        },
        {
            path: "add-admin",
            component: AddAdmin,

        },
        {
            path: "user-report",
            component: UserReport,

        },
        {
            path: "pending-user-list",
            component: PendingUserList,

        },
        {
            path: "subscription-report",
            component: SubscriptionReport,

        },
        ],
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// router.beforeEach(function(to, _, next) {
//     if (to.meta.requiresAuth) {
//         next({ path: "/login" });
//     } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
//         next({ path: "/dashboard" });
//     } else {
//         next();
//     }
// });

export default router;
