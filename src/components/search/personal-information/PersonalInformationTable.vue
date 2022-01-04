<template>
    <v-card class="p-3">
        <table>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Gender</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{  personal.per_gender == 0 ? 'Female' : 'Male'}}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Age</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{personal.per_age}}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Height</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_height }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Employment Status</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_employment_status }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Profession</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_profession }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Education</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Religion</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Ethnicity</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Mother Tongue</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{personal.per_mother_tongue}}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Nationality</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{
                        $store.state.candidateInfo.countries[
                            personal.per_nationality
                        ]
                        ? $store.state.candidateInfo.countries[
                           personal.per_nationality
                        ].name
                        : ""
                    }}
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Country of Birth</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{
                        $store.state.candidateInfo.countries[
                            personal.per_country_of_birth
                        ]
                        ? $store.state.candidateInfo.countries[
                            personal.per_country_of_birth
                        ].name
                        : ""
                    }}
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Current Residence</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{
                        $store.state.candidateInfo.countries[
                            personal.per_current_residence
                        ]
                            ? $store.state.candidateInfo.countries[
                                personal.per_current_residence
                            ].name
                            : ""
                        }}
                </td>
            </tr>
        </table>
    </v-card>
</template>

<script>
export default {
    name:'PersonalInfoTable',
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        personal() {
            return this.data?.personal ? this.data.personal : {}
        }
    }
}
</script>
