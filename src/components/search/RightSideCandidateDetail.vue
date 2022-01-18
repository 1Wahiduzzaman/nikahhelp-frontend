<template>
    <v-card
        style="height: calc(100vh - 97px); overflow-y: auto; position: fixed; right: 10px;"
        class="mx-auto"
        width="317"
    >
        <div class="pt-3 px-5">
            <p class="text-subtitle-1 mb-2 text--secondary">This Profile Overview</p>
            <table>
                <TableRow 
                    title="Name"
                    :value="profile.first_name + ' ' + profile.last_name"
                />
                <TableRow 
                    title="Age"
                    :value="profile.per_age + ' Years'"
                />
                <TableRow 
                    title="Height"
                />
                <TableRow 
                    title="Nationality"
                    :value="profile.per_nationality"
                />
                <TableRow 
                    title="Ethnicity"
                    :value="profile.per_ethnicity"
                />
                <TableRow 
                    title="Country of Birth"
                />
                <TableRow 
                    title="Current Residence"
                />
                <TableRow 
                    title="Education"
                />
                <TableRow 
                    title="Profession"
                />
                
                <!-- <template v-for="(item, i) in infoArr" >
                    <tr :key="i" v-if="item != 'first_name' && item != 'last_name' && item != 'image'">
                        <td style="width: 140px">{{ item }}</td>
                        <td style="width: 10px">:</td>
                        <td>{{ profile[item]}} </td>
                    </tr>
                </template> -->
            </table>

             <p class="text-subtitle-1 mb-2 text--secondary mt-4">This Profile Partner Preference</p>
             <table> 
                <TableRow 
                    title="Age"
                />
                <TableRow 
                    title="Height"
                />
                <TableRow 
                    title="Country & Cities Preferred"
                />
                <TableRow 
                    title="Religion"
                />
                <TableRow 
                    title="Ethnicity"
                />
                <TableRow 
                    title="Nationality"
                />
                <TableRow 
                    title="Education"
                />
                <TableRow 
                    title="Profession"
                />
                <!-- <tr>
                    <td class="text--disabled text-subtitle-1" style="width: 50px">Country & Cities Preferred</td>
                    <td class="text-subtitle-1" style="width: 20px ">:</td>
                    <td class="text--secondary text-subtitle-1">
                        <div
                            v-for="(country, index) in countries || []"
                            :key="country.id"
                            >
                                {{ country.name }},
                                {{
                                candidateData.preference.preferred_cities[index]
                                    .name
                                }}
                        </div>
                    </td>
                </tr> -->
            
                <!-- <tr>
                    <td class="text--disabled text-subtitle-1" style="width: 50px">Willing to Relocate</td>
                    <td class="text-subtitle-1" style="width: 20px ">:</td>
                    <td class="text--secondary text-subtitle-1"></td>
                </tr> -->
            </table>
            <hr>
        </div>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import TableRow from '@/components/atom/TableRow'
export default {
    name: 'RightSideCandidateDetail',
    components: {
        TableRow
    },
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
