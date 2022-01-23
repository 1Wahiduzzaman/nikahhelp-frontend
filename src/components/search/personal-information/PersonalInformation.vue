<template>
    <div class="mt-10 pb-5">
        <v-row class="mb-5">
            <v-col class="pt-0" cols="12" md="6">
                <div class="d-flex justify-space-between d-md-none">
                    <OutlinedButton
                        :name="copyProfileText"
                        customEvent="onClickCopyText"
                        @onClickCopyText="onClickCopyText"
                    />
                    <OutlinedButton 
                        name="Team Information"
                        customEvent="onClickTeamDetail"
                        @onClickTeamDetail="onClickTeamDetail"
                    />
                </div>
                <div class="d-none d-md-flex">
                    <OutlinedButton
                        :name="copyProfileText"
                        customEvent="onClickCopyText"
                        @onClickCopyText="onClickCopyText"
                    />
                    <OutlinedButton 
                        name="Team Information"
                        customEvent="onClickTeamDetail"
                        @onClickTeamDetail="onClickTeamDetail"
                    />
                </div>
            </v-col>
            <v-col class="pt-0" cols="12" md="6">
                <Scroller />
            </v-col>
        </v-row>
        <!-- <div class="flex flex-wrap ">
            <div class="flex justify-end">
                <OutlinedButton
                    :name="copyProfileText"
                    customEvent="onClickCopyText"
                    @onClickCopyText="onClickCopyText"
                />
                <OutlinedButton 
                    name="Represented By:"
                    customEvent="onClickCopyText"
                />
            </div>
            <Scroller />
        </div> -->
        <fieldset class="">
            <legend class="ml-8 px-1"><span>Personal Information</span></legend>
            <v-container fluid class="pt-0 px-5">
                <v-row dense>
                    <v-col class="pt-1" cols="12" md="8">
                        <PersonalInformationTable :data="profileDetails"/>
                        <CardInfo :detail="profileDetails.personal.per_about" height="149px" class="mt-2"/>
                    </v-col>
                    <v-col ref="family-information" class="pt-1" cols="12" md="4">
                        <MoreAbout :data="profileDetails"/>
                    </v-col>
                    <v-col class="pt-1 mb-2" cols="12">
                        <CardInfo
                            :showDownloadBtn="true"
                            title="Additional Information"
                            class="mt-2"
                        />
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12" md="6">
                        <CardInfo
                            title="I'm thankful for"
                            :detail="profileDetails.personal.per_thankfull_for"
                        />
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12" md="6">
                        <CardInfo
                            title="I improve myself"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </fieldset>
        <fieldset id="family-information" class="-mt-15">
        <legend class="ml-8 bg-white px-1"><span>Family Information</span></legend>
        <v-container fluid class="pt-0 px-5">
            <v-row dense>
                <v-col class="pt-1 mb-5" cols="12" md="7">
                    <FamilyInfoTable :data="profileDetails"/>
                </v-col>
                <v-col class="pt-1 mb-5" cols="12" md="5">
                    <CardInfo />
                </v-col>
            </v-row>
        </v-container>
        </fieldset>
        <fieldset class="-mt-15">
        <legend id="my-partner-pref" class="ml-8 bg-white px-1"><span>My partner preference</span></legend>
        <v-container fluid class="pt-0 px-5">
            <v-row dense>
                <v-col class="pt-1" cols="12" md="7">
                    <MyPrefTable
                        :preference="profileDetails.preference"
                        :countries="profileDetails.preference.preferred_countries"
                    />
                </v-col>
                <v-col class="pt-1" cols="12" md="5">
                    <CardInfo
                        title="What I'm Looking for"
                        :detail="profileDetails.preference.pre_description"
                    />
                </v-col>
                <v-col class="pt-1" cols="12">
                    <CardInfo
                        title="Other requirements"
                        :detail="profileDetails.preference.pre_other_preference"
                    />
                </v-col>
                <v-col class="pt-1" cols="12">
                    <v-card class="px-3 py-5">
                        <h5>More about preferred partner</h5>
                        <p>How Important following characters are to me</p>
                        <hr />
                        <!-- Character -->
                        <rating-component
                        title="Strength of character from a moral point of view"
                        :value="
                            profileDetails.preference.pre_strength_of_character_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_strength_of_character_rate_string
                        "
                        ></rating-component>
                        <!-- Looks and Apperance -->
                        <rating-component
                        title="Looks and apperance"
                        :value="
                            profileDetails.preference.pre_look_and_appearance_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_look_and_appearance_rate_string
                        "
                        ></rating-component>
                        <!-- Religiosity/Faith -->
                        <rating-component
                        title="Religiosity/ Faith"
                        :value="
                            profileDetails.preference.pre_religiosity_or_faith_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_religiosity_or_faith_rate_string
                        "
                        ></rating-component>
                        <!-- Manners, Social skills and ethics -->
                        <rating-component
                        title="Manners, Social skills and ethics"
                        :value="
                            profileDetails.preference
                            .pre_manners_socialskill_ethics_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_manners_socialskill_ethics_rate_string
                        "
                        ></rating-component>
                        <!-- Emotional Maturity and compatibility -->
                        <rating-component
                        title="Emotional Maturity and compatibility"
                        :value="
                            profileDetails.preference.pre_emotional_maturity_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_emotional_maturity_rate_string
                        "
                        ></rating-component>
                        <!-- Good Listener -->
                        <rating-component
                        title="Good Listener"
                        :value="profileDetails.preference.pre_good_listener_rate"
                        :valueString="
                            profileDetails.preference.pre_good_listener_rate_string
                        "
                        ></rating-component>
                        <!-- Good talker -->
                        <rating-component
                        title="Good talker"
                        :value="profileDetails.preference.pre_good_talker_rate"
                        :valueString="
                            profileDetails.preference.pre_good_talker_rate_string
                        "
                        ></rating-component>
                        <!-- Willing to learn -->
                        <rating-component
                        title="Willing to learn"
                        :value="profileDetails.preference.pre_wiling_to_learn_rate"
                        :valueString="
                            profileDetails.preference.pre_wiling_to_learn_rate_string
                        "
                        ></rating-component>
                        <!-- Family or Social Status-->
                        <rating-component
                        title="Family or Social Status"
                        :value="
                            profileDetails.preference.pre_family_social_status_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_family_social_status_rate_string
                        "
                        ></rating-component>
                        <!-- Employment or Wealth-->
                        <rating-component
                        title="Employment or Wealth"
                        :value="
                            profileDetails.preference.pre_employment_wealth_rate
                        "
                        :valueString="
                            profileDetails.preference
                            .pre_employment_wealth_rate_string
                        "
                        ></rating-component>
                        <!-- Education -->
                        <rating-component
                        title="Education"
                        :value="profileDetails.preference.pre_education_rate"
                        :valueString="
                            profileDetails.preference.pre_education_rate_string
                        "
                        ></rating-component>
                    </v-card>
                    </v-col>
            </v-row>
        </v-container>
        </fieldset>
        <ComingSoonModal
            title="Team details quick view"
            @closeDialog="closeDialog"
            ref="advDiag"
        />
    </div>
