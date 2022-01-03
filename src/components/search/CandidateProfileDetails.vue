<template>
    <div>
        <div class="top flex justify-space-between align-center px-3">
            <v-btn
                class="d-none d-md-block mt-1 text-capitalize"
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
            <v-btn
                class="mt-1 d-block d-md-none text-capitalize"
                rounded
                absolute
                fab
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

        <!-- button section -->
        <div class="flex justify-space-between flex-wrap mt-10">
            <template
                v-for="(item, i) in btnData"
            >
                <ButtonComponent
                    class="mb-3"
                    :key="i"
                    :title="item.title"
                    :customEvent="item.eventName"
                    :icon="item.icon"
                    :bgColor="item.bgColor"
                    @onClickButton="handleClick"
                />
            </template>
        </div>
        <!-- button section -->

        <!-- personal information -->
        <PersonalInformation />
        <!-- personal information -->
    </div>
</template>

<script>
import PersonalInformation from '@/components/search/personal-information/PersonalInformation'
import {btnData} from '@/data/candidate.button'
import ButtonComponent from '@/components/atom/ButtonComponent'
import ProfileBanner from '@/components/atom/ProfileBanner'
import {mapMutations} from 'vuex'
export default {
    name: 'CandidateProfileDetails',
    data: () => ({
        btnData
    }),
    components: {
        ProfileBanner,
        ButtonComponent,
        PersonalInformation
    },
    methods: {
        ...mapMutations({
            setComponent: 'search/setComponent'
        }),
        handleClick(data) {
            console.log(data,'>>>>>>>>>>>>>>>>>')
        },
        loadSearchResultComponent() {
            this.setComponent('AddComponent')
            this.$emit('switchComponent', 'CandidateProfiles')
        }
    }
}
</script>
