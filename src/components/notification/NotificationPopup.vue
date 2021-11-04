<template>
  <div class="notification-wrapper">
        <div>
            <div class="dropdownNotify-title py-2 d-flex align-items-center">
                <strong class="text-capitalize">{{ label }}</strong>
                <span v-if="count > 0" class="ml-2 count">{{ count }}</span>
            </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="notification__items">
            <a-list
                size="small"
                v-for="notification in 20"
                :key="notification"
                item-layout="horizontal"
                :data-source="[{title: 'user one'}]"
                style="border-bottom: 1px solid rgb(235, 235, 235);"
            >
                <a-list-item  slot="renderItem" slot-scope="item">
                    <slot name="item" :item="item">
                        <component :is="componentName" :item="item"></component>
                    </slot>
                </a-list-item>
                
            </a-list>
        </div>
        <div class="text-center pt-2">
            <a href="#"> {{ buttonLabel }} </a>
        </div>
    </div>
</template>

<script>

import ChatListItem from "./ChatListItem";
import NotificationListItem from "./NotificationListItem";
import ShortListItem from "./ShortListItem";
import TeamListItem from "./TeamListItem"
const selectComponent = {
    chat: {
        component: 'ChatListItem',
        label: 'chat',
        buttonLabel: 'Show all chat'
    },
    notification: {
        component: 'NotificationListItem',
        label: 'notification',
        buttonLabel: 'Show all notification'
    },
    shortlist: {
        component: 'ShortListItem',
        label: 'shortlist',
        buttonLabel: 'Show all shortlist'
    },
    team: {
        component: 'TeamListItem',
        label: 'Quick team active',
        buttonLabel: 'Manage all team'
    },

}
export default {
    props: {
        useFor: {
            type: String,
            required: true
        },
        items: {
            type: [Array, Object],
            required: true
        },
        count: {
            type: Number,
            default: () => 0
        }
    },
    components: {
        NotificationListItem,
        ShortListItem,
        TeamListItem,
        ChatListItem
    },
    computed: {
        componentName() {
            return selectComponent[this.useFor].component;
        },
        label() {
            return selectComponent[this.useFor]?.label || 'label';
        },
        buttonLabel() {
            return selectComponent[this.useFor]?.buttonLabel || '';
        }
    }
}
</script>

<style scoped>
    .notification-wrapper {
		padding: 10px;
        background-color: #fff;
        box-shadow: 0 3px 8px 1px #d3d3d3;
        border-radius: 5px;
	}
    .notification__items {
        overflow-y: scroll;
        max-height: 350px;
    }

    .count {
        width: 20px;
        height: 20px;
        padding: 4px;
        border-radius: 50%;
        background-color: #e42076;
        color: #fff;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>