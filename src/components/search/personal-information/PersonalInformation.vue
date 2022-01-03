<template>
    <div class="mt-10 pb-5">
        <Scroller />
        <fieldset class="">
            <legend class="ml-8 px-1"><span>Personal Information</span></legend>
            <v-container fluid class="pt-0 px-5">
                <v-row dense>
                    <v-col class="pt-1" cols="12" md="8">
                        <PersonalInformationTable />
                        <CardInfo class="mt-2"/>
                    </v-col>
                    <v-col ref="family-information" class="pt-1" cols="12" md="4">
                        <MoreAbout />
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12">
                        <CardInfo
                            title="Additional Information"
                            class="mt-2"
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
                    <FamilyInfoTable />
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
                        <MyPrefTable />
                    </v-col>
                    <v-col class="pt-1" cols="12" md="5">
                        <CardInfo
                            title="What I'm Looking for"
                        />
                    </v-col>
                    <v-col class="pt-1" cols="12">
                        <CardInfo
                            title="Other requirements"
                            detail="British only | No visa seekers | No students"
                        />
                    </v-col>
                </v-row>
            </v-container>
         </fieldset>
    </div>
</template>

<script>
import PersonalInformationTable from './PersonalInformationTable.vue'
import FamilyInfoTable from './FamilyInfoTable.vue'
import MyPrefTable from './MyPrefTable.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from './MoreAbout.vue'
import Scroller from  '@/components/atom/Scroller'
export default {
    name: 'PersonalInformation',
    components: {
        PersonalInformationTable,
        FamilyInfoTable,
        MyPrefTable,
        MoreAbout,
        CardInfo,
        Scroller
    },
    methods: {
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

