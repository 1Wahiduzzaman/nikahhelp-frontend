<template>
    <v-card class="p-3">
        <table>
            <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Father's Name</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ family.father_name }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Mother's Name</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{family.mother_name}}</td>
            </tr> -->
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 170px">Father's Profession</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ family.father_profession }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Mother's Profession</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ family.mother_profession }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Siblings</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ family.siblings_desc }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Ancestral home same as country of birth?</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ family.country_of_origin }}</td>
            </tr>
        </table>
    </v-card>
</template>

<script>
export default {
    name:'FamilyInfoTable',
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        family() {
            return this.data?.family ? this.data.family : {}
        }
    }
}
</script>

<style scoped>
td {
    vertical-align: top;
}
</style>
