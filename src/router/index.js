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
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/candidate-registration",
        name: "CandidateRegistration",
        component: CandidateRegistration,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/representative-registration",
        name: "RepresentativeRegistration",
        component: RepresentativeRegistration,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/shortlist",
        name: "Shortlist",
        component: Shortlist,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/shortlist/all",
        name: "AllShortlist",
        component: AllShortlist,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/shortlist/all/team",
        name: "AllTeamShortlist",
        component: AllTeamShortlist,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/notifications",
        name: "NotificationPage",
        component: NotificationPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/blocklist",
        name: "BlockList",
        component: BlockList,
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/subscription/:id?",
        name: "Subscription",
        component: Subscription,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/subscription/payment/:team/:id/:subId",
        name: "SubscriptionPayment",
        component: SubscriptionPayment,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/subscription/complete/success/:subName/:team",
        name: "SubscriptionSuccess",
        component: SubscriptionSuccess,
        meta: {
            requiresAuth: true,
        },
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
        path: "/create-team-2",
        name: "CreateTeamPage2",
        component: CreateTeamPage2,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/create-team-3",
        name: "CreateTeamPage3",
        component: CreateTeamPage3,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/create-team-4",
        name: "CreateTeamPage4",
        component: CreateTeamPage4,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/create-team-5/:team_id?",
        name: "CreateTeamPage5",
        component: CreateTeamPage5,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/connections",
        name: "Connections",
        component: Connections,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/user/profile/:id",
        name: "ProfileView",
        component: ProfileView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresUnAuth: true,
        },
    },

    // {
    //     path: "/about",
    //     name: "About",
    //     component: About,
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
    //Search Section
    {
        path: "/search",
        name: "Search",
        component: Search,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/search/advance",
        name: "AdvanceSearch",
        component: AdvanceSearch,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/visitor/search",
        name: "UnAuthSearch",
        component: UnAuthSearch,
        props: true,
        meta: {
            requiresUnAuth: true,
        },
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
        meta: {
            requiresUnAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requiresUnAuth: true,
        },
    },
    {
        path: "/member-type",
        name: "MemberTypeSelection",
        component: MemberTypeSelection,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/member-name/:type",
        name: "MemberNameInput",
        component: MemberNameInput,
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/emailVerify/:token",
        name: "VerifyEmail",
        component: VerifyEmail,
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            requiresAuth: true,
        },
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

        children: [{
            path: "",
            component: AdminHome,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "add-admin",
            component: AddAdmin,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "user-report",
            component: UserReport,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "pending-user-list",
            component: PendingUserList,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "subscription-report",
            component: SubscriptionReport,
            meta: {
                requiresAuth: true,
            },
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