<template>
    <div class="mt-10 pb-5">
        <fieldset class="">
            <legend class="ml-8"><span>Personal Information</span></legend>
            <v-container fluid class="pt-0 px-5">
                <v-row dense>
                    <v-col class="pt-1" cols="12" md="8">
                        <InformationTable />
                        <CardInfo class="mt-2"/>
                    </v-col>
                    <v-col class="pt-1" cols="12" md="4">
                        <MoreAbout />
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12">
                        <CardInfo class="mt-2"/>
                    </v-col>
                </v-row>
            </v-container>
        </fieldset>
         <fieldset class="-mt-15">
           <legend class="ml-8 bg-white"><span>Family Information</span></legend>
           <v-container fluid class="pt-0 px-5">
                <v-row dense>
                    <v-col class="pt-1 mb-5" cols="12" md="7">
                        <InformationTable :value="5"/>
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12" md="5">
                        <CardInfo />
                    </v-col>
                </v-row>
            </v-container>
         </fieldset>
         <fieldset class="-mt-15">
           <legend class="ml-8 bg-white"><span>My parents preference</span></legend>
           <v-container fluid class="pt-0 px-5">
                <v-row dense>
                    <v-col class="pt-1" cols="12" md="7">
                        <InformationTable :value="5"/>
                    </v-col>
                    <v-col class="pt-1" cols="12" md="5">
                        <CardInfo />
                    </v-col>
                </v-row>
            </v-container>
         </fieldset>
    </div>
</template>

<script>
import InformationTable from './InformationTable.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from './MoreAbout.vue'
export default {
    name: 'PersonalInformation',
    components: {
        InformationTable,
        MoreAbout,
        CardInfo
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

