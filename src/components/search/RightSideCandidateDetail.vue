<template>
    <div class="pt-3 px-5">
        <p>The Profile Overview</p>
        <table>
            <template v-for="(item, i) in infoArr" >
                <tr :key="i" v-if="item != 'first_name' && item != 'last_name' && item != 'image'">
                    <td style="width: 110px">{{ item }}</td>
                    <td style="width: 10px">:</td>
                    <td>{{ profile[item]}} </td>
                </tr>
            </template>
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
