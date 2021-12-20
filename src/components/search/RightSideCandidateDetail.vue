<template>
    <div class="pt-3 px-5">
        <p class="text-h6 mb-2 text--secondary">The Profile Overview</p>
        <table>
            <tr>
                <td class="text--disabled" style="width: 110px">Name</td>
                <td style="width: 10px">:</td>
                <td class="text--secondary">{{ profile.first_name}} {{ profile.last_name}} </td>
            </tr>
            <tr>
                <td class="text--disabled" style="width: 110px">Age</td>
                <td style="width: 10px">:</td>
                <td class="text--secondary">{{ profile.per_age}}</td>
            </tr>
            <tr>
                <td class="text--disabled" style="width: 110px">Gender</td>
                <td style="width: 10px">:</td>
                <td class="text--secondary">{{ profile.per_gender}}</td>
            </tr>
            <tr>
                <td class="text--disabled" style="width: 110px">Nationality</td>
                <td style="width: 10px">:</td>
                <td class="text--secondary">{{ profile.per_nationality}}</td>
            </tr>
            <tr>
                <td class="text--disabled" style="width: 110px">Religion</td>
                <td style="width: 10px">:</td>
                <td class="text--secondary">{{ profile.per_religion}}</td>
            </tr>
            <tr>
                <td class="text--disabled" style="width: 110px">Ethnicity</td>
                <td style="width: 10px">:</td>
                <td class="text--secondary">{{ profile.per_ethnicity}}</td>
            </tr>
            <!-- <template v-for="(item, i) in infoArr" >
                <tr :key="i" v-if="item != 'first_name' && item != 'last_name' && item != 'image'">
                    <td style="width: 110px">{{ item }}</td>
                    <td style="width: 10px">:</td>
                    <td>{{ profile[item]}} </td>
                </tr>
            </template> -->
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'RightSideCandidateDetail',
    computed: {
        ...mapGetters({
            profile: 'search/getSelectedProfileInfo'
        }),
        infoArr() {
            return Object.keys(this.profile)
        }
    }
}
</script>
