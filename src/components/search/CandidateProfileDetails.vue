<template>
    <div>
        <div class="top flex justify-space-between align-center px-3">
            <v-btn
                class="mt-1 text-capitalize"
                rounded
                color="deep-purple darken-1"
                dark
                @click="loadSearchResultComponent"
            >
            <div class="flex justify-center align-center">
                <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/chevron-left-solid.svg" alt="">
                Back
            </div>
        </v-btn>

        <v-btn-toggle rounded dense>
            <v-btn
                class="mt-1 text-capitalize"
                medium
                color="deep-purple darken-4"
                dark
                @click.stop="ViewProfileDetail"
            >
                <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/chevron-left-solid.svg" alt="">
            </v-btn>
            <v-btn
                class="mt-1 text-capitalize"
                rounded
                color="deep-purple darken-4"
                dark
                @click.stop="ViewProfileDetail"
            >
                <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/chevron-right-solid.svg" alt="">
            </v-btn>
        </v-btn-toggle>
        </div>

        <ProfileBanner
            class="mt-5"
        />
    </div>
</template>

<script>
import ProfileBanner from '@/components/atom/ProfileBanner'
import {mapMutations} from 'vuex'
export default {
    name: 'CandidateProfileDetails',
    components: {
        ProfileBanner
    },
    methods: {
        ...mapMutations({
            setComponent: 'search/setComponent'
        }),
        loadSearchResultComponent() {
            this.setComponent('AddComponent')
            this.$emit('switchComponent', 'CandidateProfiles')
        }
    }
}
</script>
