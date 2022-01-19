<template>
    <v-card class="p-3">
        <table>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Age</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{ preference.pre_partner_age_min }}
                    to
                    {{ preference.pre_partner_age_max }}
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Height</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{ preference.pre_height_min }} inch
                            to
                    {{ preference.pre_height_max }}
                    inch
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Country & Cities Preferred</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    <span
                        v-for="(occupation, i) in (preference.preferred_cities)"
                        :key="i"
                    >
                        {{ occupation.name }}<span v-if="i+1 < preference.preferred_cities.length">,&nbsp</span>
                    </span>
                    <span
                        v-for="(occupation, i) in (preference.preferred_countries)"
                        :key="i"
                    >
                        , {{ occupation.name }}<span v-if="i+1 < preference.preferred_cities.length">,&nbsp</span>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Religion</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    <span
                        v-for="(nationality, i) in preference.pre_partner_religion_id"
                        :key="i"
                    >
                        {{ nationality }}<span v-if="i+1 < preference.pre_partner_religion_id.length">,&nbsp</span>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Ethnicity</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{ preference.pre_ethnicities }}
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Nationality</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    <span
                        v-for="(nationality, i) in preference.preferred_nationality"
                        :key="i"
                    >{{nationality.name}}<span v-if="i+1 < preference.preferred_nationality.length">,&nbsp</span>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Education</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Employment Status</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{preference.pre_employment_status}}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Occupation</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    <span
                        v-for="(occupation, i) in JSON.parse(preference.pre_occupation)"
                        :key="i"
                    >
                        {{ occupation.name }}<span v-if="i+1 < preference.pre_occupation.length">,&nbsp</span>
                    </span>
                </td>
            </tr>
            <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Willing to Relocate</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr> -->
        </table>
    </v-card>
</template>

<script>
export default {
    name:'MyPrefTable',
    props: {
        countries: {
            type: Array,
            default() {
                return []
            }
        },
        preference: {
            type: Object,
            default () {
                return {}
            }
        }
    },
}
</script>

<style scoped>
td {
    vertical-align: top;
}
</style>
