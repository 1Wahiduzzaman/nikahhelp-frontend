import Vue from "vue";
import VueRouter from "vue-router";
import DHome from "@/views/dashboard/DHome.vue";
import AboutPage from "@/components/landing-page/about.vue";
import HelpPage from "@/components/landing-page/help.vue";
import PrivacyPolicy from "@/components/landing-page/privacy-policy.vue";
import TermsAndConditionPage from "@/components/landing-page/terms-condition.vue";
import SafetyAndGuidancePage from "@/components/landing-page/safety-guidance.vue";
import UserAgreement from "@/components/landing-page/user-agreement.vue";
import Signup from "@/views/auth/Signup.vue";
import Login from "@/views/auth/Login.vue";
import AdminLogin from "@/views/admin/AdminLogin.vue";
import EmailVerification from "@/views/auth/EmailVerification.vue";
import VerifyEmail from "@/views/auth/VerifyEmail.vue";
import Success from "@/views/auth/Success.vue";
import ForgetPassword from "@/views/auth/ForgetPassword.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";

import NotificationPage from "@/views/notification/NotificationPage.vue";
import BlockList from "@/views/blocklist/BlockList.vue";
import Support from "@/views/support/Index.vue";

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
import DocumentDetails from "@/views/admin/document-details.vue";
import AdminTeams from "@/views/admin/teams.vue";
import AdminSupport from "@/views/admin/support.vue";
import AdminApproval from "@/views/admin/approval.vue";
import SystemAdmin from "@/views/admin/system-admin.vue";
import UsersList from "@/views/admin/user-list.vue";
import DeletedUsersList from "@/views/admin/deleted-user-list.vue";
import TeamList from "@/views/admin/team-list.vue";
import DeletedTeamList from "@/views/admin/deleted-team-list.vue";
import Test from "../components/development/Test.vue";
import TestChat from "../components/development/Chat.vue";
import ApproveUsers from "@/views/admin/approve-users.vue";
import ApproveDocuments from "@/views/admin/approve-documents.vue";
import UserCandidateDetails from "@/views/admin/user-candidate-profile.vue";

//Search Section
import Search from "@/views/search/Search.vue";
import AdvanceSearch from "@/views/search/AdvanceSearch.vue";
import UnAuthSearch from "@/views/search/UnAuthSearch.vue";

import Logout from "../components/logout/logout.vue";

import Settings from "../views/settings/Settings.vue";

import store from "../store";
import Header from "../components/header/header.vue";

import ChatWindow from "@/views/chat/ChatWindow.vue";


import { InitRoute, lazyLoadComponent, lazyLoadView, InitAdminRoute } from './guard/guard'

Vue.use(VueRouter);
const AppRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: "/",
            name: "Home",
            component: lazyLoadView('auth', 'Home'),
            beforeEnter: InitRoute,

        },

        {
            path: "/candidate-registration",
            name: "CandidateRegistration",
            component: lazyLoadView('candidate-registration', 'CandidateRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/candidate-short-registration",
            name: "CandidateShortRegistration",
            component: lazyLoadView('candidate-registration', 'Candidate-Short-registration'),
            beforeEnter: InitRoute,

        },

        {
            path: "/representative-registration",
            name: "RepresentativeRegistration",
            component: lazyLoadView('representative-registration', 'RepresentativeRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/edit_candidate",
            name: "EditCandidateRegistration",
            component: lazyLoadView('candidate-registration', 'EditCandidateRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/edit_representative",
            name: "EditRepresentativeRegistration",
            component: lazyLoadView('representative-registration', 'EditRepresentativeRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/search",
            name: "AdvanceSearch",
            component: lazyLoadView('search', 'AdvanceSearch'),
            beforeEnter: InitRoute,
        },
        {
            path: "/admin",
            name: "Admin",
            component: lazyLoadView('admin', 'admin-system'),
            beforeEnter: InitAdminRoute,
            children: [{
                path: "",
                component: AdminDashboard,
                name: "Admin",

            },
            {
                path: "dashboard",
                component: AdminDashboard,
                name: 'AdminDashboard'

            },
            {
                path: "users",
                component: AdminUsers,
                name: 'AdminUsers'

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
                name: 'Support',
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
                path: "matrimony-users",
                component: UsersList,
                name: "Users"

            },
            {
                path: "deleted_users",
                component: DeletedUsersList,

            },
            {
                path: "active_teams",
                component: TeamList,

            },
            {
                path: "deleted_Teams",
                component: DeletedTeamList,

            },
            {
                path: "approve_users",
                component: ApproveUsers,

            },
            {
                path: "approve_documents",
                component: ApproveDocuments,

            },
            {
                path: "document_details/:user_id",
                component: DocumentDetails,

            },
            {
                path: "user_candidate_details/:user_id",
                component: UserCandidateDetails,

            },
            ],
        },
        {
            path: "",
            name: 'root',
            component: lazyLoadComponent('system', 'matrimony-system'),
            redirect: '/dashboard',
            beforeEnter: InitRoute,
            children: [

                {
                    path: "/dashboard",
                    name: "DHome",
                    component: DHome,

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
                    path: "/support",
                    name: "Support",
                    component: Support,

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
                    name: "SubscriptionTeam",
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

                // {
                //     path: "/search",
                //     name: "Search",
                //     component: Search,

                // },
                {
                    path: "/settings",
                    name: "Settings",
                    component: Settings,

                },

            ]
        },
        {
            path: "/visitor/search",
            name: "UnAuthSearch",
            component: UnAuthSearch,
            props: true,

        },
        {
            path: "/signup",
            name: "Signup",
            component: lazyLoadView('auth', 'Signup'),
            beforeEnter: InitRoute,
        },

        {
            path: "/login",
            name: "Login",
            component: lazyLoadView('auth', 'Login'),
            beforeEnter: InitRoute,
        },
        {
            path: "/admin/login",
            name: "AdminLogin",
            component: lazyLoadView('admin', 'AdminLogin'),
            beforeEnter: InitAdminRoute,
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
            path: "/privacy-cookie-policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
        },
        {
            path: "/user-agreement",
            name: "UserAgreement",
            component: UserAgreement,
        },
    ]
});


export default AppRouter;
window.AppRouter = AppRouter;