</template>

<script>
import OutlinedButton from '@/components/atom/OutlinedButton'
import PersonalInformationTable from './PersonalInformationTable.vue'
import FamilyInfoTable from './FamilyInfoTable.vue'
import MyPrefTable from './MyPrefTable.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from './MoreAbout.vue'
import {mapGetters} from 'vuex'
import Scroller from  '@/components/atom/Scroller'
import RatingComponent from "@/components/profile/RatingComponent.vue";
import ComingSoonModal from "@/components/search/ComingSoonModal"
export default {
    name: 'PersonalInformation',
    data: () => ({
        copyProfileText: 'Copy Profile URL'
    }),
    components: {
        PersonalInformationTable,
        FamilyInfoTable,
        MyPrefTable,
        MoreAbout,
        CardInfo,
        Scroller,
        RatingComponent,
        OutlinedButton,
        ComingSoonModal
    },
    computed: {
        ...mapGetters({
            profileDetails:'search/getProfileDetails',
        }),
        domain() {
            return window.location.origin
        }
        
    },
    methods: {
        onClickTeamDetail() {
            this.$refs.advDiag.openDiag()
        },
        onClickCopyText() {
            this.copyProfileText = 'Copy successful'
            navigator.clipboard.writeText(this.domain+'/user/profile/'+this.profileDetails.user_id);
            this.copied = true;
            setTimeout(() => {
                this.copyProfileText = 'Copy Profile URL';
            }, 3000);
        },
        scrollMeTo(refName) {
            console.log('>>>>>>>>>>>')
            var element = this.$refs[refName];
            var top = element.offsetTop;
            console.log(top, '>>>>>>>>>>>>>top')
            console.log(document.getElementById('bbx'))
            document.getElementById('bbx').scrollTop = top-400;
        }
    }
}
</script>

<style scoped lang="scss">
fieldset {
    border: 1px solid #d3d0e4;
    border-radius: 10px;
}
legend {
    display: inline;
    width: inherit;
    color: #6259a8;
    font-size: 18px;
    font-weight: 600;
}
.-mt-15 {
    margin-top: -13px;
}
.bg-white {
    background: white;
}
</style>

